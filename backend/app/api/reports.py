from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any, List
import uuid

from app.database import get_db
from app.models import Report

router = APIRouter(prefix="/reports", tags=["reports"])

@router.post("")
def generate_report(report_data: Dict[str, Any], db: Session = Depends(get_db)):
    """
    Generates a structured voyage optimization report.
    """
    code = f"REP-{uuid.uuid4().hex[:8].upper()}"
    title = report_data.get("report_title", f"Voyage Optimization Report ({code})")
    
    rep = Report(
        report_title=title,
        voyage_code=report_data.get("voyage_code", code),
        report_data_json=report_data
    )
    db.add(rep)
    db.commit()
    
    return {
        "report_id": rep.id,
        "report_code": code,
        "title": title,
        "status": "Generated Successfully",
        "created_at": rep.created_at,
        "data": report_data
    }

@router.get("/{report_id}")
def get_report(report_id: int, db: Session = Depends(get_db)):
    rep = db.query(Report).filter(Report.id == report_id).first()
    if not rep:
        raise HTTPException(status_code=404, detail="Report not found")
    return {
        "report_id": rep.id,
        "title": rep.report_title,
        "voyage_code": rep.voyage_code,
        "created_at": rep.created_at,
        "data": rep.report_data_json
    }
