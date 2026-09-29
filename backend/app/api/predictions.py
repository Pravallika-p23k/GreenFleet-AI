from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.database import get_db
from app.models import FuelPrediction
from app.schemas import FuelPredictionRequest, FuelPredictionResponse
from app.ml.fuel_model import model_service
from app.optimization.quantum_inspired import FUEL_PRICES, CO2_FACTORS

router = APIRouter(prefix="/predict-fuel", tags=["predictions"])

@router.post("", response_model=FuelPredictionResponse)
def predict_fuel(req: FuelPredictionRequest, db: Session = Depends(get_db)):
    input_dict = {
        "vessel_type": req.vessel_type,
        "capacity_dwt": req.capacity_dwt,
        "engine_power_kw": req.engine_power_kw,
        "speed_knots": req.speed_knots,
        "distance_nm": req.distance_nm,
        "cargo_weight_tons": req.cargo_weight_tons,
        "fuel_type": req.fuel_type,
        "weather_condition": req.weather_condition
    }
    
    # 1. Run Machine Learning Model Prediction
    predicted_fuel = model_service.predict(input_dict)
    
    # 2. Derive Financial & Emission metrics
    price_per_ton = FUEL_PRICES.get(req.fuel_type, 750.0)
    co2_factor = CO2_FACTORS.get(req.fuel_type, 3.1)
    
    estimated_cost = round(predicted_fuel * price_per_ton, 2)
    estimated_co2 = round(predicted_fuel * co2_factor, 2)
    travel_hours = round(req.distance_nm / max(1.0, req.speed_knots), 1)
    
    # 3. Generate Speed Sensitivity Curve (Speed vs Predicted Fuel Consumption)
    speed_curve = model_service.generate_speed_curve(input_dict)
    
    # Save record to DB
    pred_record = FuelPrediction(
        vessel_type=req.vessel_type,
        capacity_dwt=req.capacity_dwt,
        engine_power_kw=req.engine_power_kw,
        speed_knots=req.speed_knots,
        distance_nm=req.distance_nm,
        cargo_weight_tons=req.cargo_weight_tons,
        fuel_type=req.fuel_type,
        weather_condition=req.weather_condition,
        predicted_fuel_tons=round(predicted_fuel, 2),
        estimated_cost_usd=estimated_cost,
        estimated_co2_tons=estimated_co2,
        estimated_travel_hours=travel_hours,
        is_demo_data=False
    )
    db.add(pred_record)
    db.commit()
    
    return {
        "predicted_fuel_tons": round(predicted_fuel, 2),
        "estimated_cost_usd": estimated_cost,
        "estimated_co2_tons": estimated_co2,
        "estimated_travel_hours": travel_hours,
        "is_demo_data": False,
        "speed_sensitivity_curve": speed_curve,
        "model_metrics": model_service.metrics
    }
