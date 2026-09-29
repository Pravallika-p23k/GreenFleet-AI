import React, { useState } from 'react';
import { 
  Compass, 
  Cpu, 
  Ship, 
  Fuel, 
  Sliders, 
  CheckCircle, 
  Sparkles, 
  AlertTriangle,
  Award,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { api } from '../services/api';
import DemoBadge from '../components/DemoBadge';
import ExplainableRecommendation from '../components/ExplainableRecommendation';

export default function VoyageOptimizerPage() {
  const [formData, setFormData] = useState({
    origin: 'Rotterdam (NLD)',
    destination: 'Singapore (SGP)',
    distance_nm: 8280,
    cargo_weight_tons: 45000,
    delivery_deadline_hours: 500,
    vessel_ids: ['VES-101', 'VES-102', 'VES-103', 'VES-104', 'VES-105'],
    fuel_options: ['HFO', 'MGO', 'LNG', 'Methanol', 'Ammonia', 'Hydrogen'],
    min_speed_knots: 10,
    max_speed_knots: 22,
    cost_priority: 40,
    emission_priority: 40,
    time_priority: 20
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toggleVessel = (id) => {
    const ids = formData.vessel_ids.includes(id)
      ? formData.vessel_ids.filter(v => v !== id)
      : [...formData.vessel_ids, id];
    setFormData({ ...formData, vessel_ids: ids });
  };

  const toggleFuel = (f) => {
    const fuels = formData.fuel_options.includes(f)
      ? formData.fuel_options.filter(x => x !== f)
      : [...formData.fuel_options, f];
    setFormData({ ...formData, fuel_options: fuels });
  };

  const handleOptimize = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Run Quantum-Inspired Optimization (with slight loading delay for presentation impact)
    api.optimizeVoyage(formData)
      .then(res => {
        setTimeout(() => {
          setResult(res);
          setLoading(false);
        }, 1200);
      })
      .catch(err => {
        console.error("Optimization error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Voyage Fleet Optimizer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Quantum-Inspired Multi-Objective Optimization evaluating vessel speed, fuel types, operating cost, and emissions.
          </p>
        </div>

        <DemoBadge type="quantum" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT PANEL (Section 10) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-navy-800 space-y-6">
          
          <div className="flex items-center justify-between border-b border-navy-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Voyage & Fleet Inputs</h2>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">QUBO Setup</span>
          </div>

          <form onSubmit={handleOptimize} className="space-y-4 text-xs">
            
            {/* Voyage Route */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Origin Port</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Destination Port</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Distance (nm)</label>
                <input
                  type="number"
                  value={formData.distance_nm}
                  onChange={(e) => setFormData({ ...formData, distance_nm: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cargo (tons)</label>
                <input
                  type="number"
                  value={formData.cargo_weight_tons}
                  onChange={(e) => setFormData({ ...formData, cargo_weight_tons: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Deadline (hrs)</label>
                <input
                  type="number"
                  value={formData.delivery_deadline_hours}
                  onChange={(e) => setFormData({ ...formData, delivery_deadline_hours: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-emerald-400 font-bold font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Fuel Options */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Candidate Fuel Options</label>
              <div className="flex flex-wrap gap-2">
                {['HFO', 'MGO', 'LNG', 'Methanol', 'Ammonia', 'Hydrogen'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFuel(f)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition ${
                      formData.fuel_options.includes(f)
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-navy-950 border-navy-800 text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed limits */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Min Speed (knots)</label>
                <input
                  type="number"
                  value={formData.min_speed_knots}
                  onChange={(e) => setFormData({ ...formData, min_speed_knots: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Max Speed (knots)</label>
                <input
                  type="number"
                  value={formData.max_speed_knots}
                  onChange={(e) => setFormData({ ...formData, max_speed_knots: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Optimization Objectives Sliders */}
            <div className="space-y-3 pt-2 border-t border-navy-800">
              <span className="text-slate-200 font-bold block">Optimization Objective Weights</span>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Cost Priority</span>
                  <span className="text-emerald-400 font-mono">{formData.cost_priority}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.cost_priority}
                  onChange={(e) => setFormData({ ...formData, cost_priority: Number(e.target.value) })}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Emission Priority</span>
                  <span className="text-blue-400 font-mono">{formData.emission_priority}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.emission_priority}
                  onChange={(e) => setFormData({ ...formData, emission_priority: Number(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Delivery-Time Priority</span>
                  <span className="text-amber-400 font-mono">{formData.time_priority}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.time_priority}
                  onChange={(e) => setFormData({ ...formData, time_priority: Number(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating Candidate Fleet Combinations...</span>
                </div>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>RUN QUANTUM-INSPIRED OPTIMIZATION</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* RESULTS PANEL (Section 10) */}
        <div className="lg:col-span-7 space-y-6">
          
          {loading ? (
            <div className="glass-panel p-16 rounded-2xl border border-navy-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto animate-pulse">
                <Cpu className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-white">Generating and evaluating candidate fleet configurations...</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Running transverse-field QUBO quantum-inspired annealing across speed, fuel, and vessel combinations.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              
              {/* Header Banner */}
              <div className="bg-navy-900 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Recommended Plan According to Selected Objectives</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 font-mono">
                    Execution Time: {result.execution_time_ms} ms | Algorithm: {result.algorithm}
                  </p>
                </div>
                <DemoBadge type="quantum" />
              </div>

              {/* CANDIDATE PLANS CARDS (Plan A, Plan B, Plan C) */}
              <div className="space-y-4">
                {result.candidate_plans.map((plan) => (
                  <div 
                    key={plan.plan_id}
                    className={`p-5 rounded-2xl border transition ${
                      plan.is_recommended 
                        ? 'bg-navy-850 border-emerald-500/60 shadow-lg shadow-emerald-500/10' 
                        : 'glass-card border-navy-800 hover:border-navy-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-navy-800">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                          plan.is_recommended ? 'bg-emerald-500 text-navy-950' : 'bg-navy-800 text-slate-300'
                        }`}>
                          {plan.plan_id}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-white">{plan.plan_name}</h4>
                          <p className="text-xs text-slate-400">{plan.vessel_name} ({plan.vessel_id})</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {plan.is_recommended && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Recommended Strategy
                          </span>
                        )}
                        <span className="text-lg font-extrabold text-emerald-400 font-mono">
                          {plan.score}/100 Score
                        </span>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
                      <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                        <span className="text-slate-400 text-[10px] block">Speed & Fuel</span>
                        <span className="font-bold text-white font-mono">{plan.speed_knots} kn • {plan.fuel_type}</span>
                      </div>

                      <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                        <span className="text-slate-400 text-[10px] block">Operating Cost</span>
                        <span className="font-bold text-purple-400 font-mono">${plan.operating_cost_usd.toLocaleString()}</span>
                      </div>

                      <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                        <span className="text-slate-400 text-[10px] block">CO₂ Emissions</span>
                        <span className="font-bold text-emerald-400 font-mono">{plan.co2_emissions_tons.toLocaleString()} t</span>
                      </div>

                      <div className="bg-navy-950 p-2.5 rounded-lg border border-navy-800">
                        <span className="text-slate-400 text-[10px] block">Travel Time</span>
                        <span className="font-bold text-blue-400 font-mono">{plan.travel_time_hours} hrs</span>
                      </div>
                    </div>

                    {/* Explainable details */}
                    <ExplainableRecommendation explanations={plan.explanations} planName={plan.plan_name} />

                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="glass-panel p-16 rounded-2xl border border-navy-800 text-center space-y-3">
              <Compass className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Quantum Optimization Ready</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Configure your voyage parameters & weights on the left, then click "RUN QUANTUM-INSPIRED OPTIMIZATION" to compare candidate fleet plans.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
