import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Cpu,
  Zap,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { api } from "../services/api";
import DemoBadge from "../components/DemoBadge";

const THEME = {
  page: "#06141F",
  card: "#0A1C29",
  cardDark: "#071923",
  border: "#16445A",
  grid: "#163242",
  text: "#F8FAFC",
  secondary: "#8BA3B3",
  muted: "#718A9A",
  teal: "#2DD4BF",
  aqua: "#5EEAD4",
  blue: "#38BDF8",
  amber: "#FBBF24",
};

export default function BenchmarkingPage() {
  const [benchmark, setBenchmark] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBenchmark()
      .then((res) => {
        setBenchmark(res);
      })
      .catch((err) => {
        console.error("Benchmark error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !benchmark) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundColor: THEME.page,
          backgroundImage: `
            linear-gradient(
              rgba(6, 20, 31, 0.88),
              rgba(6, 20, 31, 0.94)
            ),
            url('C:\Users\SUSMITHA\GreenFleet-AI\frontend\public\images\backgroundimage.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center relative z-10">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[#123449] border-t-[#2DD4BF] animate-spin" />
          <p className="text-[#5EEAD4] font-semibold">
            Running Optimization Benchmark Suite...
          </p>
          <p className="text-[#7F9AAA] text-xs mt-2">
            Comparing classical and quantum-inspired approaches
          </p>
        </div>
      </div>
    );
  }

  const conv = benchmark.conventional_summary || {};
  const qi = benchmark.quantum_inspired_summary || {};
  const comparison = benchmark.comparison_chart || [];
  const series = benchmark.convergence_series || [];

  const tooltipStyle = {
    backgroundColor: THEME.cardDark,
    border: `1px solid ${THEME.border}`,
    borderRadius: "10px",
    color: THEME.text,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundColor: THEME.page,
        backgroundImage: `
          linear-gradient(
            rgba(6, 20, 31, 0.90),
            rgba(6, 20, 31, 0.94)
          ),
          url('/images/a_wide_cinematic_futuristic_maritime_technology.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2DD4BF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl" />
      </div>

      {/* Page content */}
      <div className="relative z-10 space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#0B2738]/90 border border-[#16445A] flex items-center justify-center backdrop-blur-sm">
                <BarChart3 className="w-5 h-5 text-[#2DD4BF]" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#5EEAD4] font-semibold">
                  GreenFleet AI
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Optimization Benchmarking
                </h1>
              </div>
            </div>

            <p className="text-sm text-[#8BA3B3] mt-2">
              Empirical comparison of conventional optimization and
              quantum-inspired optimization for sustainable fleet planning.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A2528]/90 border border-[#155E63] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />

            <span className="text-xs font-semibold text-[#5EEAD4]">
              Benchmark Ready
            </span>
          </div>
        </div>

        {/* Solver comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conventional */}
          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-6 rounded-2xl border border-[#17384A] space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#17384A] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#122838] border border-[#24475A] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#8BA3B3]" />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#718A9A]">
                    Baseline Solver
                  </span>

                  <h3 className="text-lg font-bold text-white">
                    {conv.algorithm_name || "Conventional MILP / Heuristic"}
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#122838] text-[#B8C8D1] border border-[#24475A]">
                Score: {conv.solution_quality_score || 0}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">
                  Objective Energy
                </span>

                <span className="text-base font-bold text-white font-mono">
                  {conv.objective_val || 0}
                </span>
              </div>

              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">
                  Execution Time
                </span>

                <span className="text-base font-bold text-white font-mono">
                  {conv.execution_time_ms || 0} ms
                </span>
              </div>

              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">Iterations</span>

                <span className="text-base font-bold text-white font-mono">
                  {conv.convergence_iterations || 0} iter
                </span>
              </div>

              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">Scalability</span>

                <span className="text-base font-bold text-white font-mono">
                  {conv.scalability_score || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Quantum Inspired */}
          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-6 rounded-2xl border border-[#17384A] space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#17384A] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#102D2E] border border-[#1A4A4F] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#5EEAD4]" />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5EEAD4]">
                    Quantum Inspired
                  </span>

                  <h3 className="text-lg font-bold text-white">
                    {qi.algorithm_name || "Quantum-Inspired Annealing"}
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#102D2E] text-[#A7F3D0] border border-[#1A4A4F]">
                Score: {qi.solution_quality_score || 0}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">
                  Objective Energy
                </span>

                <span className="text-base font-bold text-white font-mono">
                  {qi.objective_val || 0}
                </span>
              </div>

              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">
                  Execution Time
                </span>

                <span className="text-base font-bold text-white font-mono">
                  {qi.execution_time_ms || 0} ms
                </span>
              </div>

              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">Iterations</span>

                <span className="text-base font-bold text-white font-mono">
                  {qi.convergence_iterations || 0} iter
                </span>
              </div>

              <div className="bg-[#071923]/95 p-4 rounded-xl border border-[#17384A]">
                <span className="text-[#718A9A] block mb-1">Scalability</span>

                <span className="text-base font-bold text-white font-mono">
                  {qi.scalability_score || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-4 rounded-2xl border border-[#17384A]">
            <div className="mb-4 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#2DD4BF]" />

              <h2 className="text-lg font-semibold text-white">
                Metric comparison
              </h2>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                  <XAxis dataKey="metric" stroke={THEME.secondary} />

                  <YAxis stroke={THEME.secondary} />

                  <Tooltip contentStyle={tooltipStyle} />

                  <Line
                    type="monotone"
                    dataKey="Conventional"
                    stroke="#FBBF24"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="Quantum_Inspired"
                    stroke="#2DD4BF"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-4 rounded-2xl border border-[#17384A]">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#38BDF8]" />

              <h2 className="text-lg font-semibold text-white">
                Convergence trend
              </h2>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                  <XAxis dataKey="iteration" stroke={THEME.secondary} />

                  <YAxis stroke={THEME.secondary} />

                  <Tooltip contentStyle={tooltipStyle} />

                  <Line
                    type="monotone"
                    dataKey="Conventional_Objective"
                    stroke="#FBBF24"
                    strokeWidth={3}
                  />

                  <Line
                    type="monotone"
                    dataKey="Quantum_Inspired_Objective"
                    stroke="#2DD4BF"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-4 rounded-2xl border border-[#17384A]">
            <div className="flex items-center gap-2 text-[#5EEAD4] mb-2">
              <CheckCircle2 className="w-4 h-4" />

              <span className="text-sm font-medium">Quality Gain</span>
            </div>

            <p className="text-2xl font-bold text-white font-mono">
              {(qi.solution_quality_score || 0) -
                (conv.solution_quality_score || 0)}{" "}
              pts
            </p>
          </div>

          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-4 rounded-2xl border border-[#17384A]">
            <div className="flex items-center gap-2 text-[#FBBF24] mb-2">
              <AlertCircle className="w-4 h-4" />

              <span className="text-sm font-medium">Runtime Delta</span>
            </div>

            <p className="text-2xl font-bold text-white font-mono">
              {(conv.execution_time_ms || 0) - (qi.execution_time_ms || 0)} ms
            </p>
          </div>

          <div className="bg-[#0A1C29]/95 backdrop-blur-md p-4 rounded-2xl border border-[#17384A]">
            <div className="flex items-center gap-2 text-[#38BDF8] mb-2">
              <Award className="w-4 h-4" />

              <span className="text-sm font-medium">Scalability</span>
            </div>

            <p className="text-2xl font-bold text-white font-mono">
              {qi.scalability_score || 0}%
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <DemoBadge />
        </div>
      </div>
    </div>
  );
}
