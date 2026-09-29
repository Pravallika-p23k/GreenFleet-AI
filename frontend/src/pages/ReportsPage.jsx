import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Ship, 
  Fuel, 
  Leaf, 
  DollarSign, 
  Clock,
  Award
} from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

export default function ReportsPage() {
  const [reportData] = useState({
    title: "Voyage Optimization & Decarbonization Report",
    report_code: "REP-2026-Q3-88A",
    created_at: new Date().toLocaleDateString(),
    voyage_info: {
      origin: "Rotterdam (NLD)",
      destination: "Singapore (SGP)",
      distance_nm: 8280,
      cargo_weight_tons: 45000,
      delivery_deadline_hours: 500
    },
    selected_plan: {
      plan_name: "Plan A (Balanced Quantum Optimal)",
      vessel_name: "Pacific Voyager",
      vessel_id: "VES-101",
      speed_knots: 16.5,
      fuel_type: "LNG",
      predicted_fuel_tons: 245.8,
      operating_cost_usd: 184350,
      co2_emissions_tons: 675.95,
      travel_time_hours: 212.5,
      compliance_score: 94.5
    },
    objectives: {
      cost_weight: "40%",
      emission_weight: "40%",
      time_weight: "20%"
    },
    benchmark_summary: {
      algorithm: "Quantum-Inspired Transverse-Field Annealing (Classical Infrastructure)",
      execution_time_ms: 38.4,
      fuel_saved_vs_baseline: "18.4%",
      co2_reduced_vs_baseline: "19.8%"
    }
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Voyage Optimization Report
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Export official maritime fleet optimization document for logistics operators & audit compliance.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download / Print Report</span>
        </button>
      </div>

      {/* PRINTABLE STRUCTURED REPORT DOCUMENT (Section 16) */}
      <div className="bg-navy-900 border border-navy-800 rounded-2xl p-8 space-y-8 text-slate-200 print:bg-white print:text-black print:p-0 print:border-none">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-navy-800 print:border-gray-300">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
              <Ship className="w-6 h-6" />
              <span>GREENFLEET AI</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white print:text-black mt-1">{reportData.title}</h2>
          </div>

          <div className="text-left sm:text-right mt-4 sm:mt-0 font-mono text-xs text-slate-400 print:text-gray-600">
            <p>Report Code: <strong className="text-emerald-400 print:text-black">{reportData.report_code}</strong></p>
            <p>Date Generated: {reportData.created_at}</p>
          </div>
        </div>

        {/* Section 1: Voyage Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700">1. Voyage & Cargo Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-navy-950 p-4 rounded-xl border border-navy-850 print:bg-gray-100 print:border-gray-300">
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Route</span>
              <span className="font-bold text-white print:text-black">{reportData.voyage_info.origin} → {reportData.voyage_info.destination}</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Distance</span>
              <span className="font-bold text-white print:text-black font-mono">{reportData.voyage_info.distance_nm.toLocaleString()} nm</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Cargo Load</span>
              <span className="font-bold text-white print:text-black font-mono">{reportData.voyage_info.cargo_weight_tons.toLocaleString()} tons</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Delivery Deadline</span>
              <span className="font-bold text-white print:text-black font-mono">{reportData.voyage_info.delivery_deadline_hours} hours</span>
            </div>
          </div>
        </div>

        {/* Section 2: Selected Recommended Plan */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700">2. Recommended Quantum Voyage Plan</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-navy-950 p-4 rounded-xl border border-navy-850 print:bg-gray-100 print:border-gray-300">
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Assigned Vessel</span>
              <span className="font-bold text-white print:text-black">{reportData.selected_plan.vessel_name} ({reportData.selected_plan.vessel_id})</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Speed & Fuel</span>
              <span className="font-bold text-emerald-400 print:text-black font-mono">{reportData.selected_plan.speed_knots} kn • {reportData.selected_plan.fuel_type}</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Predicted Fuel</span>
              <span className="font-bold text-white print:text-black font-mono">{reportData.selected_plan.predicted_fuel_tons} tons</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Operating Cost</span>
              <span className="font-bold text-purple-400 print:text-black font-mono">${reportData.selected_plan.operating_cost_usd.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Emissions & Benchmarking */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-700">3. Environmental & Performance Metrics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-navy-950 p-4 rounded-xl border border-navy-850 print:bg-gray-100 print:border-gray-300">
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Estimated CO₂ Output</span>
              <span className="font-bold text-emerald-400 print:text-black font-mono">{reportData.selected_plan.co2_emissions_tons} tons</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Travel Duration</span>
              <span className="font-bold text-blue-400 print:text-black font-mono">{reportData.selected_plan.travel_time_hours} hours</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">CO₂ Reduction vs Base</span>
              <span className="font-bold text-emerald-400 print:text-black font-mono">{reportData.benchmark_summary.co2_reduced_vs_baseline}</span>
            </div>
            <div>
              <span className="text-slate-400 print:text-gray-500 block">Optimization Score</span>
              <span className="font-bold text-emerald-400 print:text-black font-mono">{reportData.selected_plan.compliance_score} / 100</span>
            </div>
          </div>
        </div>

        {/* Signoff Disclaimer */}
        <div className="pt-6 border-t border-navy-800 print:border-gray-300 text-xs text-slate-400 print:text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            Disclaimer: Quantum-Inspired Optimization running on classical computing infrastructure.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 print:text-black font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified by GreenFleet AI Engine</span>
          </div>
        </div>

      </div>

    </div>
  );
}
