import React, { useEffect, useState } from "react";
import { Leaf, TrendingDown, Fuel, Ship, Award } from "lucide-react";
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
  Cell,
} from "recharts";
import { api } from "../services/api";
import DemoBadge from "../components/DemoBadge";

const FUEL_COLORS = [
  "#2DD4BF",
  "#38BDF8",
  "#14B8A6",
  "#5EEAD4",
  "#FBBF24",
  "#94A3B8",
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

export default function EmissionsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getEmissions()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("Emissions error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        style={{ backgroundColor: THEME.page }}
      >
        <div className="flex items-center gap-3 font-semibold text-[#2DD4BF]">
          <div className="w-6 h-6 border-2 border-[#2DD4BF] border-t-transparent rounded-full animate-spin" />
          <span>Loading Emissions Analytics...</span>
        </div>
      </div>
    );
  }

  const tooltipStyle = {
    backgroundColor: THEME.cardDark,
    border: `1px solid ${THEME.border}`,
    borderRadius: "10px",
    color: THEME.text,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  };

  const totalCo2 = data.total_co2_emissions_tons || 0;
  const reduction =
    data.conventional_vs_optimized?.calculated_reduction_percent || 0;
  const historicalTrend = data.historical_trend || [];
  const vesselEmissions = data.vessel_emissions || [];
  const fuelBreakdown = data.fuel_breakdown || [];

  return (
    <div
      className="min-h-screen space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
      style={{ backgroundColor: THEME.page }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0D9488 0%, #16445A 100%)",
            }}
          >
            <Leaf className="w-5 h-5 text-[#5EEAD4]" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Emissions Analytics
            </h1>
            <p className="text-sm text-[#8BA3B3] mt-1">
              Fleet carbon footprint, fuel mix, and optimization impact
              analysis.
            </p>
          </div>
        </div>

        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between text-[#8BA3B3]">
            <span className="text-xs font-medium">Total CO₂</span>
            <Fuel className="w-4 h-4 text-[#2DD4BF]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white font-mono">
            {totalCo2.toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}{" "}
            t
          </p>
          <span className="text-[11px] text-[#5EEAD4]">
            Annual fleet footprint
          </span>
        </div>

        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between text-[#8BA3B3]">
            <span className="text-xs font-medium">CO₂ per NM</span>
            <TrendingDown className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white font-mono">
            {Number(data.co2_per_nautical_mile || 0).toFixed(2)}
          </p>
          <span className="text-[11px] text-[#5EEAD4]">Lower is better</span>
        </div>

        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between text-[#8BA3B3]">
            <span className="text-xs font-medium">Reduction</span>
            <Leaf className="w-4 h-4 text-[#2DD4BF]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white font-mono">
            {reduction.toFixed(1)}%
          </p>
          <span className="text-[11px] text-[#5EEAD4]">
            vs conventional plan
          </span>
        </div>

        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="flex items-center justify-between text-[#8BA3B3]">
            <span className="text-xs font-medium">Trees Saved</span>
            <Award className="w-4 h-4 text-[#FBBF24]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white font-mono">
            {(
              data.conventional_vs_optimized?.annual_trees_saved_equivalent || 0
            ).toLocaleString()}
          </p>
          <span className="text-[11px] text-[#5EEAD4]">Equivalent impact</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          className="p-4 rounded-2xl"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <Ship className="w-5 h-5 text-[#2DD4BF]" />
            <h2 className="text-lg font-semibold text-white">Fuel mix share</h2>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                <XAxis dataKey="fuel_type" stroke={THEME.secondary} />

                <YAxis stroke={THEME.secondary} />

                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: THEME.text }}
                  itemStyle={{ color: THEME.aqua }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />

                <Bar dataKey="share_percent" radius={[8, 8, 0, 0]}>
                  {fuelBreakdown.map((entry, index) => (
                    <Cell
                      key={`${entry.fuel_type}-${index}`}
                      fill={FUEL_COLORS[index % FUEL_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="p-4 rounded-2xl"
          style={{
            backgroundColor: THEME.card,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-[#38BDF8]" />
            <h2 className="text-lg font-semibold text-white">
              Conventional vs optimized CO₂
            </h2>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={THEME.grid} />

                <XAxis dataKey="month" stroke={THEME.secondary} />

                <YAxis stroke={THEME.secondary} />

                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: THEME.text }}
                  itemStyle={{ color: THEME.aqua }}
                  formatter={(value) => [`${value} t`, "CO₂"]}
                />

                <Line
                  type="monotone"
                  dataKey="conventional_co2"
                  stroke="#FBBF24"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Conventional"
                />

                <Line
                  type="monotone"
                  dataKey="optimized_co2"
                  stroke="#2DD4BF"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Optimized"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="p-4 rounded-2xl"
        style={{
          backgroundColor: THEME.card,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <Ship className="w-5 h-5 text-[#2DD4BF]" />
          <h2 className="text-lg font-semibold text-white">
            Vessel emissions breakdown
          </h2>
        </div>

        <div className="space-y-3">
          {vesselEmissions.map((vessel, index) => {
            const maxCo2 = Math.max(
              ...vesselEmissions.map((item) => item.co2_tons || 0),
              1,
            );

            return (
              <div
                key={`${vessel.vessel_name}-${index}`}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: THEME.cardDark,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white">
                      {vessel.vessel_name}
                    </div>
                    <div className="text-xs text-[#8BA3B3]">
                      {vessel.vessel_type}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-[#2DD4BF]">
                      {Number(vessel.co2_tons || 0).toLocaleString(undefined, {
                        maximumFractionDigits: 1,
                      })}{" "}
                      t
                    </div>

                    <div className="text-xs text-[#8BA3B3]">
                      Intensity: {Number(vessel.co2_intensity || 0).toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 h-2 rounded-full overflow-hidden bg-[#163242]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        ((vessel.co2_tons || 0) / maxCo2) * 100,
                      )}%`,
                      background:
                        "linear-gradient(90deg, #2DD4BF 0%, #38BDF8 100%)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
