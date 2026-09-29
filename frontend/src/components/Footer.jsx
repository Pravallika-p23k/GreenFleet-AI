import React from 'react';
import { Ship, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-900 py-8 px-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-200 font-bold">
            <Ship className="w-4 h-4 text-emerald-400" />
            <span>GreenFleet AI</span>
            <span className="text-slate-500 font-normal">| Smart India Hackathon Platform</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            GreenFleet AI combines machine learning-based fuel prediction, quantum-inspired optimization and adaptive scenario simulation to help maritime operators make data-driven decisions that balance fuel consumption, operating cost, emissions and delivery requirements.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Quantum-Inspired Optimization running on classical computing infrastructure.</span>
          </div>
          <p>© 2026 GreenFleet AI Project. Built for SIH Hackathon.</p>
        </div>

      </div>
    </footer>
  );
}
