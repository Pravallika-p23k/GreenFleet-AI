from fastapi import APIRouter
from app.schemas import BenchmarkResponse
from app.optimization.conventional import conv_optimizer

router = APIRouter(prefix="/benchmark", tags=["benchmarking"])

@router.post("", response_model=BenchmarkResponse)
def run_benchmark():
    """
    Benchmarks Conventional Optimization (MILP/Greedy Heuristic) vs.
    Quantum-Inspired Optimization running on Classical Infrastructure.
    """
    return conv_optimizer.solve_benchmark()
