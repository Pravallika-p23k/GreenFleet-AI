from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Vessel
from app.schemas import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("", response_model=DashboardResponse)
def get_dashboard_data(db: Session = Depends(get_db)):
    vessel_count = db.query(Vessel).count() or 5
    
    fuel_trend = [
        {"day": "Mon", "predicted_fuel": 420.0, "actual_fuel": 432.5},
        {"day": "Tue", "predicted_fuel": 410.0, "actual_fuel": 418.0},
        {"day": "Wed", "predicted_fuel": 395.0, "actual_fuel": 398.2},
        {"day": "Thu", "predicted_fuel": 450.0, "actual_fuel": 456.0},
        {"day": "Fri", "predicted_fuel": 380.0, "actual_fuel": 379.5},
        {"day": "Sat", "predicted_fuel": 360.0, "actual_fuel": 362.0},
        {"day": "Sun", "predicted_fuel": 340.0, "actual_fuel": 341.0}
    ]
    
    co2_trend = [
        {"day": "Mon", "co2_emissions": 1310.2},
        {"day": "Tue", "co2_emissions": 1270.5},
        {"day": "Wed", "co2_emissions": 1210.0},
        {"day": "Thu", "co2_emissions": 1390.8},
        {"day": "Fri", "co2_emissions": 1180.4},
        {"day": "Sat", "co2_emissions": 1115.0},
        {"day": "Sun", "co2_emissions": 1050.2}
    ]
    
    vessel_efficiency = [
        {"name": "Pacific Voyager", "rating": 94, "type": "Container Ship"},
        {"name": "Oceanic Titan", "rating": 88, "type": "Bulk Carrier"},
        {"name": "Green Pioneer", "rating": 86, "type": "Oil Tanker"},
        {"name": "Nordic Breeze", "rating": 96, "type": "Ro-Ro Vessel"},
        {"name": "Atlantic Express", "rating": 79, "type": "Container Ship"}
    ]
    
    fuel_type_breakdown = [
        {"name": "HFO", "value": 35},
        {"name": "MGO", "value": 25},
        {"name": "LNG", "value": 22},
        {"name": "Methanol", "value": 12},
        {"name": "Ammonia", "value": 4},
        {"name": "Hydrogen", "value": 2}
    ]

    return {
        "total_vessels": vessel_count,
        "active_voyages": 12,
        "predicted_fuel_consumption_tons": 2755.0,
        "estimated_co2_tons": 8527.1,
        "operating_cost_usd": 2185400.0,
        "optimization_status": "Active (Quantum-Inspired QIA Engine)",
        "fuel_trend": fuel_trend,
        "co2_trend": co2_trend,
        "vessel_efficiency": vessel_efficiency,
        "fuel_type_breakdown": fuel_type_breakdown,
        "is_demo_data": True
    }
