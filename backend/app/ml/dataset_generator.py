import numpy as np
import pandas as pd
import os

def generate_ship_fuel_dataset(n_samples: int = 1200, seed: int = 42) -> pd.DataFrame:
    """
    Generates synthetic Ship Fuel Consumption Dataset (Dataset 1 & 4) based on physical naval hydrodynamics:
    Power ~ Speed^3, Cargo load resistance factor, Fuel lower heating values, Weather sea margin.
    """
    np.random.seed(seed)
    
    vessel_types = ["Container Ship", "Bulk Carrier", "Oil Tanker", "Ro-Ro Vessel", "Gas Carrier"]
    fuel_types = ["HFO", "MGO", "LNG", "Methanol", "Ammonia", "Hydrogen"]
    weather_conditions = ["Calm", "Moderate", "Rough", "Severe"]
    
    # Emission factors (t CO2 / t fuel)
    co2_factors = {
        "HFO": 3.114,
        "MGO": 3.206,
        "LNG": 2.750,
        "Methanol": 1.375,
        "Ammonia": 0.0,
        "Hydrogen": 0.0
    }
    
    data = []
    for _ in range(n_samples):
        v_type = np.random.choice(vessel_types)
        f_type = np.random.choice(fuel_types, p=[0.4, 0.25, 0.2, 0.1, 0.03, 0.02])
        w_cond = np.random.choice(weather_conditions, p=[0.5, 0.3, 0.15, 0.05])
        
        # Physical parameters based on vessel type
        if v_type == "Container Ship":
            cap_dwt = np.random.uniform(30000, 120000)
            eng_power = np.random.uniform(25000, 65000)
            speed = np.random.uniform(12.0, 24.0)
        elif v_type == "Bulk Carrier":
            cap_dwt = np.random.uniform(40000, 180000)
            eng_power = np.random.uniform(15000, 35000)
            speed = np.random.uniform(10.0, 16.0)
        elif v_type == "Oil Tanker":
            cap_dwt = np.random.uniform(50000, 200000)
            eng_power = np.random.uniform(18000, 40000)
            speed = np.random.uniform(11.0, 17.0)
        elif v_type == "Ro-Ro Vessel":
            cap_dwt = np.random.uniform(10000, 40000)
            eng_power = np.random.uniform(12000, 30000)
            speed = np.random.uniform(14.0, 20.0)
        else: # Gas Carrier
            cap_dwt = np.random.uniform(20000, 90000)
            eng_power = np.random.uniform(20000, 45000)
            speed = np.random.uniform(13.0, 19.0)
            
        cargo = np.random.uniform(0.3, 0.95) * cap_dwt
        distance = np.random.uniform(500, 9000) # nautical miles
        
        # Weather factor (sea margin)
        w_factor = {"Calm": 1.0, "Moderate": 1.08, "Rough": 1.20, "Severe": 1.40}[w_cond]
        
        # Fuel energy density factor (relative to HFO)
        fuel_energy_factor = {
            "HFO": 1.0,
            "MGO": 0.95,
            "LNG": 0.85,
            "Methanol": 1.9,
            "Ammonia": 2.1,
            "Hydrogen": 0.38
        }[f_type]
        
        # Specific Fuel Consumption (SFOC in g/kWh) base: ~185 g/kWh
        sfoc = 185.0 * fuel_energy_factor
        
        # Cubic law for speed resistance: Power ~ (Speed / DesignSpeed)^3.2
        travel_hours = distance / speed
        load_ratio = (cargo / cap_dwt)
        power_used_kw = eng_power * (speed / 20.0)**3.1 * (0.7 + 0.3 * load_ratio) * w_factor
        power_used_kw = min(power_used_kw, eng_power * 1.1)
        
        # Daily fuel consumption tons = (Power_kW * SFOC * 24) / 1,000,000
        # Total fuel consumption tons = (Power_kW * SFOC * travel_hours) / 1,000,000
        base_fuel_tons = (power_used_kw * sfoc * travel_hours) / 1e6
        
        # Add slight stochastic sensor noise (+- 3%)
        fuel_consumption_tons = max(1.0, base_fuel_tons * np.random.normal(1.0, 0.03))
        
        co2_emissions = fuel_consumption_tons * co2_factors[f_type]
        
        data.append({
            "vessel_type": v_type,
            "capacity_dwt": round(cap_dwt, 1),
            "engine_power_kw": round(eng_power, 1),
            "speed_knots": round(speed, 2),
            "distance_nm": round(distance, 1),
            "cargo_weight_tons": round(cargo, 1),
            "fuel_type": f_type,
            "weather_condition": w_cond,
            "fuel_consumption_tons": round(fuel_consumption_tons, 2),
            "co2_emissions_tons": round(co2_emissions, 2),
            "travel_hours": round(travel_hours, 1)
        })
        
    df = pd.DataFrame(data)
    return df

if __name__ == "__main__":
    df = generate_ship_fuel_dataset()
    print("Dataset generated successfully. Shape:", df.shape)
    print(df.head())
