import React, { useEffect, useState } from 'react';
import { 
  Ship, 
  Search, 
  Filter, 
  Gauge, 
  Zap, 
  Fuel, 
  Eye, 
  X,
  Building,
  Flag,
  Calendar
} from 'lucide-react';
import { api } from '../services/api';
import DemoBadge from '../components/DemoBadge';

export default function FleetPage() {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [selectedVessel, setSelectedVessel] = useState(null);

  useEffect(() => {
    loadVessels();
  }, [typeFilter, fuelFilter]);

  const loadVessels = () => {
    setLoading(true);
    api.getVessels({ vessel_type: typeFilter, fuel_type: fuelFilter })
      .then(res => {
        setVessels(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load vessels:", err);
        setLoading(false);
      });
  };

  const filteredVessels = vessels.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.vessel_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Fleet Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            View active maritime vessel profiles, engine specifications, and fuel efficiencies.
          </p>
        </div>

        
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="glass-panel p-4 rounded-xl border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search vessel name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-navy-950 border border-navy-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filters:</span>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Vessel Types</option>
            <option value="Container Ship">Container Ship</option>
            <option value="Bulk Carrier">Bulk Carrier</option>
            <option value="Oil Tanker">Oil Tanker</option>
            <option value="Ro-Ro Vessel">Ro-Ro Vessel</option>
          </select>

          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Fuel Types</option>
            <option value="HFO">HFO</option>
            <option value="MGO">MGO</option>
            <option value="LNG">LNG</option>
            <option value="Methanol">Methanol</option>
            <option value="Ammonia">Ammonia</option>
            <option value="Hydrogen">Hydrogen</option>
          </select>
        </div>

      </div>

      {/* VESSEL CARDS & TABLE */}
      {loading ? (
        <div className="py-16 text-center text-emerald-400 font-medium">Loading vessels...</div>
      ) : filteredVessels.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-navy-900/50 rounded-xl border border-navy-800">
          No vessels match your search filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVessels.map((vessel) => (
            <div 
              key={vessel.vessel_id}
              className="glass-panel p-5 rounded-2xl border border-navy-800 hover:border-emerald-500/40 transition flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {vessel.vessel_id}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                      {vessel.name}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    vessel.efficiency_rating.includes('A') 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                  }`}>
                    Rating: {vessel.efficiency_rating}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-1 font-medium">{vessel.type}</p>
              </div>

              {/* Technical specs grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-navy-950 p-3 rounded-xl border border-navy-850">
                <div>
                  <span className="text-slate-400 text-[10px] block">Capacity (DWT)</span>
                  <span className="font-semibold text-slate-200 font-mono">{vessel.capacity_dwt.toLocaleString()} t</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Engine Power</span>
                  <span className="font-semibold text-slate-200 font-mono">{vessel.engine_power_kw.toLocaleString()} kW</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Current Speed</span>
                  <span className="font-semibold text-emerald-400 font-mono">{vessel.current_speed_knots} knots</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Default Fuel</span>
                  <span className="font-semibold text-blue-400 font-mono">{vessel.default_fuel_type}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-navy-850">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Flag className="w-3.5 h-3.5 text-slate-400" />
                  {vessel.flag}
                </span>

                <button
                  onClick={() => setSelectedVessel(vessel)}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View Specs</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* VESSEL DETAILS MODAL */}
      {selectedVessel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedVessel(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Ship className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedVessel.name}</h3>
                <p className="text-xs text-slate-400">{selectedVessel.vessel_id} • {selectedVessel.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="text-slate-400 block mb-1">Deadweight Tonnage</span>
                <span className="text-base font-bold text-white font-mono">{selectedVessel.capacity_dwt.toLocaleString()} DWT</span>
              </div>
              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="text-slate-400 block mb-1">Main Engine Power</span>
                <span className="text-base font-bold text-white font-mono">{selectedVessel.engine_power_kw.toLocaleString()} kW</span>
              </div>
              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="text-slate-400 block mb-1">Design Speed</span>
                <span className="text-base font-bold text-emerald-400 font-mono">{selectedVessel.design_speed_knots} knots</span>
              </div>
              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800">
                <span className="text-slate-400 block mb-1">Fuel Configuration</span>
                <span className="text-base font-bold text-blue-400 font-mono">{selectedVessel.default_fuel_type}</span>
              </div>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>IMO Built Year:</span>
                <span className="font-semibold text-white">{selectedVessel.built_year}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Flag State:</span>
                <span className="font-semibold text-white">{selectedVessel.flag}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Efficiency Rating:</span>
                <span className="font-semibold text-emerald-400">{selectedVessel.efficiency_rating} (EU-ETS Compliant)</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedVessel(null)}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-xl text-sm transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
