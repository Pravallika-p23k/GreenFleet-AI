from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database import get_db
from app.models import Vessel, OptimizationRun
from app.schemas import OptimizationRequest, OptimizationResponse
from app.optimization.quantum_inspired import qi_optimizer

router = APIRouter(prefix="/optimize-voyage", tags=["optimization"])

@router.post("", response_model=OptimizationResponse)
def optimize_voyage(req: OptimizationRequest, db: Session = Depends(get_db)):
    # 1. Retrieve vessel profiles
    query_vessels = db.query(Vessel).filter(Vessel.vessel_id.in_(req.vessel_ids)).all()
    
    if not query_vessels:
        # Fallback default vessels
        vessel_options = [
            {"vessel_id": "VES-101", "name": "Pacific Voyager", "type": "Container Ship", "capacity_dwt": 55000.0, "engine_power_kw": 38000.0},
            {"vessel_id": "VES-102", "name": "Oceanic Titan", "type": "Bulk Carrier", "capacity_dwt": 82000.0, "engine_power_kw": 22000.0},
            {"vessel_id": "VES-103", "name": "Green Pioneer", "type": "Oil Tanker", "capacity_dwt": 110000.0, "engine_power_kw": 28000.0},
            {"vessel_id": "VES-104", "name": "Nordic Breeze", "type": "Ro-Ro Vessel", "capacity_dwt": 25000.0, "engine_power_kw": 24000.0}
        ]
    else:
        vessel_options = [
            {
                "vessel_id": v.vessel_id,
                "name": v.name,
                "type": v.type,
                "capacity_dwt": v.capacity_dwt,
                "engine_power_kw": v.engine_power_kw
            }
            for v in query_vessels
        ]

    # Normalize priorities to sum to 1.0
    total_w = req.cost_priority + req.emission_priority + req.time_priority
    if total_w <= 0:
        total_w = 1.0
    w_cost = req.cost_priority / total_w
    w_emission = req.emission_priority / total_w
    w_time = req.time_priority / total_w

    # 2. Run Quantum-Inspired Optimization (Transverse-Field Annealing on Classical Computing Infrastructure)
    result = qi_optimizer.solve(
        origin=req.origin,
        destination=req.destination,
        distance_nm=req.distance_nm,
        cargo_weight_tons=req.cargo_weight_tons,
        deadline_hours=req.delivery_deadline_hours,
        vessel_options=vessel_options,
        fuel_options=req.fuel_options,
        min_speed=req.min_speed_knots,
        max_speed=req.max_speed_knots,
        cost_weight=w_cost,
        emission_weight=w_emission,
        time_weight=w_time
    )

    # 3. Store optimization run record in database
    opt_run = OptimizationRun(
        run_id=result["run_id"],
        origin=req.origin,
        destination=req.destination,
        distance_nm=req.distance_nm,
        cargo_weight_tons=req.cargo_weight_tons,
        deadline_hours=req.delivery_deadline_hours,
        cost_priority=req.cost_priority,
        emission_priority=req.emission_priority,
        time_priority=req.time_priority,
        algorithm_used=result["algorithm"],
        candidate_plans_json=result["candidate_plans"],
        recommended_plan_id=result["recommended_plan"]["plan_id"],
        execution_time_ms=result["execution_time_ms"],
        is_demo_run=False
    )
    db.add(opt_run)
    db.commit()

    return result
