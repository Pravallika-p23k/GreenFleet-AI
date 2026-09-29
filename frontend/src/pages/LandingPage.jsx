import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sliders, 
  Fuel, 
  Leaf, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  Zap,
  Globe,
  Cpu,
  Layers
} from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="text-center space-y-6 pt-8 pb-12 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
          <Zap className="w-3.5 h-3.5" />
          <span>SIH 2026 Innovation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          GREENFLEET <span className="text-emerald-400">AI</span>
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-slate-300 max-w-3xl mx-auto">
          Quantum-Inspired Green Fleet Optimization for Smarter, Cleaner Maritime Operations
        </p>

        <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          “Predict fuel consumption, optimize vessel operations, compare alternative fuels, and discover efficient voyage strategies that balance cost, emissions, and delivery requirements.”
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/optimizer"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-base flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
          >
            <Compass className="w-5 h-5" />
            <span>Start Optimization</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-base border border-navy-700 flex items-center gap-2 transition"
          >
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>Explore Platform</span>
          </Link>
        </div>

        <div className="pt-4 flex justify-center">
          <DemoBadge type="quantum" />
        </div>
      </section>

      {/* THREE MAJOR STATISTICS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-navy-800 hover:border-emerald-500/40 transition group">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Fuel className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Fuel Efficiency</h3>
          <p className="text-3xl font-extrabold text-emerald-400 mb-2 font-mono">18.4% Avg Fuel Saved</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hydrodynamic ML model predictions optimize vessel speed & engine load factors for maximum fuel conservation.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-navy-800 hover:border-emerald-500/40 transition group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Leaf className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">CO₂ Reduction</h3>
          <p className="text-3xl font-extrabold text-blue-400 mb-2 font-mono">2,470 Tons CO₂ Cut</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Alternative fuel evaluation (LNG, Methanol, Ammonia, Hydrogen) cuts greenhouse gases while enforcing IMO CII targets.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-navy-800 hover:border-emerald-500/40 transition group">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Cpu className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Smart Fleet Optimization</h3>
          <p className="text-3xl font-extrabold text-purple-400 mb-2 font-mono">&lt; 40ms Solution Time</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Quantum-Inspired Annealing explores multi-objective QUBO solution spaces on classical hardware infrastructure.
          </p>
        </div>
      </section>

      {/* CORE WORKFLOW DIAGRAM */}
      <section className="glass-panel p-8 rounded-2xl border border-navy-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">Core System Workflow</h2>
          <p className="text-sm text-slate-400">
            End-to-end intelligent pipeline from maritime inputs to explainable recommendations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center text-xs">
          {[
            { step: "1. USER INPUT", desc: "Vessel, Cargo, Route, Speed, Fuel", color: "border-slate-700" },
            { step: "2. DATA PROC", desc: "AIS, IMO & Hydrodynamics", color: "border-blue-500/30" },
            { step: "3. ML FUEL PRED", desc: "Gradient Boosting Regression", color: "border-emerald-500/30" },
            { step: "4. CO₂ / COST", desc: "Financial & Emission Factors", color: "border-amber-500/30" },
            { step: "5. QI OPTIMIZER", desc: "Transverse Field QUBO Solver", color: "border-purple-500/30" },
            { step: "6. SIMULATOR", desc: "Adaptive Decision Simulator", color: "border-emerald-500/50" },
            { step: "7. RECOMMENDATION", desc: "Explainable Pareto Plan", color: "border-emerald-400" }
          ].map((item, idx) => (
            <div key={idx} className={`p-3 rounded-xl bg-navy-900 border ${item.color} flex flex-col justify-between h-28`}>
              <span className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider">{item.step}</span>
              <p className="text-slate-300 text-[11px] font-medium leading-tight">{item.desc}</p>
              <div className="w-full h-1 bg-emerald-500/20 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(idx + 1) * 14}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRIMARY INNOVATION SPOTLIGHT */}
      <section className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-8 rounded-3xl border border-emerald-500/30 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Primary Innovation</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Adaptive Green Voyage Decision Simulator
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Interactively balance Cost Priority, Emission Priority, and Delivery Time Priority in real-time. Understand multi-objective trade-offs before locking in voyage commitments.
          </p>
          <div className="pt-2">
            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-sm transition"
            >
              <span>Try Decision Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-navy-950 p-6 rounded-2xl border border-navy-800 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-navy-800">
            <span>Priority Allocation</span>
            <span className="text-emerald-400 font-mono">Live Recalculation</span>
          </div>
          
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Cost Priority</span>
                <span className="text-emerald-400 font-mono">40%</span>
              </div>
              <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Emission Priority</span>
                <span className="text-emerald-400 font-mono">40%</span>
              </div>
              <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Delivery-Time Priority</span>
                <span className="text-emerald-400 font-mono">20%</span>
              </div>
              <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
