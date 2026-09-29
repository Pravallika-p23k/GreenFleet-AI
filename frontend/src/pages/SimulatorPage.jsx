import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Fuel, 
  Leaf, 
  DollarSign, 
  Clock, 
  BarChart2, 
  RefreshCw,
  Zap,
  Layers
} from 'lucide-react';
import { api } from '../services/api';
import TradeoffRadarChart from '../components/TradeoffRadarChart';
import ExplainableRecommendation from '../components/ExplainableRecommendation';
import DemoBadge from '../components/DemoBadge';

export default function SimulatorPage() {
  const [params, setParams] = useState({
    cost_priority: 40,
    emission_priority: 40,
    time_priority: 20,
    vessel_type: 'Container Ship',
    speed_knots: 16.0,
    fuel_type: 'LNG',
    cargo_weight_tons: 45000,
    distance_nm: 3500,
    weather_condition: 'Calm',
    fuel_price_usd_ton: 750
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
    params.fuel_price_usd_ton
  ]);

  const runSimulation = () => {
    setLoading(true);
    api.simulateScenario(params)
      .then(res => {
        setSimulation(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Simulation error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Primary Innovation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Adaptive Green Voyage Decision Simulator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Interactively test vessel, speed, fuel, cost, emissions, and schedule priorities in real-time.
          </p>
        </div>

        <DemoBadge type="quantum" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INTERACTIVE CONTROLS PANEL (Section 11) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-navy-800 space-y-6">
          
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <span>Interactive Scenario Parameters</span>
            </h2>
            {loading && <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />}
          </div>

          {/* PRIORITY SLIDERS */}
          <div className="space-y-4 bg-navy-950 p-4 rounded-xl border border-navy-800">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Optimization Objective Priorities (0 - 100%)
            </h3>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Cost Priority</span>
                <span className="text-emerald-400 font-mono font-bold">{params.cost_priority}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={params.cost_priority}
                onChange={(e) => setParams({ ...params, cost_priority: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Emission Priority</span>
                <span className="text-blue-400 font-mono font-bold">{params.emission_priority}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={params.emission_priority}
                onChange={(e) => setParams({ ...params, emission_priority: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Delivery-Time Priority</span>
                <span className="text-amber-400 font-mono font-bold">{params.time_priority}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={params.time_priority}
                onChange={(e) => setParams({ ...params, time_priority: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* VOYAGE & OPERATIONAL CONTROLS */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Vessel Type</label>
              <select
                value={params.vessel_type}
                onChange={(e) => setParams({ ...params, vessel_type: e.target.value })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Container Ship">Container Ship</option>
                <option value="Bulk Carrier">Bulk Carrier</option>
                <option value="Oil Tanker">Oil Tanker</option>
                <option value="Ro-Ro Vessel">Ro-Ro Vessel</option>
                <option value="Gas Carrier">Gas Carrier</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Speed: <strong className="text-emerald-400 font-mono">{params.speed_knots} knots</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  step="0.5"
                  value={params.speed_knots}
                  onChange={(e) => setParams({ ...params, speed_knots: Number(e.target.value) })}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Fuel Type</label>
                <select
                  value={params.fuel_type}
                  onChange={(e) => setParams({ ...params, fuel_type: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Cargo Weight (tons)</label>
                <input
                  type="number"
                  value={params.cargo_weight_tons}
                  onChange={(e) => setParams({ ...params, cargo_weight_tons: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Distance (nm)</label>
                <input
                  type="number"
                  value={params.distance_nm}
                  onChange={(e) => setParams({ ...params, distance_nm: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Weather Condition</label>
                <select
                  value={params.weather_condition}
                  onChange={(e) => setParams({ ...params, weather_condition: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Calm">Calm Sea</option>
                  <option value="Moderate">Moderate Sea</option>
                  <option value="Rough">Rough Sea</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Fuel Price ($/ton)</label>
                <input
                  type="number"
                  value={params.fuel_price_usd_ton}
                  onChange={(e) => setParams({ ...params, fuel_price_usd_ton: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

          </div>

        </div>

        {/* RECALCULATED SIMULATION RESULTS (Section 11 & Section 12) */}
        <div className="lg:col-span-7 space-y-6">
          
          {simulation ? (
            <div className="space-y-6">
              
              {/* RESULTS CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Fuel className="w-3.5 h-3.5 text-amber-400" />
                    <span>Fuel Consumption</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono">
                    {simulation.fuel_consumption_tons} <span className="text-xs text-slate-400">tons</span>
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CO₂ Emissions</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono">
                    {simulation.co2_emissions_tons} <span className="text-xs text-slate-400">tons</span>
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-purple-400" />
                    <span>Operating Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono">
                    ${simulation.operating_cost_usd.toLocaleString()}
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Travel Time</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono">
                    {simulation.travel_time_hours} <span className="text-xs text-slate-400">hrs</span>
                  </p>
                </div>

              </div>

              {/* TRADE-OFF RADAR CHART (Section 12) */}
              <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Trade-Off Multi-Objective Radar</h3>
                    <p className="text-xs text-slate-400">Visually balances cost, emissions, speed, and schedule reliability</p>
                  </div>
                  <span className="text-lg font-extrabold text-emerald-400 font-mono">
                    Score: {simulation.compliance_score}/100
                  </span>
                </div>

                <TradeoffRadarChart data={simulation.tradeoff_radar} />
              </div>

              {/* EXPLAINABLE RECOMMENDATIONS (Section 13) */}
              <ExplainableRecommendation 
                explanations={simulation.explainable_reasons} 
                planName={`Simulated Scenario (${params.fuel_type} @ ${params.speed_knots}kn)`} 
              />

            </div>
          ) : (
            <div className="glass-panel p-16 rounded-2xl border border-navy-800 text-center">
              Recalculating scenario...
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
