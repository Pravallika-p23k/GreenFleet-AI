import React, { useState } from 'react';
import { Settings, Server, Database, Cpu, Save, RefreshCw } from 'lucide-react';
import DemoBadge from '../components/DemoBadge';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    apiUrl: 'http://localhost:8000/api',
    dbUrl: 'sqlite:///./greenfleet.db',
    modelType: 'GradientBoostingRegressor',
    quantumTunneling: 0.85,
    demoMode: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            System & Model Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure backend connection endpoints, database settings, and optimization hyper-parameters.
          </p>
        </div>

        <DemoBadge type="quantum" />
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl border border-navy-800 space-y-6">
        
        {/* Backend API Config */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>API & Connection Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">FastAPI Service URL</label>
              <input
                type="text"
                value={config.apiUrl}
                onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Database Connection String</label>
              <input
                type="text"
                value={config.dbUrl}
                onChange={(e) => setConfig({ ...config, dbUrl: e.target.value })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ML & Optimization Config */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>ML & Quantum-Inspired Optimization Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Hydrodynamics ML Model</label>
              <select
                value={config.modelType}
                onChange={(e) => setConfig({ ...config, modelType: e.target.value })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="GradientBoostingRegressor">Gradient Boosting Regressor (Recommended)</option>
                <option value="RandomForestRegressor">Random Forest Regressor</option>
                <option value="XGBoost">XGBoost Regressor</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Quantum Tunneling Factor (\(\Gamma(t)\))</label>
              <input
                type="number"
                step="0.05"
                value={config.quantumTunneling}
                onChange={(e) => setConfig({ ...config, quantumTunneling: Number(e.target.value) })}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg p-2.5 text-emerald-400 font-bold font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-4 border-t border-navy-800">
          <span className="text-xs text-slate-400">
            {saved ? <span className="text-emerald-400 font-bold">✓ Settings saved successfully!</span> : "Changes apply immediately."}
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-xl text-sm transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
}
