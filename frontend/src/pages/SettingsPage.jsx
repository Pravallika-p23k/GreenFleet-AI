import React, { useState } from "react";
import { Settings, Server, Cpu, Save, RefreshCw } from "lucide-react";
import DemoBadge from "../components/DemoBadge";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [config, setConfig] = useState({
    apiUrl: "http://localhost:8000/api",
    dbUrl: "sqlite:///./greenfleet.db",
    modelType: "GradientBoostingRegressor",
    quantumTunneling: 0.85,
    demoMode: true,
  });

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#06141F] text-white">
      <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/15 border border-[#0D9488]/30 flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#2DD4BF]" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  System & Model Settings
                </h1>

                <p className="text-sm text-[#8BA3B3] mt-1">
                  Configure backend connections, database settings, and
                  optimization parameters.
                </p>
              </div>
            </div>
          </div>

          <DemoBadge type="quantum" />
        </div>

        {/* ========================================================= */}
        {/* SETTINGS FORM */}
        {/* ========================================================= */}

        <form
          onSubmit={handleSave}
          className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] shadow-xl space-y-7"
        >
          {/* ======================================================= */}
          {/* API & CONNECTION */}
          {/* ======================================================= */}

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-3 border-b border-[#16445A] pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center">
                <Server className="w-4 h-4 text-[#38BDF8]" />
              </div>

              <span>API & Connection Configuration</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* FastAPI URL */}

              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5">
                  FastAPI Service URL
                </label>

                <input
                  type="text"
                  value={config.apiUrl}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      apiUrl: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                />
              </div>

              {/* Database */}

              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5">
                  Database Connection String
                </label>

                <input
                  type="text"
                  value={config.dbUrl}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dbUrl: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* ML & QUANTUM SETTINGS */}
          {/* ======================================================= */}

          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold text-white flex items-center gap-3 border-b border-[#16445A] pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/10 border border-[#A78BFA]/20 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#A78BFA]" />
              </div>

              <span>ML & Quantum-Inspired Optimization Settings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* ML MODEL */}

              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5">
                  Hydrodynamics ML Model
                </label>

                <select
                  value={config.modelType}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      modelType: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                >
                  <option value="GradientBoostingRegressor">
                    Gradient Boosting Regressor (Recommended)
                  </option>

                  <option value="RandomForestRegressor">
                    Random Forest Regressor
                  </option>

                  <option value="XGBoost">XGBoost Regressor</option>
                </select>
              </div>

              {/* QUANTUM TUNNELING */}

              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5">
                  Quantum Tunneling Factor (Γ(t))
                </label>

                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.quantumTunneling}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      quantumTunneling: Number(e.target.value),
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-[#2DD4BF] font-bold font-mono focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                />

                <p className="text-[10px] text-[#718A9A] mt-1.5">
                  Controls the exploration strength of the quantum-inspired
                  optimization process.
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* SYSTEM STATUS */}
          {/* ======================================================= */}

          <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/40" />

                <span className="text-xs font-semibold text-[#B7C8D3]">
                  System Configuration
                </span>
              </div>

              <span className="text-[10px] text-[#718A9A] font-mono">
                GREENFLEET AI
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
              <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                <span className="text-[#718A9A] block mb-1">API</span>

                <span className="text-[#2DD4BF] font-semibold">Configured</span>
              </div>

              <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                <span className="text-[#718A9A] block mb-1">Database</span>

                <span className="text-[#2DD4BF] font-semibold">SQLite</span>
              </div>

              <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                <span className="text-[#718A9A] block mb-1">Mode</span>

                <span className="text-[#FBBF24] font-semibold">
                  {config.demoMode ? "Demo" : "Production"}
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* SAVE */}
          {/* ======================================================= */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#16445A]">
            <div className="text-xs">
              {saved ? (
                <span className="text-[#2DD4BF] font-bold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center">
                    ✓
                  </span>
                  Settings saved successfully!
                </span>
              ) : (
                <span className="text-[#718A9A]">
                  Changes apply immediately.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setConfig({
                    apiUrl: "http://localhost:8000/api",
                    dbUrl: "sqlite:///./greenfleet.db",
                    modelType: "GradientBoostingRegressor",
                    quantumTunneling: 0.85,
                    demoMode: true,
                  })
                }
                className="px-5 py-2.5 bg-[#071923] hover:bg-[#102A3A] text-[#B7C8D3] font-semibold rounded-xl text-sm border border-[#16445A] transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />

                <span>Reset</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] font-bold rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-[#0D9488]/20"
              >
                <Save className="w-4 h-4" />

                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
