import React, { useState } from "react";
import {
  Compass,
  Cpu,
  Fuel,
  Sliders,
  Award,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import { api } from "../services/api";
import DemoBadge from "../components/DemoBadge";
import ExplainableRecommendation from "../components/ExplainableRecommendation";

export default function VoyageOptimizerPage() {
  const [formData, setFormData] = useState({
    origin: "Rotterdam (NLD)",
    destination: "Singapore (SGP)",
    distance_nm: 8280,
    cargo_weight_tons: 45000,
    delivery_deadline_hours: 500,
    vessel_ids: ["VES-101", "VES-102", "VES-103", "VES-104", "VES-105"],
    fuel_options: ["HFO", "MGO", "LNG", "Methanol", "Ammonia", "Hydrogen"],
    min_speed_knots: 10,
    max_speed_knots: 22,
    cost_priority: 40,
    emission_priority: 40,
    time_priority: 20,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toggleVessel = (id) => {
    const ids = formData.vessel_ids.includes(id)
      ? formData.vessel_ids.filter((v) => v !== id)
      : [...formData.vessel_ids, id];

    setFormData({
      ...formData,
      vessel_ids: ids,
    });
  };

  const toggleFuel = (fuel) => {
    const fuels = formData.fuel_options.includes(fuel)
      ? formData.fuel_options.filter((x) => x !== fuel)
      : [...formData.fuel_options, fuel];

    setFormData({
      ...formData,
      fuel_options: fuels,
    });
  };

  const handleOptimize = (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    api
      .optimizeVoyage(formData)
      .then((res) => {
        setTimeout(() => {
          setResult(res);
          setLoading(false);
        }, 1200);
      })
      .catch((err) => {
        console.error("Optimization error:", err);
        setLoading(false);
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/25 text-[#5EEAD4] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />

              <span>Quantum-Inspired Optimization</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>Voyage Fleet Optimizer</span>
            </h1>

            <p className="text-sm text-[#8BA3B3] mt-1 max-w-3xl">
              Evaluate vessel speed, fuel type, operating cost, emissions, and
              delivery priorities using a quantum-inspired multi-objective
              optimization workflow.
            </p>
          </div>

          
        </div>

        {/* ========================================================= */}
        {/* MAIN GRID */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ======================================================= */}
          {/* INPUT PANEL */}
          {/* ======================================================= */}

          <div className="lg:col-span-5">
            <div className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] shadow-xl space-y-6">
              {/* PANEL HEADER */}

              <div className="flex items-center justify-between border-b border-[#16445A] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-[#2DD4BF]" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Voyage & Fleet Inputs
                    </h2>

                    <p className="text-[10px] text-[#718A9A] mt-0.5">
                      Configure optimization variables
                    </p>
                  </div>
                </div>

                <span className="px-2 py-1 rounded-md bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] text-[10px] font-mono font-bold">
                  QUBO SETUP
                </span>
              </div>

              <form onSubmit={handleOptimize} className="space-y-5 text-xs">
                {/* ================================================= */}
                {/* ROUTE */}
                {/* ================================================= */}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />

                    <span className="text-sm font-bold text-white">
                      Voyage Route
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#B7C8D3] font-medium mb-1.5">
                        Origin Port
                      </label>

                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            origin: e.target.value,
                          })
                        }
                        className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[#B7C8D3] font-medium mb-1.5">
                        Destination Port
                      </label>

                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            destination: e.target.value,
                          })
                        }
                        className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* ================================================= */}
                {/* VOYAGE NUMBERS */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Distance (nm)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={formData.distance_nm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          distance_nm: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Cargo (tons)
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={formData.cargo_weight_tons}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cargo_weight_tons: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B7C8D3] font-medium mb-1.5">
                      Deadline (hrs)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={formData.delivery_deadline_hours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          delivery_deadline_hours: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-[#2DD4BF] font-bold font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* ================================================= */}
                {/* FUEL OPTIONS */}
                {/* ================================================= */}

                <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Fuel className="w-4 h-4 text-[#FBBF24]" />

                    <div>
                      <label className="block text-[#D9E6EC] font-bold">
                        Candidate Fuel Options
                      </label>

                      <span className="text-[10px] text-[#718A9A]">
                        Select fuels available for optimization
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      "HFO",
                      "MGO",
                      "LNG",
                      "Methanol",
                      "Ammonia",
                      "Hydrogen",
                    ].map((fuel) => {
                      const selected = formData.fuel_options.includes(fuel);

                      return (
                        <button
                          key={fuel}
                          type="button"
                          onClick={() => toggleFuel(fuel)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                            selected
                              ? "bg-[#2DD4BF]/15 border-[#2DD4BF]/50 text-[#5EEAD4] font-bold"
                              : "bg-[#06141F] border-[#16445A] text-[#718A9A] hover:text-[#B7C8D3] hover:border-[#2D6078]"
                          }`}
                        >
                          {selected && <span className="mr-1">✓</span>}

                          {fuel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ================================================= */}
                {/* VESSEL SELECTION */}
                {/* ================================================= */}

                <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[#D9E6EC] font-bold block">
                        Candidate Vessels
                      </span>

                      <span className="text-[10px] text-[#718A9A]">
                        Select vessels available for deployment
                      </span>
                    </div>

                    <span className="text-[10px] text-[#38BDF8] font-mono font-bold">
                      {formData.vessel_ids.length} SELECTED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "VES-101",
                      "VES-102",
                      "VES-103",
                      "VES-104",
                      "VES-105",
                    ].map((id) => {
                      const selected = formData.vessel_ids.includes(id);

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleVessel(id)}
                          className={`p-2.5 rounded-lg border text-left transition ${
                            selected
                              ? "bg-[#38BDF8]/10 border-[#38BDF8]/40"
                              : "bg-[#06141F] border-[#16445A] hover:border-[#2D6078]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-mono text-xs font-bold ${
                                selected ? "text-[#38BDF8]" : "text-[#718A9A]"
                              }`}
                            >
                              {id}
                            </span>

                            {selected && (
                              <span className="text-[#2DD4BF] text-xs">✓</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ================================================= */}
                {/* SPEED */}
                {/* ================================================= */}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-4 h-4 text-[#A78BFA]" />

                    <span className="text-sm font-bold text-white">
                      Speed Operating Range
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#B7C8D3] font-medium mb-1.5">
                        Minimum Speed (knots)
                      </label>

                      <input
                        type="number"
                        min="1"
                        max="40"
                        step="0.5"
                        value={formData.min_speed_knots}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            min_speed_knots: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[#B7C8D3] font-medium mb-1.5">
                        Maximum Speed (knots)
                      </label>

                      <input
                        type="number"
                        min="1"
                        max="40"
                        step="0.5"
                        value={formData.max_speed_knots}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            max_speed_knots: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* ================================================= */}
                {/* OBJECTIVE WEIGHTS */}
                {/* ================================================= */}

                <div className="space-y-4 pt-4 border-t border-[#16445A]">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#2DD4BF]" />

                    <div>
                      <span className="text-[#D9E6EC] font-bold block">
                        Optimization Objective Weights
                      </span>

                      <span className="text-[10px] text-[#718A9A]">
                        Adjust the importance of each objective.
                      </span>
                    </div>
                  </div>

                  {/* COST */}

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#B7C8D3]">Cost Priority</span>

                      <span className="text-[#2DD4BF] font-mono font-bold">
                        {formData.cost_priority}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.cost_priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cost_priority: Number(e.target.value),
                        })
                      }
                      className="w-full accent-[#2DD4BF]"
                    />
                  </div>

                  {/* EMISSION */}

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#B7C8D3]">Emission Priority</span>

                      <span className="text-[#38BDF8] font-mono font-bold">
                        {formData.emission_priority}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.emission_priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emission_priority: Number(e.target.value),
                        })
                      }
                      className="w-full accent-[#38BDF8]"
                    />
                  </div>

                  {/* TIME */}

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#B7C8D3]">
                        Delivery-Time Priority
                      </span>

                      <span className="text-[#FBBF24] font-mono font-bold">
                        {formData.time_priority}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.time_priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          time_priority: Number(e.target.value),
                        })
                      }
                      className="w-full accent-[#FBBF24]"
                    />
                  </div>
                </div>

                {/* ================================================= */}
                {/* OPTIMIZE BUTTON */}
                {/* ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0D9488] hover:bg-[#2DD4BF] disabled:opacity-60 disabled:cursor-not-allowed text-[#06141F] font-bold rounded-xl text-sm transition shadow-lg shadow-[#0D9488]/20 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#06141F] border-t-transparent rounded-full animate-spin" />

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
          </div>

          {/* ======================================================= */}
          {/* RESULTS PANEL */}
          {/* ======================================================= */}

          <div className="lg:col-span-7 space-y-6">
            {loading ? (
              <div className="bg-[#0A1C29] p-16 rounded-2xl border border-[#16445A] text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center mx-auto">
                  <Cpu className="w-8 h-8 text-[#2DD4BF] animate-spin" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Generating Candidate Fleet Configurations
                  </h3>

                  <p className="text-xs text-[#8BA3B3] max-w-md mx-auto mt-2 leading-relaxed">
                    Evaluating speed, fuel, vessel selection, operating cost,
                    emissions, and delivery constraints using the configured
                    optimization workflow.
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  <span className="px-2 py-1 rounded-md bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[10px] text-[#5EEAD4] font-mono">
                    SEARCH
                  </span>

                  <span className="px-2 py-1 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[10px] text-[#38BDF8] font-mono">
                    EVALUATE
                  </span>

                  <span className="px-2 py-1 rounded-md bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[10px] text-[#A78BFA] font-mono">
                    COMPARE
                  </span>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* ================================================= */}
                {/* HEADER BANNER */}
                {/* ================================================= */}

                <div className="bg-[#0A1C29] border border-[#2DD4BF]/30 p-5 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#5EEAD4] flex items-center gap-2">
                        <Award className="w-4 h-4" />

                        <span>
                          Recommended Plan According to Selected Objectives
                        </span>
                      </h3>

                      <p className="text-xs text-[#8BA3B3] mt-2 font-mono">
                        Execution Time:
                        <span className="text-[#D9E6EC] ml-1">
                          {result.execution_time_ms} ms
                        </span>
                        <span className="mx-2 text-[#16445A]">|</span>
                        Algorithm:
                        <span className="text-[#D9E6EC] ml-1">
                          {result.algorithm}
                        </span>
                      </p>
                    </div>

                    <DemoBadge type="quantum" />
                  </div>
                </div>

                {/* ================================================= */}
                {/* CANDIDATE PLANS */}
                {/* ================================================= */}

                <div className="space-y-4">
                  {result.candidate_plans.map((plan) => (
                    <div
                      key={plan.plan_id}
                      className={`p-5 rounded-2xl border transition ${
                        plan.is_recommended
                          ? "bg-[#0A1C29] border-[#2DD4BF]/60 shadow-lg shadow-[#2DD4BF]/5"
                          : "bg-[#0A1C29] border-[#16445A] hover:border-[#2D6078]"
                      }`}
                    >
                      {/* PLAN HEADER */}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#16445A]">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                              plan.is_recommended
                                ? "bg-[#2DD4BF] text-[#06141F]"
                                : "bg-[#071923] text-[#8BA3B3] border border-[#16445A]"
                            }`}
                          >
                            {plan.plan_id}
                          </span>

                          <div>
                            <h4 className="text-base font-bold text-white">
                              {plan.plan_name}
                            </h4>

                            <p className="text-xs text-[#8BA3B3] mt-0.5">
                              {plan.vessel_name}
                              <span className="text-[#718A9A] mx-1">•</span>
                              {plan.vessel_id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {plan.is_recommended && (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#2DD4BF]/10 text-[#5EEAD4] border border-[#2DD4BF]/30 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                              Recommended Strategy
                            </span>
                          )}

                          <span className="text-lg font-extrabold text-[#2DD4BF] font-mono">
                            {plan.score}/100
                          </span>
                        </div>
                      </div>

                      {/* ================================================= */}
                      {/* METRICS */}
                      {/* ================================================= */}

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
                        <div className="bg-[#071923] p-3 rounded-lg border border-[#16445A]">
                          <div className="flex items-center gap-1.5 text-[#718A9A] text-[10px] mb-1">
                            <Sliders className="w-3 h-3 text-[#2DD4BF]" />

                            <span>Speed & Fuel</span>
                          </div>

                          <span className="font-bold text-white font-mono">
                            {plan.speed_knots} kn
                            <span className="text-[#718A9A] mx-1">•</span>
                            {plan.fuel_type}
                          </span>
                        </div>

                        <div className="bg-[#071923] p-3 rounded-lg border border-[#16445A]">
                          <div className="flex items-center gap-1.5 text-[#718A9A] text-[10px] mb-1">
                            <span className="text-[#A78BFA]">$</span>

                            <span>Operating Cost</span>
                          </div>

                          <span className="font-bold text-[#A78BFA] font-mono">
                            $
                            {Number(
                              plan.operating_cost_usd || 0,
                            ).toLocaleString()}
                          </span>
                        </div>

                        <div className="bg-[#071923] p-3 rounded-lg border border-[#16445A]">
                          <div className="flex items-center gap-1.5 text-[#718A9A] text-[10px] mb-1">
                            <span className="text-[#2DD4BF]">CO₂</span>

                            <span>Emissions</span>
                          </div>

                          <span className="font-bold text-[#2DD4BF] font-mono">
                            {Number(
                              plan.co2_emissions_tons || 0,
                            ).toLocaleString()}
                            <span className="text-[#718A9A] ml-1">t</span>
                          </span>
                        </div>

                        <div className="bg-[#071923] p-3 rounded-lg border border-[#16445A]">
                          <div className="flex items-center gap-1.5 text-[#718A9A] text-[10px] mb-1">
                            <span className="text-[#38BDF8]">TIME</span>

                            <span>Travel Time</span>
                          </div>

                          <span className="font-bold text-[#38BDF8] font-mono">
                            {plan.travel_time_hours}
                            <span className="text-[#718A9A] ml-1">hrs</span>
                          </span>
                        </div>
                      </div>

                      {/* ================================================= */}
                      {/* EXPLAINABILITY */}
                      {/* ================================================= */}

                      <div className="border-t border-[#16445A] pt-4">
                        <ExplainableRecommendation
                          explanations={plan.explanations}
                          planName={plan.plan_name}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================================================= */}
                {/* OPTIMIZATION SUMMARY */}
                {/* ================================================= */}

                <div className="bg-[#071923] border border-[#16445A] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-[#38BDF8]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Optimization Summary
                      </h3>

                      <p className="text-[10px] text-[#718A9A]">
                        Parameters used for the current optimization run.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Route
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold">
                        {formData.origin}
                      </span>

                      <ArrowRight className="w-3 h-3 text-[#38BDF8] inline mx-1" />

                      <span className="text-xs text-[#D9E6EC] font-semibold">
                        {formData.destination}
                      </span>
                    </div>

                    <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Cargo
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold font-mono">
                        {Number(
                          formData.cargo_weight_tons || 0,
                        ).toLocaleString()}
                        <span className="text-[#718A9A] ml-1">tons</span>
                      </span>
                    </div>

                    <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Speed Range
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold font-mono">
                        {formData.min_speed_knots}
                        {" – "}
                        {formData.max_speed_knots}
                        <span className="text-[#718A9A] ml-1">kn</span>
                      </span>
                    </div>

                    <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                      <span className="text-[10px] text-[#718A9A] block mb-1">
                        Selected Fuels
                      </span>

                      <span className="text-xs text-[#D9E6EC] font-semibold">
                        {formData.fuel_options.length}
                        <span className="text-[#718A9A] ml-1">options</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A1C29] p-16 rounded-2xl border border-[#16445A] text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center mx-auto">
                  <Compass className="w-8 h-8 text-[#2DD4BF]" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Quantum Optimization Ready
                  </h3>

                  <p className="text-xs text-[#8BA3B3] max-w-md mx-auto mt-2 leading-relaxed">
                    Configure your voyage parameters, candidate vessels, fuel
                    options, and objective weights on the left, then run the
                    optimization to compare candidate fleet plans.
                  </p>
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[10px] text-[#5EEAD4] font-mono">
                    VESSEL
                  </span>

                  <span className="px-2.5 py-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[10px] text-[#FBBF24] font-mono">
                    FUEL
                  </span>

                  <span className="px-2.5 py-1 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[10px] text-[#38BDF8] font-mono">
                    SPEED
                  </span>

                  <span className="px-2.5 py-1 rounded-md bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[10px] text-[#A78BFA] font-mono">
                    OBJECTIVES
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
