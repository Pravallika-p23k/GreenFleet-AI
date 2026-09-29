import React from "react";
import { Link } from "react-router-dom";
import { Ship, Cpu, Menu, X } from "lucide-react";
import DemoBadge from "./DemoBadge";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-navy-900/90 backdrop-blur-md border-b border-navy-800 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400 transition">
              <Ship className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                GREENFLEET <span className="text-emerald-400">AI</span>
              </span>

              <span className="text-[10px] text-slate-400 block -mt-1 font-mono uppercase tracking-wider">
                Quantum-Inspired Maritime Optimization
              </span>
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}
