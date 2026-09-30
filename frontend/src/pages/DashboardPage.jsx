import React, { useEffect, useState } from "react";
import {
  Ship,
  Navigation,
  Fuel,
  Leaf,
  DollarSign,
  Cpu,
  TrendingUp,
  Activity,
} from "lucide-react";

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
  CartesianGrid,
} from "recharts";

import { api } from "../services/api";
import DemoBadge from "../components/DemoBadge";

// ============================================================
// GREENFLEET COLOR SYSTEM
// ============================================================

const COLORS = [
  "#2DD4BF", // Aqua Teal
  "#38BDF8", // Sky Blue
  "#14B8A6", // Teal
  "#5EEAD4", // Light Aqua
  "#FBBF24", // Amber
  "#94A3B8", // Slate
];

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

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDashboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading || !data) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        style={{ backgroundColor: THEME.page }}
      >
        <div className="flex items-center gap-3 font-semibold text-[#2DD4BF]">
          <div className="w-6 h-6 border-2 border-[#2DD4BF] border-t-transparent rounded-full animate-spin" />
          <span>Loading Fleet Dashboard Data...</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // TOOLTIP STYLE
  // ============================================================

  const tooltipStyle = {
    backgroundColor: THEME.cardDark,
    border: `1px solid ${THEME.border}`,
    borderRadius: "10px",
    color: THEME.text,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  };

  return (
    <div
      className="min-h-screen space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
      style={{ backgroundColor: THEME.page }}
    >
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0D9488 0%, #16445A 100%)",
              }}
            >
              <Ship className="w-5 h-5 text-[#5EEAD4]" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Fleet Operational Dashboard
              </h1>

              <p className="text-sm text-[#8BA3B3] mt-1">
                Real-time monitoring, AI fuel predictions, and quantum-inspired
                optimization status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SUMMARY CARDS
      ======================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* TOTAL VESSELS */}

        <div
          className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8BA3B3] font-medium">
              Total Vessels
            </span>

            <Ship className="w-4 h-4 text-[#2DD4BF]" />
          </div>

          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">
              {data.total_vessels}
            </p>

            <span className="text-[11px] text-[#5EEAD4]">100% Operational</span>
          </div>
        </div>

        {/* ACTIVE VOYAGES */}

        <div
          className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8BA3B3] font-medium">
              Active Voyages
            </span>

            <Navigation className="w-4 h-4 text-[#38BDF8]" />
          </div>

          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">
              {data.active_voyages}
            </p>

            <span className="text-[11px] text-[#38BDF8]">
              Underway in Transit
            </span>
          </div>
        </div>

        {/* PREDICTED FUEL */}

        <div
          className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8BA3B3] font-medium">
              Predicted Fuel
            </span>

            <Fuel className="w-4 h-4 text-[#FBBF24]" />
          </div>

          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">
              {data.predicted_fuel_consumption_tons.toLocaleString()}
              <span className="text-xs text-[#718A9A] ml-1">tons</span>
            </p>

            <span className="text-[11px] text-[#FBBF24]">
              Weekly Fleet Total
            </span>
          </div>
        </div>

        {/* CO2 */}

        <div
          className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8BA3B3] font-medium">
              Estimated CO₂
            </span>

            <Leaf className="w-4 h-4 text-[#5EEAD4]" />
          </div>

          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">
              {data.estimated_co2_tons.toLocaleString()}
              <span className="text-xs text-[#718A9A] ml-1">tons</span>
            </p>

            <span className="text-[11px] text-[#5EEAD4]">
              -19.8% vs Baseline
            </span>
          </div>
        </div>

        {/* OPERATING COST */}

        <div
          className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8BA3B3] font-medium">
              Operating Cost
            </span>

            <DollarSign className="w-4 h-4 text-[#2DD4BF]" />
          </div>

          <div className="mt-3">
            <p className="text-2xl font-bold text-white font-mono">
              ${(data.operating_cost_usd / 1e6).toFixed(2)}M
            </p>

            <span className="text-[11px] text-[#2DD4BF]">
              Bunker Fuel Expense
            </span>
          </div>
        </div>

        {/* OPTIMIZATION STATUS */}

        <div
          className="p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8BA3B3] font-medium">
              Opt Status
            </span>

            <Cpu className="w-4 h-4 text-[#2DD4BF] animate-pulse" />
          </div>

          <div className="mt-3">
            <p className="text-sm font-bold text-[#2DD4BF] leading-tight">
              QIA Active
            </p>

            <span className="text-[10px] text-[#718A9A] block mt-1">
              Transverse Field QUBO
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          CHART GRID
      ======================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ======================================================
            CHART 1 — FUEL CONSUMPTION
        ====================================================== */}

        <div
          className="p-6 rounded-2xl space-y-4"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Fuel Consumption Trend
              </h3>

              <p className="text-xs text-[#8BA3B3]">
                Predicted ML fuel tons vs. Actual vessel logs
              </p>
            </div>

            <TrendingUp className="w-5 h-5 text-[#2DD4BF]" />
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.fuel_trend}>
                <defs>
                  <linearGradient
                    id="colorPredicted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#0a9a87" stopOpacity={0.45} />

                    <stop offset="95%" stopColor="#0d8c7b" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />

                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                <XAxis dataKey="day" stroke="#718A9A" tick={{ fontSize: 12 }} />

                <YAxis stroke="#718A9A" tick={{ fontSize: 12 }} />

                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: THEME.text }}
                  itemStyle={{ color: THEME.aqua }}
                />

                <Area
                  type="monotone"
                  dataKey="predicted_fuel"
                  stroke="#36c6ae"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPredicted)"
                  name="ML Predicted Fuel (tons)"
                />

                <Area
                  type="monotone"
                  dataKey="actual_fuel"
                  stroke="#38BDF8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  name="Actual Consumed (tons)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ======================================================
            CHART 2 — CO2
        ====================================================== */}

        <div
          className="p-6 rounded-2xl space-y-4"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                CO₂ Emissions Trend
              </h3>

              <p className="text-xs text-[#8BA3B3]">
                Daily fleet GHG output in metric tons
              </p>
            </div>

            <Leaf className="w-5 h-5 text-[#2DD4BF]" />
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.co2_trend}>
                <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                <XAxis dataKey="day" stroke="#718A9A" tick={{ fontSize: 12 }} />

                <YAxis stroke="#718A9A" tick={{ fontSize: 12 }} />

                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: THEME.text }}
                  itemStyle={{ color: THEME.aqua }}
                />

                <Bar
                  dataKey="co2_emissions"
                  fill="#2DD4BF"
                  radius={[6, 6, 0, 0]}
                  name="CO₂ Emissions (tons)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ======================================================
            CHART 3 — VESSEL EFFICIENCY
        ====================================================== */}

        <div
          className="p-6 rounded-2xl space-y-4"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Vessel Efficiency Comparison
              </h3>

              <p className="text-xs text-[#8BA3B3]">
                CII compliance rating score (0 - 100)
              </p>
            </div>

            <Activity className="w-5 h-5 text-[#5EEAD4]" />
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.vessel_efficiency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                <XAxis type="number" domain={[0, 100]} stroke="#718A9A" />

                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#8BA3B3"
                  width={110}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: THEME.text }}
                  itemStyle={{ color: THEME.aqua }}
                />

                <Bar
                  dataKey="rating"
                  fill="#5EEAD4"
                  radius={[0, 6, 6, 0]}
                  name="Efficiency Rating Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ======================================================
            CHART 4 — FUEL TYPE
        ====================================================== */}

        <div
          className="p-6 rounded-2xl space-y-4"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Fuel-Type Fleet Share
              </h3>

              <p className="text-xs text-[#8BA3B3]">
                Alternative fuel breakdown across current fleet
              </p>
            </div>

            <Fuel className="w-5 h-5 text-[#FBBF24]" />
          </div>

          <div className="h-56 w-full flex items-center justify-center">
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
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.fuel_type_breakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: THEME.text }}
                  itemStyle={{ color: THEME.aqua }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
