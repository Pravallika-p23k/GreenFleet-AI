import React, { useState } from "react";
import {
  Fuel,
  DollarSign,
  Leaf,
  Clock,
  Sparkles,
  TrendingUp,
  BarChart2,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { api } from "../services/api";
import DemoBadge from "../components/DemoBadge";

export default function FuelPredictionPage() {
  const [formData, setFormData] = useState({
    vessel_type: "Container Ship",
    capacity_dwt: 55000,
    engine_power_kw: 38000,
    speed_knots: 16.5,
    distance_nm: 3500,
    cargo_weight_tons: 45000,
    fuel_type: "LNG",
    weather_condition: "Calm",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    api
      .predictFuel(formData)
      .then((res) => {
        setResult(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Prediction error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#06141F] text-white">
      <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/15 border border-[#0D9488]/30 flex items-center justify-center">
                <Fuel className="w-5 h-5 text-[#2DD4BF]" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                 Fuel Consumption Prediction
                </h1>

                <p className="text-sm text-[#8BA3B3] mt-1">
                  AI-powered vessel fuel and emissions prediction under changing
                  operational conditions.
                </p>
              </div>
            </div>
          </div>

          <DemoBadge type="ml" />
        </div>

        {/* ========================================================= */}
        {/* MAIN GRID */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ======================================================= */}
          {/* INPUT FORM */}
          {/* ======================================================= */}

          <div className="lg:col-span-5 bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] shadow-xl space-y-6">
            {/* Form Header */}

            <div className="flex items-center gap-3 border-b border-[#16445A] pb-4">
              <div className="w-9 h-9 rounded-lg bg-[#0D9488]/15 border border-[#0D9488]/30 flex items-center justify-center">
                <Fuel className="w-4 h-4 text-[#2DD4BF]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  Vessel & Voyage Parameters
                </h2>

                <p className="text-[11px] text-[#718A9A]">
                  Configure operating conditions for ML inference
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Vessel Type */}

              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5">
                  Vessel Type
                </label>

                <select
                  value={formData.vessel_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vessel_type: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                >
                  <option value="Container Ship">Container Ship</option>
                  <option value="Bulk Carrier">Bulk Carrier</option>
                  <option value="Oil Tanker">Oil Tanker</option>
                  <option value="Ro-Ro Vessel">Ro-Ro Vessel</option>
                  <option value="Gas Carrier">Gas Carrier</option>
                </select>
              </div>

              {/* Capacity + Engine */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Capacity (DWT)
                  </label>

                  <input
                    type="number"
                    value={formData.capacity_dwt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity_dwt: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Engine Power (kW)
                  </label>

                  <input
                    type="number"
                    value={formData.engine_power_kw}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        engine_power_kw: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Speed + Distance */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Speed (knots)
                  </label>

                  <input
                    type="number"
                    step="0.5"
                    value={formData.speed_knots}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        speed_knots: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-[#2DD4BF] font-bold font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Distance (nm)
                  </label>

                  <input
                    type="number"
                    value={formData.distance_nm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        distance_nm: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Cargo + Fuel */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Cargo Weight (tons)
                  </label>

                  <input
                    type="number"
                    value={formData.cargo_weight_tons}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cargo_weight_tons: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Fuel Option
                  </label>

                  <select
                    value={formData.fuel_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fuel_type: e.target.value,
                      })
                    }
                    className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                  >
                    <option value="HFO">HFO (Heavy Fuel Oil)</option>
                    <option value="MGO">MGO (Marine Gas Oil)</option>
                    <option value="LNG">LNG (Liquefied Natural Gas)</option>
                    <option value="Methanol">Methanol</option>
                    <option value="Ammonia">Ammonia</option>
                    <option value="Hydrogen">Hydrogen</option>
                  </select>
                </div>
              </div>

              {/* Weather */}

              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5">
                  Weather Condition
                </label>

                <select
                  value={formData.weather_condition}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weather_condition: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                >
                  <option value="Calm">Calm Sea (Beaufort 0-2)</option>

                  <option value="Moderate">Moderate Sea (Beaufort 3-4)</option>

                  <option value="Rough">Rough Sea (Beaufort 5-6)</option>

                  <option value="Severe">Severe Sea (Beaufort 7+)</option>
                </select>
              </div>

              {/* Prediction Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] font-bold rounded-xl text-sm transition shadow-lg shadow-[#0D9488]/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#06141F] border-t-transparent rounded-full animate-spin" />

                    <span>Computing Prediction...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />

                    <span>Predict Fuel Consumption</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ======================================================= */}
          {/* RESULTS */}
          {/* ======================================================= */}

          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6">
                {/* Prediction Cards */}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Fuel */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#0D9488]/50 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-1">
                      <Fuel className="w-3.5 h-3.5 text-[#FBBF24]" />

                      <span>Predicted Fuel</span>
                    </div>

                    <p className="text-2xl font-extrabold text-white font-mono">
                      {result.predicted_fuel_tons}

                      <span className="text-xs text-[#718A9A]"> tons</span>
                    </p>
                  </div>

                  {/* Cost */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#0D9488]/50 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#A78BFA]" />

                      <span>Fuel Cost</span>
                    </div>

                    <p className="text-2xl font-extrabold text-white font-mono">
                      ${result.estimated_cost_usd.toLocaleString()}
                    </p>
                  </div>

                  {/* CO2 */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#0D9488]/50 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-1">
                      <Leaf className="w-3.5 h-3.5 text-[#2DD4BF]" />

                      <span>CO₂ Emissions</span>
                    </div>

                    <p className="text-2xl font-extrabold text-white font-mono">
                      {result.estimated_co2_tons}

                      <span className="text-xs text-[#718A9A]"> tons</span>
                    </p>
                  </div>

                  {/* Travel Time */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#0D9488]/50 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />

                      <span>Travel Time</span>
                    </div>

                    <p className="text-2xl font-extrabold text-white font-mono">
                      {result.estimated_travel_hours}

                      <span className="text-xs text-[#718A9A]"> hrs</span>
                    </p>
                  </div>
                </div>

                {/* ================================================= */}
                {/* MODEL PERFORMANCE */}
                {/* ================================================= */}

                {result.model_metrics && (
                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#0D9488]/15 border border-[#0D9488]/30 flex items-center justify-center">
                          <BarChart2 className="w-4 h-4 text-[#2DD4BF]" />
                        </div>

                        <div>
                          <span className="text-[#B7C8D3] font-semibold text-xs block">
                            Trained ML Model
                          </span>

                          <span className="text-[10px] text-[#718A9A]">
                            {result.model_metrics.selected_model}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-5 font-mono text-xs">
                        <span className="text-[#8BA3B3]">
                          R² Score:{" "}
                          <strong className="text-[#2DD4BF]">
                            {result.model_metrics.r2_score}
                          </strong>
                        </span>

                        <span className="text-[#8BA3B3]">
                          MAE:{" "}
                          <strong className="text-[#38BDF8]">
                            {result.model_metrics.mae} tons
                          </strong>
                        </span>

                        <span className="text-[#8BA3B3]">
                          RMSE:{" "}
                          <strong className="text-[#A78BFA]">
                            {result.model_metrics.rmse} tons
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* SPEED VS FUEL CHART */}
                {/* ================================================= */}

                <div className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Speed vs. Predicted Fuel Consumption
                      </h3>

                      <p className="text-xs text-[#718A9A] mt-1">
                        Non-linear hydrodynamic resistance curve
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-lg bg-[#0D9488]/15 border border-[#0D9488]/30 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#2DD4BF]" />
                    </div>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.speed_sensitivity_curve}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#16445A" />

                        <XAxis
                          dataKey="speed_knots"
                          stroke="#718A9A"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: "Speed (knots)",
                            position: "insideBottom",
                            offset: -5,
                            fill: "#718A9A",
                            fontSize: 11,
                          }}
                        />

                        <YAxis
                          stroke="#718A9A"
                          tick={{ fontSize: 12 }}
                          label={{
                            value: "Fuel (tons)",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#718A9A",
                            fontSize: 11,
                          }}
                        />

                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#071923",
                            borderColor: "#16445A",
                            borderRadius: "10px",
                            color: "#FFFFFF",
                          }}
                          labelStyle={{
                            color: "#2DD4BF",
                          }}
                        />

                        <Line
                          type="monotone"
                          dataKey="predicted_fuel_tons"
                          stroke="#2DD4BF"
                          strokeWidth={3}
                          dot={{
                            r: 4,
                            fill: "#0D9488",
                            stroke: "#2DD4BF",
                            strokeWidth: 2,
                          }}
                          activeDot={{
                            r: 6,
                            fill: "#2DD4BF",
                          }}
                          name="Predicted Fuel (tons)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              /* ===================================================== */
              /* EMPTY STATE */
              /* ===================================================== */

              <div className="bg-[#0A1C29] p-12 rounded-2xl border border-[#16445A] text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0D9488]/10 border border-[#16445A] flex items-center justify-center">
                  <Fuel className="w-8 h-8 text-[#2DD4BF]" />
                </div>

                <h3 className="text-lg font-bold text-white">
                  Ready for Hydrodynamic Fuel Inference
                </h3>

                <p className="text-xs text-[#718A9A] max-w-md mx-auto leading-relaxed">
                  Configure the vessel specifications and voyage conditions,
                  then run the ML model to estimate fuel consumption, emissions,
                  cost, and travel time.
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="px-3 py-1.5 rounded-full text-[10px] font-medium bg-[#0D9488]/10 text-[#5EEAD4] border border-[#0D9488]/20">
                    AI Prediction
                  </span>

                  <span className="px-3 py-1.5 rounded-full text-[10px] font-medium bg-[#16445A]/40 text-[#8BA3B3] border border-[#16445A]">
                    Fuel Analysis
                  </span>

                  <span className="px-3 py-1.5 rounded-full text-[10px] font-medium bg-[#16445A]/40 text-[#8BA3B3] border border-[#16445A]">
                    CO₂ Estimation
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
