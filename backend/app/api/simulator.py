from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, List

from app.database import get_db
from app.schemas import ScenarioSimulationRequest, ScenarioSimulationResponse
from app.ml.fuel_model import model_service
from app.optimization.quantum_inspired import FUEL_PRICES, CO2_FACTORS

router = APIRouter(prefix="/simulate-scenario", tags=["simulator"])

VESSEL_SPECS = {
    "Container Ship": {"capacity_dwt": 55000.0, "engine_power_kw": 38000.0},
    "Bulk Carrier": {"capacity_dwt": 82000.0, "engine_power_kw": 22000.0},
    "Oil Tanker": {"capacity_dwt": 110000.0, "engine_power_kw": 28000.0},
    "Ro-Ro Vessel": {"capacity_dwt": 25000.0, "engine_power_kw": 24000.0},
    "Gas Carrier": {"capacity_dwt": 60000.0, "engine_power_kw": 32000.0}
}

@router.post("", response_model=ScenarioSimulationResponse)
def simulate_scenario(req: ScenarioSimulationRequest, db: Session = Depends(get_db)):
    spec = VESSEL_SPECS.get(req.vessel_type, {"capacity_dwt": 50000.0, "engine_power_kw": 30000.0})
    
    input_dict = {
        "vessel_type": req.vessel_type,
        "capacity_dwt": spec["capacity_dwt"],
        "engine_power_kw": spec["engine_power_kw"],
        "speed_knots": req.speed_knots,
        "distance_nm": req.distance_nm,
        "cargo_weight_tons": req.cargo_weight_tons,
        "fuel_type": req.fuel_type,
        "weather_condition": req.weather_condition
    }
    
    # 1. Predict Fuel Consumption
    predicted_fuel = model_service.predict(input_dict)
    
    # 2. Calculate CO2 & Financial Cost
    co2_factor = CO2_FACTORS.get(req.fuel_type, 3.1)
    effective_fuel_price = req.fuel_price_usd_ton if req.fuel_price_usd_ton > 0 else FUEL_PRICES.get(req.fuel_type, 750.0)
    
    co2_emissions = predicted_fuel * co2_factor
    operating_cost = predicted_fuel * effective_fuel_price
    travel_time_hours = req.distance_nm / max(1.0, req.speed_knots)
    
    # 3. Calculate weighted composite score based on user priorities (0-100%)
    w_total = req.cost_priority + req.emission_priority + req.time_priority
    if w_total <= 0:
        w_total = 100.0
        
    w_cost = req.cost_priority / w_total
    w_emis = req.emission_priority / w_total
    w_time = req.time_priority / w_total
    
    # Benchmark baselines for radar normalization
    baseline_cost = 150000.0
    baseline_co2 = 500.0
    baseline_time = 240.0
    
    cost_score = max(10.0, min(100.0, 100.0 * (1.0 - (operating_cost - 50000.0) / baseline_cost)))
    emission_score = max(10.0, min(100.0, 100.0 * (1.0 - (co2_emissions - 50.0) / baseline_co2)))
    time_score = max(10.0, min(100.0, 100.0 * (1.0 - (travel_time_hours - 50.0) / baseline_time)))
    eco_efficiency_score = max(10.0, min(100.0, (emission_score + cost_score) / 2.0))
    schedule_reliability_score = max(10.0, min(100.0, time_score * 1.05))
    
    compliance_score = round(
        (w_cost * cost_score) + (w_emis * emission_score) + (w_time * time_score), 1
    )
    
    # Radar chart points
    tradeoff_radar = {
        "Cost Efficiency": round(cost_score, 1),
        "Emission Score": round(emission_score, 1),
        "Speed / Delivery": round(time_score, 1),
        "Eco Efficiency": round(eco_efficiency_score, 1),
        "Schedule Reliability": round(schedule_reliability_score, 1)
    }
    
    # Sensitivity analysis (+- 2 knots speed variation)
    sensitivity = []
    for delta_spd in [-3.0, -1.5, 0.0, 1.5, 3.0]:
        test_spd = max(8.0, req.speed_knots + delta_spd)
        inp = input_dict.copy()
        inp["speed_knots"] = test_spd
        fl = model_service.predict(inp)
        co2_val = fl * co2_factor
        cst_val = fl * effective_fuel_price
        tm_val = req.distance_nm / test_spd
        sensitivity.append({
            "speed_knots": test_spd,
            "fuel_tons": round(fl, 1),
            "co2_tons": round(co2_val, 1),
            "cost_usd": round(cst_val, 0),
            "time_hours": round(tm_val, 1)
        })

    # Explainable reasons
    reasons = [
        f"✓ Fuel consumption ({predicted_fuel:.1f} tons) predicted using trained Gradient Boosting hydrodynamics ML model.",
        f"✓ CO₂ emissions ({co2_emissions:.1f} tons) computed with {req.fuel_type} emission factor ({co2_factor} t CO₂/t fuel).",
        f"✓ Operating cost (\${operating_cost:,.2f}) calculated at \${effective_fuel_price:.0f}/ton fuel market price.",
        f"✓ Voyage estimated at {travel_time_hours:.1f} hours for {req.distance_nm:,.0f} nm at {req.speed_knots:.1f} knots speed.",
        f"✓ Scenario score of {compliance_score}/100 aligns with your set priorities (Cost: {req.cost_priority:.0f}%, Emissions: {req.emission_priority:.0f}%, Time: {req.time_priority:.0f}%)."
    ]

    return {
        "fuel_consumption_tons": round(predicted_fuel, 2),
        "co2_emissions_tons": round(co2_emissions, 2),
        "operating_cost_usd": round(operating_cost, 2),
        "travel_time_hours": round(travel_time_hours, 1),
        "compliance_score": compliance_score,
        "tradeoff_radar": tradeoff_radar,
        "sensitivity_analysis": {"speed_variation": sensitivity},
        "explainable_reasons": reasons
    }
