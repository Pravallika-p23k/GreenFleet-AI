import React, { useEffect, useState } from 'react';
import { 
  Leaf, 
  TrendingDown, 
  Fuel, 
  Ship, 
  BarChart3,
  CheckCircle,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Cell
} from 'recharts';

import { api } from '../services/api';
import DemoBadge from '../components/DemoBadge';

const FUEL_COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#06B6D4'];

export default function EmissionsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEmissions()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Emissions error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="py-16 text-center text-emerald-400">Loading Emissions Analytics...</div>;
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            CO₂ & Maritime Emissions Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tracking greenhouse gas intensity, EU-ETS allowances, and IMO CII compliance.
          </p>
        </div>

        <DemoBadge isDemo={true} label="Maritime CO₂ Registry" />
      </div>

      {/* SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-xl border border-navy-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Fleet CO₂</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {data.total_co2_emissions_tons.toLocaleString()} <span className="text-xs text-slate-400">tons</span>
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-navy-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>CO₂ Intensity</span>
            <Ship className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">
            {data.co2_per_nautical_mile} <span className="text-xs text-slate-400">t / nm</span>
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-navy-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Optimized Reduction</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 font-mono">
            -{data.conventional_vs_optimized.calculated_reduction_percent}%
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-navy-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Trees Saved Equivalent</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-400 font-mono">
            {data.conventional_vs_optimized.annual_trees_saved_equivalent.toLocaleString()}
          </p>
        </div>

      </div>

      {/* CONVENTIONAL VS OPTIMIZED PLAN COMPARISON (Section 14) */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-6 rounded-2xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            Calculated Decarbonization Impact
          </span>
          <h3 className="text-xl font-extrabold text-white">Conventional Plan vs Quantum-Optimized Plan</h3>
          <p className="text-xs text-slate-300">
            Switching to LNG/Methanol + hydrodynamic eco-speed curves saves <strong className="text-emerald-400">2,470 metric tons of CO₂</strong> per quarter.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs font-mono">
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Conventional Strategy</span>
            <span className="text-slate-200 text-lg font-bold">12,470 t CO₂</span>
          </div>

          <div className="text-center text-emerald-400">
            <TrendingDown className="w-6 h-6 mx-auto mb-1" />
            <span className="font-bold text-sm">-19.8%</span>
          </div>

          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Quantum-Optimized</span>
            <span className="text-emerald-400 text-lg font-bold">10,000 t CO₂</span>
          </div>
        </div>
      </div>

      {/* CHARTS GRID (Section 14) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: CO2 by Vessel */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
          <h3 className="text-base font-bold text-white">CO₂ Emissions by Vessel</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.vessel_emissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="vessel_name" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                <Bar dataKey="co2_tons" fill="#3B82F6" radius={[6, 6, 0, 0]} name="CO₂ Emissions (tons)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CO2 by Fuel Type */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4">
          <h3 className="text-base font-bold text-white">CO₂ Emissions by Fuel Type</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.fuel_breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="fuel_type" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                <Bar dataKey="total_co2_tons" radius={[6, 6, 0, 0]} name="CO₂ Emissions (tons)">
                  {data.fuel_breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FUEL_COLORS[index % FUEL_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Historical Trend */}
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-4 lg:col-span-2">
          <h3 className="text-base font-bold text-white">Historical Voyage Emissions Reduction Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.historical_trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#2A3656', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="conventional_co2" stroke="#EF4444" strokeWidth={2} name="Conventional Strategy (t CO₂)" />
                <Line type="monotone" dataKey="optimized_co2" stroke="#10B981" strokeWidth={3} name="Quantum-Optimized (t CO₂)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
