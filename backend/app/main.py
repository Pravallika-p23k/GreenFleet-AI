from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.config import settings
from app.database import Base, engine
from app.api import (
    vessels, predictions, emissions, optimization, 
    simulator, benchmarking, dashboard, reports
)
from app.ml.fuel_model import model_service

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="GreenFleet AI – Quantum-Inspired Green Fleet Optimization Platform for Maritime Logistics",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default port 5173 / 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers under /api
app.include_router(vessels.router, prefix=settings.API_V1_STR)
app.include_router(predictions.router, prefix=settings.API_V1_STR)
app.include_router(emissions.router, prefix=settings.API_V1_STR)
app.include_router(optimization.router, prefix=settings.API_V1_STR)
app.include_router(simulator.router, prefix=settings.API_V1_STR)
app.include_router(benchmarking.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)
app.include_router(reports.router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_event():
    print("🚀 Initializing GreenFleet AI Backend Server...")
    print("🤖 Training & Evaluating ML Hydrodynamics Fuel Prediction Model...")
    metrics = model_service.train()
    print(f"✅ ML Model Trained Successfully! Model: {metrics['selected_model']}, R²: {metrics['r2_score']}, MAE: {metrics['mae']} tons")

@app.get("/")
def root():
    return {
        "message": "Welcome to GreenFleet AI Platform API",
        "version": "1.0.0",
        "documentation": "/docs",
        "disclaimer": "Quantum-Inspired Optimization running on classical computing infrastructure."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
