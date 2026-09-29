from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models import Vessel
from app.schemas import VesselResponse, VesselBase

router = APIRouter(prefix="/vessels", tags=["vessels"])

DEFAULT_VESSELS = [
    {
        "vessel_id": "VES-101",
        "name": "Pacific Voyager",
        "type": "Container Ship",
        "capacity_dwt": 55000.0,
        "engine_power_kw": 38000.0,
        "design_speed_knots": 19.5,
        "current_speed_knots": 16.2,
        "default_fuel_type": "LNG",
        "efficiency_rating": "A+",
        "status": "Operational",
        "built_year": 2022,
        "flag": "Singapore"
    },
    {
        "vessel_id": "VES-102",
        "name": "Oceanic Titan",
        "type": "Bulk Carrier",
        "capacity_dwt": 82000.0,
        "engine_power_kw": 22000.0,
        "design_speed_knots": 14.5,
        "current_speed_knots": 13.0,
        "default_fuel_type": "Methanol",
        "efficiency_rating": "A",
        "status": "Operational",
        "built_year": 2023,
        "flag": "Panama"
    },
    {
        "vessel_id": "VES-103",
        "name": "Green Pioneer",
        "type": "Oil Tanker",
        "capacity_dwt": 110000.0,
        "engine_power_kw": 28000.0,
        "design_speed_knots": 15.0,
        "current_speed_knots": 14.0,
        "default_fuel_type": "Ammonia",
        "efficiency_rating": "B+",
        "status": "In-Transit",
        "built_year": 2021,
        "flag": "Marshall Islands"
    },
    {
        "vessel_id": "VES-104",
        "name": "Nordic Breeze",
        "type": "Ro-Ro Vessel",
        "capacity_dwt": 25000.0,
        "engine_power_kw": 24000.0,
        "design_speed_knots": 18.0,
        "current_speed_knots": 15.5,
        "default_fuel_type": "Hydrogen",
        "efficiency_rating": "A+",
        "status": "Operational",
        "built_year": 2024,
        "flag": "Norway"
    },
    {
        "vessel_id": "VES-105",
        "name": "Atlantic Express",
        "type": "Container Ship",
        "capacity_dwt": 95000.0,
        "engine_power_kw": 52000.0,
        "design_speed_knots": 21.0,
        "current_speed_knots": 17.8,
        "default_fuel_type": "HFO",
        "efficiency_rating": "B",
        "status": "Anchored",
        "built_year": 2019,
        "flag": "Liberia"
    }
]

def seed_vessels_if_empty(db: Session):
    if db.query(Vessel).count() == 0:
        for vdata in DEFAULT_VESSELS:
            vessel = Vessel(**vdata)
            db.add(vessel)
        db.commit()

@router.get("", response_model=List[VesselResponse])
def get_vessels(
    search: Optional[str] = Query(None),
    vessel_type: Optional[str] = Query(None),
    fuel_type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    seed_vessels_if_empty(db)
    query = db.query(Vessel)
    
    if search:
        query = query.filter(
            (Vessel.name.ilike(f"%{search}%")) | (Vessel.vessel_id.ilike(f"%{search}%"))
        )
    if vessel_type and vessel_type != "All":
        query = query.filter(Vessel.type == vessel_type)
    if fuel_type and fuel_type != "All":
        query = query.filter(Vessel.default_fuel_type == fuel_type)
        
    return query.all()

@router.get("/{vessel_id}", response_model=VesselResponse)
def get_vessel_by_id(vessel_id: str, db: Session = Depends(get_db)):
    seed_vessels_if_empty(db)
    vessel = db.query(Vessel).filter(Vessel.vessel_id == vessel_id).first()
    if not vessel:
        raise HTTPException(status_code=404, detail="Vessel not found")
    return vessel
