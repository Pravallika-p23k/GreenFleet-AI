from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    full_name = Column(String(100))
    role = Column(String(50), default="Fleet Manager")  # Fleet Manager, Sustainability Lead, Maritime Planner
    created_at = Column(DateTime, default=datetime.utcnow)

class Vessel(Base):
    __tablename__ = "vessels"

    id = Column(Integer, primary_key=True, index=True)
    vessel_id = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)  # Container Ship, Bulk Carrier, Oil Tanker, Ro-Ro
    capacity_dwt = Column(Float, nullable=False)  # Deadweight Tonnage
    engine_power_kw = Column(Float, nullable=False)  # Engine power in kW
    design_speed_knots = Column(Float, default=18.0)
    current_speed_knots = Column(Float, default=14.5)
    default_fuel_type = Column(String(50), default="HFO")  # HFO, MGO, LNG, Methanol, Ammonia, Hydrogen
    efficiency_rating = Column(String(10), default="A")  # A, B, C, D
    is_active = Column(Boolean, default=True)
    status = Column(String(50), default="Operational")
    built_year = Column(Integer, default=2020)
    flag = Column(String(50), default="Marshall Islands")

class Voyage(Base):
    __tablename__ = "voyages"

    id = Column(Integer, primary_key=True, index=True)
    voyage_code = Column(String(50), unique=True, index=True, nullable=False)
    origin_port = Column(String(100), nullable=False)
    destination_port = Column(String(100), nullable=False)
    distance_nautical_miles = Column(Float, nullable=False)
    cargo_weight_tons = Column(Float, nullable=False)
    cargo_type = Column(String(50), default="General Container")
    delivery_deadline_hours = Column(Float, nullable=False)
    status = Column(String(50), default="Planned")  # Planned, In-Transit, Completed
    created_at = Column(DateTime, default=datetime.utcnow)

class FuelPrediction(Base):
    __tablename__ = "fuel_predictions"

    id = Column(Integer, primary_key=True, index=True)
    vessel_type = Column(String(50), nullable=False)
    capacity_dwt = Column(Float, nullable=False)
    engine_power_kw = Column(Float, nullable=False)
    speed_knots = Column(Float, nullable=False)
    distance_nm = Column(Float, nullable=False)
    cargo_weight_tons = Column(Float, nullable=False)
    fuel_type = Column(String(50), nullable=False)
    weather_condition = Column(String(50), default="Calm")
    predicted_fuel_tons = Column(Float, nullable=False)
    estimated_cost_usd = Column(Float, nullable=False)
    estimated_co2_tons = Column(Float, nullable=False)
    estimated_travel_hours = Column(Float, nullable=False)
    is_demo_data = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class EmissionRecord(Base):
    __tablename__ = "emissions"

    id = Column(Integer, primary_key=True, index=True)
    vessel_id = Column(String(50), nullable=False)
    vessel_type = Column(String(50), nullable=False)
    fuel_type = Column(String(50), nullable=False)
    fuel_consumed_tons = Column(Float, nullable=False)
    co2_emissions_tons = Column(Float, nullable=False)
    nox_emissions_tons = Column(Float, default=0.0)
    sox_emissions_tons = Column(Float, default=0.0)
    distance_nm = Column(Float, nullable=False)
    co2_intensity_g_tnm = Column(Float, nullable=False)  # g CO2 / ton-nautical mile
    transport_work = Column(Float, nullable=False)  # ton * nm
    operating_period = Column(String(50), default="2026-Q3")
    created_at = Column(DateTime, default=datetime.utcnow)

class OptimizationRun(Base):
    __tablename__ = "optimization_runs"

    id = Column(Integer, primary_key=True, index=True)
    run_id = Column(String(50), unique=True, index=True, nullable=False)
    origin = Column(String(100))
    destination = Column(String(100))
    distance_nm = Column(Float)
    cargo_weight_tons = Column(Float)
    deadline_hours = Column(Float)
    cost_priority = Column(Float, default=0.4)
    emission_priority = Column(Float, default=0.4)
    time_priority = Column(Float, default=0.2)
    algorithm_used = Column(String(100), default="Quantum-Inspired Annealing (QUBO)")
    candidate_plans_json = Column(JSON)
    recommended_plan_id = Column(String(50))
    execution_time_ms = Column(Float)
    is_demo_run = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ScenarioRun(Base):
    __tablename__ = "scenario_runs"

    id = Column(Integer, primary_key=True, index=True)
    cost_priority = Column(Float)
    emission_priority = Column(Float)
    time_priority = Column(Float)
    vessel_type = Column(String(50))
    speed_knots = Column(Float)
    fuel_type = Column(String(50))
    cargo_weight_tons = Column(Float)
    distance_nm = Column(Float)
    weather_condition = Column(String(50))
    fuel_price_usd_ton = Column(Float)
    calculated_fuel_tons = Column(Float)
    calculated_co2_tons = Column(Float)
    calculated_cost_usd = Column(Float)
    calculated_time_hours = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

class BenchmarkResult(Base):
    __tablename__ = "benchmark_results"

    id = Column(Integer, primary_key=True, index=True)
    test_case = Column(String(100), nullable=False)
    num_vessels = Column(Integer)
    num_routes = Column(Integer)
    conv_objective_val = Column(Float)
    qi_objective_val = Column(Float)
    conv_exec_time_ms = Column(Float)
    qi_exec_time_ms = Column(Float)
    conv_iterations = Column(Integer)
    qi_iterations = Column(Integer)
    is_demo_benchmark = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    report_title = Column(String(150), nullable=False)
    voyage_code = Column(String(50))
    report_data_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
