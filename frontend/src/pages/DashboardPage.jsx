import React, { useEffect, useState } from 'react';
import { 
  Ship, 
  Navigation, 
  Fuel, 
  Leaf, 
  DollarSign, 
  Cpu,
  TrendingUp,
  Activity,
  AlertCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

import { api } from '../services/api';
import DemoBadge from '../components/DemoBadge';

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-emerald-400 font-semibold">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading Fleet Dashboard Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Fleet Operational Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time monitoring, AI fuel predictions, and quantum-inspired optimization status.
          </p>
        </div>

       
      </div>

      {/* SUMMARY CARDS (Section 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Card 1: Total Vessels */}
        <div className="glass-card p-4 rounded-xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Vessels</span>
            <Ship className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">{data.total_vessels}</p>
            <span className="text-[11px] text-emerald-400">100% Operational</span>
          </div>
        </div>

        {/* Card 2: Active Voyages */}
        <div className="glass-card p-4 rounded-xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Active Voyages</span>
            <Navigation className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">{data.active_voyages}</p>
            <span className="text-[11px] text-blue-400">Underway in Transit</span>
          </div>
        </div>

        {/* Card 3: Predicted Fuel Consumption */}
        <div className="glass-card p-4 rounded-xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Predicted Fuel</span>
            <Fuel className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">{data.predicted_fuel_consumption_tons.toLocaleString()} <span className="text-xs text-slate-400">tons</span></p>
            <span className="text-[11px] text-amber-400">Weekly Fleet Total</span>
          </div>
        </div>

        {/* Card 4: Estimated CO2 */}
        <div className="glass-card p-4 rounded-xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Estimated CO₂</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">{data.estimated_co2_tons.toLocaleString()} <span className="text-xs text-slate-400">tons</span></p>
            <span className="text-[11px] text-emerald-400">-19.8% vs Baseline</span>
          </div>
        </div>

        {/* Card 5: Operating Cost */}
        <div className="glass-card p-4 rounded-xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Operating Cost</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">${(data.operating_cost_usd / 1e6).toFixed(2)}M</p>
            <span className="text-[11px] text-purple-400">Bunker Fuel Expense</span>
          </div>
        </div>

        {/* Card 6: Optimization Status */}
        <div className="glass-card p-4 rounded-xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Opt Status</span>
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="mt-3">
            <p className="text-sm font-bold text-emerald-400 leading-tight">QIA Active</p>
            <span className="text-[10px] text-slate-400 block mt-1">Transverse Field QUBO</span>
          </div>
        </div>

      </div>

      {/* CHARTS GRID (Section 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Fuel Consumption Trend */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Fuel Consumption Trend</h3>
              <p className="text-xs text-slate-400">Predicted ML fuel tons vs. Actual vessel logs</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.fuel_trend}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="day" stroke="#64748B" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="predicted_fuel" stroke="#10B981" fillOpacity={1} fill="url(#colorPredicted)" name="ML Predicted Fuel (tons)" />
                <Area type="monotone" dataKey="actual_fuel" stroke="#3B82F6" fillOpacity={1} fill="url(#colorActual)" name="Actual Consumed (tons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CO2 Emissions Trend */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">CO₂ Emissions Trend</h3>
              <p className="text-xs text-slate-400">Daily fleet GHG output in metric tons</p>
            </div>
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.co2_trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="day" stroke="#64748B" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                <Bar dataKey="co2_emissions" fill="#10B981" radius={[6, 6, 0, 0]} name="CO₂ Emissions (tons)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Vessel Efficiency Comparison */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Vessel Efficiency Comparison</h3>
              <p className="text-xs text-slate-400">CII compliance rating score (0 - 100)</p>
            </div>
            <Activity className="w-5 h-5 text-purple-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.vessel_efficiency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" width={110} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                <Bar dataKey="rating" fill="#8B5CF6" radius={[0, 6, 6, 0]} name="Efficiency Rating Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Fuel-Type Comparison */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Fuel-Type Fleet Share</h3>
              <p className="text-xs text-slate-400">Alternative fuel breakdown across current fleet</p>
            </div>
            <Fuel className="w-5 h-5 text-amber-400" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.fuel_type_breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.fuel_type_breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
