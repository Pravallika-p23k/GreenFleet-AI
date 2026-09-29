import React, { useState } from 'react';
import { 
  Fuel, 
  DollarSign, 
  Leaf, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  AlertCircle,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

import { api } from '../services/api';
import DemoBadge from '../components/DemoBadge';

export default function FuelPredictionPage() {
  const [formData, setFormData] = useState({
    vessel_type: 'Container Ship',
    capacity_dwt: 55000,
    engine_power_kw: 38000,
    speed_knots: 16.5,
    distance_nm: 3500,
    cargo_weight_tons: 45000,
    fuel_type: 'LNG',
    weather_condition: 'Calm'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api.predictFuel(formData)
      .then(res => {
        setResult(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Prediction error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            ML Fuel Consumption Prediction
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Trained Gradient Boosting & Random Forest Regressor models predicting vessel fuel consumption & GHG emissions.
          </p>
        </div>

        <DemoBadge type="ml" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT FORM (Section 9) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-navy-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-navy-800 pb-3">
            <Fuel className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Vessel & Voyage Parameters</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            <div>
              <label className="block text-slate-300 font-medium mb-1">Vessel Type</label>
              <select
                value={formData.vessel_type}
                onChange={(e) => setFormData({ ...formData, vessel_type: e.target.value })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:outline-none"
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
                <label className="block text-slate-300 font-medium mb-1">Capacity (DWT)</label>
                <input
                  type="number"
                  value={formData.capacity_dwt}
                  onChange={(e) => setFormData({ ...formData, capacity_dwt: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Engine Power (kW)</label>
                <input
                  type="number"
                  value={formData.engine_power_kw}
                  onChange={(e) => setFormData({ ...formData, engine_power_kw: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Speed (knots)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.speed_knots}
                  onChange={(e) => setFormData({ ...formData, speed_knots: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-emerald-400 font-bold font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Distance (nm)</label>
                <input
                  type="number"
                  value={formData.distance_nm}
                  onChange={(e) => setFormData({ ...formData, distance_nm: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Cargo Weight (tons)</label>
                <input
                  type="number"
                  value={formData.cargo_weight_tons}
                  onChange={(e) => setFormData({ ...formData, cargo_weight_tons: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Fuel Option</label>
                <select
                  value={formData.fuel_type}
                  onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:outline-none"
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

            <div>
              <label className="block text-slate-300 font-medium mb-1">Weather Condition</label>
              <select
                value={formData.weather_condition}
                onChange={(e) => setFormData({ ...formData, weather_condition: e.target.value })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="Calm">Calm Sea (Beaufort 0-2)</option>
                <option value="Moderate">Moderate Sea (Beaufort 3-4)</option>
                <option value="Rough">Rough Sea (Beaufort 5-6)</option>
                <option value="Severe">Severe Sea (Beaufort 7+)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
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

        {/* OUTPUT RESULTS & SPEED VS FUEL CHART */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Prediction Cards */}
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Fuel className="w-3.5 h-3.5 text-amber-400" />
                    <span>Predicted Fuel</span>
                  </div>
                  <p className="text-2xl font-extrabold text-white font-mono">
                    {result.predicted_fuel_tons} <span className="text-xs text-slate-400">tons</span>
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-purple-400" />
                    <span>Fuel Cost</span>
                  </div>
                  <p className="text-2xl font-extrabold text-white font-mono">
                    ${result.estimated_cost_usd.toLocaleString()}
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CO₂ Emissions</span>
                  </div>
                  <p className="text-2xl font-extrabold text-white font-mono">
                    {result.estimated_co2_tons} <span className="text-xs text-slate-400">tons</span>
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-navy-800">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Travel Time</span>
                  </div>
                  <p className="text-2xl font-extrabold text-white font-mono">
                    {result.estimated_travel_hours} <span className="text-xs text-slate-400">hrs</span>
                  </p>
                </div>

              </div>

              {/* Model Performance Metrics */}
              {result.model_metrics && (
                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 text-xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 font-semibold">Trained ML Model ({result.model_metrics.selected_model}):</span>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-slate-200">
                    <span>R² Score: <strong className="text-emerald-400">{result.model_metrics.r2_score}</strong></span>
                    <span>MAE: <strong className="text-blue-400">{result.model_metrics.mae} tons</strong></span>
                    <span>RMSE: <strong className="text-purple-400">{result.model_metrics.rmse} tons</strong></span>
                  </div>
                </div>
              )}

              {/* SPEED VS PREDICTED FUEL CONSUMPTION CHART (Section 9) */}
              <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Speed vs. Predicted Fuel Consumption</h3>
                    <p className="text-xs text-slate-400">Non-linear hydrodynamic resistance curve (Power ~ Speed³)</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.speed_sensitivity_curve}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                      <XAxis dataKey="speed_knots" stroke="#64748B" label={{ value: 'Speed (knots)', position: 'insideBottom', offset: -5, fill: '#64748B', fontSize: 11 }} />
                      <YAxis stroke="#64748B" label={{ value: 'Fuel (tons)', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="predicted_fuel_tons" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} name="Predicted Fuel (tons)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-navy-800 text-center space-y-3">
              <Fuel className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Ready for Hydrodynamic Fuel Inference</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Fill in the vessel specs & voyage parameters on the left, then click "Predict Fuel Consumption" to run ML inference and render the speed curve.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
