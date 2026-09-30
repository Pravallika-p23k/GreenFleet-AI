import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ship,
  Fuel,
  Compass,
  Sliders,
  Leaf,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Fleet Management", path: "/fleet", icon: Ship },
    { name: "Fuel Prediction", path: "/predict", icon: Fuel },
    { name: "Voyage Optimizer", path: "/optimizer", icon: Compass },
    { name: "Scenario Simulator", path: "/simulator", icon: Sliders },
    { name: "Emissions Analysis", path: "/emissions", icon: Leaf },
    { name: "Benchmarking", path: "/benchmarking", icon: BarChart3 },
    { name: "Report Generator", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 lg:top-0
          left-0
          z-40 lg:z-20
          w-64
          h-screen lg:h-[calc(100vh-0px)]
          bg-navy-900
          border-r border-navy-800
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col justify-between
          p-4
          overflow-y-auto
          shrink-0
        `}
      >
        <div className="space-y-6">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Navigation Menu
            </h3>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-lg
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "text-slate-300 hover:bg-navy-800 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`
                        px-2 py-0.5 text-[10px] font-semibold
                        rounded-full uppercase tracking-wider
                        ${
                          item.badge === "Innovation"
                            ? "bg-emerald-500 text-navy-950 font-bold"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer info card */}
        <div className="mt-8 p-3.5 rounded-xl bg-navy-950 border border-navy-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AQUA SETU v1.0</span>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            Quantum-Inspired Green Fleet Optimization platform for maritime
            operators.
          </p>
        </div>
      </aside>
    </>
  );
}
