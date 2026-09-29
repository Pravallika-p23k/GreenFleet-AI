import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
from typing import Dict, Any, Tuple

from app.ml.dataset_generator import generate_ship_fuel_dataset

MODEL_PATH = "fuel_model_pipeline.joblib"

class FuelPredictionModel:
    def __init__(self):
        self.pipeline = None
        self.metrics: Dict[str, Any] = {}
        self.is_trained = False
        
    def train(self) -> Dict[str, Any]:
        """
        Trains and evaluates fuel consumption regression models (RandomForest vs GradientBoosting).
        Calculates MAE, RMSE, and R2.
        """
        df = generate_ship_fuel_dataset(n_samples=1500)
        
        feature_cols = [
            "vessel_type", "capacity_dwt", "engine_power_kw", 
            "speed_knots", "distance_nm", "cargo_weight_tons", 
            "fuel_type", "weather_condition"
        ]
        target_col = "fuel_consumption_tons"
        
        X = df[feature_cols]
        y = df[target_col]
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        categorical_features = ["vessel_type", "fuel_type", "weather_condition"]
        numerical_features = ["capacity_dwt", "engine_power_kw", "speed_knots", "distance_nm", "cargo_weight_tons"]
        
        preprocessor = ColumnTransformer(
            transformers=[
                ("num", "passthrough", numerical_features),
                ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features)
            ]
        )
        
        # Model 1: Random Forest
        rf_pipeline = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
        ])
        rf_pipeline.fit(X_train, y_train)
        rf_preds = rf_pipeline.predict(X_test)
        rf_mae = mean_absolute_error(y_test, rf_preds)
        rf_rmse = np.sqrt(mean_squared_error(y_test, rf_preds))
        rf_r2 = r2_score(y_test, rf_preds)
        
        # Model 2: Gradient Boosting
        gb_pipeline = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("regressor", GradientBoostingRegressor(n_estimators=100, random_state=42))
        ])
        gb_pipeline.fit(X_train, y_train)
        gb_preds = gb_pipeline.predict(X_test)
        gb_mae = mean_absolute_error(y_test, gb_preds)
        gb_rmse = np.sqrt(mean_squared_error(y_test, gb_preds))
        gb_r2 = r2_score(y_test, gb_preds)
        
        # Select best model (Gradient Boosting vs Random Forest)
        if gb_r2 >= rf_r2:
            self.pipeline = gb_pipeline
            best_model_name = "GradientBoostingRegressor"
            best_mae, best_rmse, best_r2 = gb_mae, gb_rmse, gb_r2
        else:
            self.pipeline = rf_pipeline
            best_model_name = "RandomForestRegressor"
            best_mae, best_rmse, best_r2 = rf_mae, rf_rmse, rf_r2
            
        self.metrics = {
            "selected_model": best_model_name,
            "mae": float(round(best_mae, 4)),
            "rmse": float(round(best_rmse, 4)),
            "r2_score": float(round(best_r2, 4)),
            "rf_comparison": {"mae": round(rf_mae, 4), "rmse": round(rf_rmse, 4), "r2": round(rf_r2, 4)},
            "gb_comparison": {"mae": round(gb_mae, 4), "rmse": round(gb_rmse, 4), "r2": round(gb_r2, 4)}
        }
        self.is_trained = True
        
        try:
            joblib.dump(self.pipeline, MODEL_PATH)
        except Exception as e:
            print("Failed to save model file:", e)
            
        return self.metrics

    def predict(self, input_dict: Dict[str, Any]) -> float:
        """
        Predicts fuel consumption in tons given input variables.
        """
        if not self.is_trained or self.pipeline is None:
            if os.path.exists(MODEL_PATH):
                try:
                    self.pipeline = joblib.load(MODEL_PATH)
                    self.is_trained = True
                except Exception:
                    self.train()
            else:
                self.train()
                
        df_input = pd.DataFrame([input_dict])
        prediction = self.pipeline.predict(df_input)[0]
        return max(0.5, float(prediction))

    def generate_speed_curve(self, input_dict: Dict[str, Any]) -> list:
        """
        Generates Speed vs Predicted Fuel Consumption curve for speeds 10 to 24 knots.
        """
        curve = []
        base_dict = input_dict.copy()
        for speed in range(10, 25):
            base_dict["speed_knots"] = float(speed)
            fuel = self.predict(base_dict)
            travel_hours = base_dict["distance_nm"] / speed
            curve.append({
                "speed_knots": speed,
                "predicted_fuel_tons": round(fuel, 2),
                "travel_hours": round(travel_hours, 1)
            })
        return curve

# Global instance
model_service = FuelPredictionModel()
