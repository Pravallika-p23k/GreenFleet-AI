import React, { useState, useEffect } from "react";
import {
  Sliders,
  Fuel,
  Leaf,
  DollarSign,
  Clock,
  RefreshCw,
  Zap,
  Layers,
} from "lucide-react";
import { api } from "../services/api";
import TradeoffRadarChart from "../components/TradeoffRadarChart";
import ExplainableRecommendation from "../components/ExplainableRecommendation";
import DemoBadge from "../components/DemoBadge";

export default function SimulatorPage() {
  const [params, setParams] = useState({
    cost_priority: 40,
    emission_priority: 40,
    time_priority: 20,
    vessel_type: "Container Ship",
    speed_knots: 16.0,
    fuel_type: "LNG",
    cargo_weight_tons: 45000,
    distance_nm: 3500,
    weather_condition: "Calm",
    fuel_price_usd_ton: 750,
  });

  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    runSimulation();
  }, [
    params.cost_priority,
    params.emission_priority,
    params.time_priority,
    params.vessel_type,
    params.speed_knots,
    params.fuel_type,
    params.cargo_weight_tons,
    params.distance_nm,
    params.weather_condition,
    params.fuel_price_usd_ton,
  ]);

  const runSimulation = () => {
    setLoading(true);

    api
      .simulateScenario(params)
      .then((res) => {
        setSimulation(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Simulation error:", err);
        setLoading(false);
      });
  };

  const resetParameters = () => {
    setParams({
      cost_priority: 40,
      emission_priority: 40,
      time_priority: 20,
      vessel_type: "Container Ship",
      speed_knots: 16.0,
      fuel_type: "LNG",
      cargo_weight_tons: 45000,
      distance_nm: 3500,
      weather_condition: "Calm",
      fuel_price_usd_ton: 750,
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
            

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Adaptive Green Voyage Decision Simulator
            </h1>

            <p className="text-sm text-[#8BA3B3] mt-1">
              Interactively test vessel, speed, fuel, cost, emissions, and
              schedule priorities in real-time.
            </p>
          </div>

          
        </div>

        {/* ========================================================= */}
        {/* MAIN GRID */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ======================================================= */}
          {/* CONTROLS PANEL */}
          {/* ======================================================= */}

          <div className="lg:col-span-5">
            <div className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] shadow-xl space-y-6">
              {/* Panel Header */}

              <div className="flex items-center justify-between border-b border-[#16445A] pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center">
                    <Sliders className="w-4 h-4 text-[#2DD4BF]" />
                  </div>

                  <span>Interactive Scenario Parameters</span>
                </h2>

                {loading && (
                  <RefreshCw className="w-4 h-4 text-[#2DD4BF] animate-spin" />
                )}
              </div>

              {/* =================================================== */}
              {/* PRIORITY SLIDERS */}
              {/* =================================================== */}

              <div className="space-y-5 bg-[#071923] p-4 rounded-xl border border-[#16445A]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#38BDF8]" />

                  <h3 className="text-xs font-bold text-[#D9E6EC] uppercase tracking-wider">
                    Optimization Objective Priorities
                  </h3>
                </div>

                <p className="text-[10px] text-[#718A9A]">
                  Adjust the importance of each objective from 0 to 100%.
                </p>

                {/* COST */}

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#B7C8D3]">Cost Priority</span>

                    <span className="text-[#2DD4BF] font-mono font-bold">
                      {params.cost_priority}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.cost_priority}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        cost_priority: Number(e.target.value),
                      })
                    }
                    className="w-full accent-[#2DD4BF]"
                  />
                </div>

                {/* EMISSIONS */}

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#B7C8D3]">Emission Priority</span>

                    <span className="text-[#38BDF8] font-mono font-bold">
                      {params.emission_priority}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.emission_priority}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        emission_priority: Number(e.target.value),
                      })
                    }
                    className="w-full accent-[#38BDF8]"
                  />
                </div>

                {/* DELIVERY TIME */}

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#B7C8D3]">
                      Delivery-Time Priority
                    </span>

                    <span className="text-[#FBBF24] font-mono font-bold">
                      {params.time_priority}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={params.time_priority}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        time_priority: Number(e.target.value),
                      })
                    }
                    className="w-full accent-[#FBBF24]"
                  />
                </div>
              </div>

              {/* =================================================== */}
              {/* VOYAGE CONTROLS */}
              {/* =================================================== */}

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#A78BFA]" />

                  <h3 className="text-sm font-bold text-white">
                    Voyage & Operational Controls
                  </h3>
                </div>

                {/* VESSEL TYPE */}

                <div>
                  <label className="block text-[#B7C8D3] font-medium mb-1.5">
                    Vessel Type
                  </label>

                  <select
                    value={params.vessel_type}
                    onChange={(e) =>
                      setParams({
                        ...params,
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

                {/* SPEED + FUEL */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-2">
                      Speed
                      <strong className="text-[#2DD4BF] font-mono ml-1">
                        {params.speed_knots} knots
                      </strong>
                    </label>

                    <input
                      type="range"
                      min="10"
                      max="24"
                      step="0.5"
                      value={params.speed_knots}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          speed_knots: Number(e.target.value),
                        })
                      }
                      className="w-full accent-[#2DD4BF]"
                    />

                    <div className="flex justify-between text-[9px] text-[#718A9A] mt-1">
                      <span>10 kn</span>
                      <span>24 kn</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Fuel Type
                    </label>

                    <select
                      value={params.fuel_type}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          fuel_type: e.target.value,
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    >
                      <option value="HFO">HFO ($580/t)</option>

                      <option value="MGO">MGO ($820/t)</option>

                      <option value="LNG">LNG ($750/t)</option>

                      <option value="Methanol">Methanol ($950/t)</option>

                      <option value="Ammonia">Ammonia ($1100/t)</option>

                      <option value="Hydrogen">Hydrogen ($1800/t)</option>
                    </select>
                  </div>
                </div>

                {/* CARGO + DISTANCE */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Cargo Weight (tons)
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={params.cargo_weight_tons}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          cargo_weight_tons: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Distance (nm)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={params.distance_nm}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          distance_nm: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* WEATHER + FUEL PRICE */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Weather Condition
                    </label>

                    <select
                      value={params.weather_condition}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          weather_condition: e.target.value,
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    >
                      <option value="Calm">Calm Sea</option>

                      <option value="Moderate">Moderate Sea</option>

                      <option value="Rough">Rough Sea</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Fuel Price ($/ton)
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={params.fuel_price_usd_ton}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          fuel_price_usd_ton: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* RESET BUTTON */}

                <button
                  type="button"
                  onClick={resetParameters}
                  className="w-full mt-2 px-4 py-2.5 rounded-xl bg-[#071923] border border-[#16445A] text-[#B7C8D3] hover:bg-[#102A3A] hover:text-white transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Scenario Parameters
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* SIMULATION RESULTS */}
          {/* ======================================================= */}

          <div className="lg:col-span-7 space-y-6">
            {simulation ? (
              <div className="space-y-6">
                {/* ================================================= */}
                {/* RESULT CARDS */}
                {/* ================================================= */}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* FUEL */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#FBBF24]/40 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-2">
                      <Fuel className="w-3.5 h-3.5 text-[#FBBF24]" />

                      <span>Fuel Consumption</span>
                    </div>

                    <p className="text-2xl font-bold text-white font-mono">
                      {simulation.fuel_consumption_tons}

                      <span className="text-xs text-[#718A9A] ml-1">tons</span>
                    </p>
                  </div>

                  {/* CO2 */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#2DD4BF]/40 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-2">
                      <Leaf className="w-3.5 h-3.5 text-[#2DD4BF]" />

                      <span>CO₂ Emissions</span>
                    </div>

                    <p className="text-2xl font-bold text-white font-mono">
                      {simulation.co2_emissions_tons}

                      <span className="text-xs text-[#718A9A] ml-1">tons</span>
                    </p>
                  </div>

                  {/* COST */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#A78BFA]/40 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-2">
                      <DollarSign className="w-3.5 h-3.5 text-[#A78BFA]" />

                      <span>Operating Cost</span>
                    </div>

                    <p className="text-2xl font-bold text-white font-mono">
                      $
                      {Number(
                        simulation.operating_cost_usd || 0,
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* TIME */}

                  <div className="bg-[#0A1C29] p-4 rounded-xl border border-[#16445A] hover:border-[#38BDF8]/40 transition">
                    <div className="flex items-center gap-1.5 text-[#8BA3B3] text-xs mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />

                      <span>Travel Time</span>
                    </div>

                    <p className="text-2xl font-bold text-white font-mono">
                      {simulation.travel_time_hours}

                      <span className="text-xs text-[#718A9A] ml-1">hrs</span>
                    </p>
                  </div>
                </div>

                {/* ================================================= */}
                {/* RADAR CHART */}
                {/* ================================================= */}

                <div className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center">
                          <Layers className="w-4 h-4 text-[#38BDF8]" />
                        </div>

                        <h3 className="text-base font-bold text-white">
                          Trade-Off Multi-Objective Radar
                        </h3>
                      </div>

                      <p className="text-xs text-[#8BA3B3] mt-2">
                        Visually balances cost, emissions, speed, and schedule
                        reliability.
                      </p>
                    </div>

                    <div className="px-3 py-2 rounded-lg bg-[#071923] border border-[#16445A]">
                      <span className="text-[10px] text-[#718A9A] block uppercase tracking-wider">
                        Scenario Score
                      </span>

                      <span className="text-lg font-extrabold text-[#2DD4BF] font-mono">
                        {simulation.compliance_score}

                        <span className="text-xs text-[#718A9A]">/100</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <TradeoffRadarChart data={simulation.tradeoff_radar} />
                  </div>
                </div>

                {/* ================================================= */}
                {/* EXPLAINABLE RECOMMENDATION */}
                {/* ================================================= */}

                <div className="bg-[#0A1C29] rounded-2xl border border-[#16445A] overflow-hidden">
                  <ExplainableRecommendation
                    explanations={simulation.explainable_reasons}
                    planName={`Simulated Scenario (${params.fuel_type} @ ${params.speed_knots}kn)`}
                  />
                </div>

                {/* ================================================= */}
                {/* SCENARIO SUMMARY */}
                {/* ================================================= */}

                <div className="bg-[#071923] border border-[#16445A] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/10 border border-[#A78BFA]/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#A78BFA]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Scenario Configuration
                      </h3>

                      <p className="text-[10px] text-[#718A9A]">
                        Current parameters used for this simulation.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#0A1C29] rounded-lg border border-[#16445A] p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Vessel
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold">
                        {params.vessel_type}
                      </span>
                    </div>

                    <div className="bg-[#0A1C29] rounded-lg border border-[#16445A] p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Fuel
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold">
                        {params.fuel_type}
                      </span>
                    </div>

                    <div className="bg-[#0A1C29] rounded-lg border border-[#16445A] p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Speed
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold font-mono">
                        {params.speed_knots} kn
                      </span>
                    </div>

                    <div className="bg-[#0A1C29] rounded-lg border border-[#16445A] p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Weather
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold">
                        {params.weather_condition}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A1C29] p-16 rounded-2xl border border-[#16445A] text-center">
                <RefreshCw className="w-8 h-8 text-[#2DD4BF] animate-spin mx-auto mb-4" />

                <p className="text-sm text-[#8BA3B3]">
                  Recalculating scenario...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
