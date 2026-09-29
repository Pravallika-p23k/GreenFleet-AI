import React from 'react';
import { Info, Cpu, CheckCircle } from 'lucide-react';

export default function DemoBadge({ isDemo = true, label = "Demo Data", type = "demo" }) {
  if (type === "quantum") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 shadow-sm">
        <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>Quantum-Inspired Optimization (Classical Compute)</span>
      </span>
    );
  }

  if (type === "ml") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-950 text-blue-300 border border-blue-500/30">
        <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
        <span>Trained ML Model Output</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
      isDemo 
        ? "bg-amber-950/70 text-amber-300 border border-amber-500/30" 
        : "bg-emerald-950/70 text-emerald-300 border border-emerald-500/30"
    }`}>
      <Info className="w-3.5 h-3.5" />
      <span>{label}</span>
    </span>
  );
}
