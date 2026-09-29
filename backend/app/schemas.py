from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# Vessel schemas
class VesselBase(BaseModel):
    vessel_id: str
    name: str
    type: str
    capacity_dwt: float
    engine_power_kw: float
    design_speed_knots: float = 18.0
    current_speed_knots: float = 14.5
    default_fuel_type: str = "HFO"
    efficiency_rating: str = "A"
    is_active: bool = True
    status: str = "Operational"
    built_year: int = 2020
    flag: str = "Marshall Islands"

class VesselResponse(VesselBase):
    id: int
    class Config:
        from_attributes = True

# Fuel Prediction schemas
class FuelPredictionRequest(BaseModel):
    vessel_type: str = Field(..., example="Container Ship")
    capacity_dwt: float = Field(..., example=50000.0)
    engine_power_kw: float = Field(..., example=30000.0)
    speed_knots: float = Field(..., example=16.0)
    distance_nm: float = Field(..., example=3200.0)
    cargo_weight_tons: float = Field(..., example=40000.0)
    fuel_type: str = Field(..., example="LNG")
    weather_condition: str = Field("Calm", example="Calm")

class FuelPredictionResponse(BaseModel):
    predicted_fuel_tons: float
    estimated_cost_usd: float
    estimated_co2_tons: float
    estimated_travel_hours: float
    is_demo_data: bool = False
    speed_sensitivity_curve: List[Dict[str, float]]
    model_metrics: Optional[Dict[str, float]] = None

# Optimization schemas
class OptimizationRequest(BaseModel):
    origin: str = "Rotterdam"
    destination: str = "Singapore"
    distance_nm: float = 8280.0
    cargo_weight_tons: float = 45000.0
    delivery_deadline_hours: float = 500.0
    vessel_ids: List[str] = ["VES-101", "VES-102", "VES-103", "VES-104"]
    fuel_options: List[str] = ["HFO", "MGO", "LNG", "Methanol", "Ammonia", "Hydrogen"]
    min_speed_knots: float = 10.0
    max_speed_knots: float = 22.0
    max_emissions_co2_tons: Optional[float] = None
    cost_priority: float = 0.4  # 0.0 - 1.0
    emission_priority: float = 0.4  # 0.0 - 1.0
    time_priority: float = 0.2  # 0.0 - 1.0

class PlanCandidate(BaseModel):
    plan_id: str
    plan_name: str
    vessel_id: str
    vessel_name: str
    speed_knots: float
    fuel_type: str
    predicted_fuel_tons: float
    operating_cost_usd: float
    co2_emissions_tons: float
    travel_time_hours: float
    score: float
    is_recommended: bool = False
    explanations: List[str]

class OptimizationResponse(BaseModel):
    run_id: str
    algorithm: str = "Quantum-Inspired Optimization (Transverse-Field Annealing on Classical Compute)"
    execution_time_ms: float
    candidate_plans: List[PlanCandidate]
    recommended_plan: PlanCandidate
    disclaimer: str = "Quantum-Inspired Optimization running on classical computing infrastructure."
    pareto_frontier: List[Dict[str, Any]]

# Simulator schemas
class ScenarioSimulationRequest(BaseModel):
    cost_priority: float = 40.0  # 0 to 100
    emission_priority: float = 40.0  # 0 to 100
    time_priority: float = 20.0  # 0 to 100
    vessel_type: str = "Container Ship"
    speed_knots: float = 16.0
    fuel_type: str = "LNG"
    cargo_weight_tons: float = 45000.0
    distance_nm: float = 3500.0
    weather_condition: str = "Calm"
    fuel_price_usd_ton: float = 750.0

class ScenarioSimulationResponse(BaseModel):
    fuel_consumption_tons: float
    co2_emissions_tons: float
    operating_cost_usd: float
    travel_time_hours: float
    compliance_score: float
    tradeoff_radar: Dict[str, float]
    sensitivity_analysis: Dict[str, List[Dict[str, Any]]]
    explainable_reasons: List[str]

# Benchmark schemas
class BenchmarkMetrics(BaseModel):
    algorithm_name: str
    solution_quality_score: float
    objective_val: float
    execution_time_ms: float
    convergence_iterations: int
    scalability_score: float

class BenchmarkResponse(BaseModel):
    test_cases: List[Dict[str, Any]]
    conventional_summary: BenchmarkMetrics
    quantum_inspired_summary: BenchmarkMetrics
    comparison_chart: List[Dict[str, Any]]
    convergence_series: List[Dict[str, Any]]
    is_demo_benchmark: bool = True
    note: str = "Benchmarking compares conventional MILP/Heuristic vs. Quantum-Inspired Annealing on classical hardware."

# Dashboard schema
class DashboardResponse(BaseModel):
    total_vessels: int
    active_voyages: int
    predicted_fuel_consumption_tons: float
    estimated_co2_tons: float
    operating_cost_usd: float
    optimization_status: str
    fuel_trend: List[Dict[str, Any]]
    co2_trend: List[Dict[str, Any]]
    vessel_efficiency: List[Dict[str, Any]]
    fuel_type_breakdown: List[Dict[str, Any]]
    is_demo_data: bool = True
