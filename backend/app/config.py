import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GreenFleet AI"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./greenfleet.db")
    
    # ML & Optimization settings
    DEFAULT_MODEL_TYPE: str = "RandomForest"
    QUANTUM_TUNNELING_FACTOR: float = 0.85
    DEFAULT_SPEED_KNOTS: float = 16.0
    
    class Config:
        case_sensitive = True

settings = Settings()
