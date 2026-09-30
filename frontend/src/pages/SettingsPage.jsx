import React, { useEffect, useState } from "react";
import {
  Settings,
  User,
  Mail,
  Shield,
  Bell,
  Save,
  RefreshCw,
  CheckCircle,
  Cpu,
  Database,
  Server,
} from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  const [preferences, setPreferences] = useState({
    units: "Metric",
    distance: "Kilometers",
    fuelUnit: "Metric Tons",
    notifications: true,
  });

  // ============================================================
  // LOAD LOGGED-IN USER
  // ============================================================

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("greenfleet_user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }, []);

  // ============================================================
  // SAVE PREFERENCES
  // ============================================================

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("greenfleet_preferences", JSON.stringify(preferences));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // ============================================================
  // RESET PREFERENCES
  // ============================================================

  const handleReset = () => {
    const defaultPreferences = {
      units: "Metric",
      distance: "Kilometers",
      fuelUnit: "Metric Tons",
      notifications: true,
    };

    setPreferences(defaultPreferences);

    localStorage.setItem(
      "greenfleet_preferences",
      JSON.stringify(defaultPreferences),
    );
  };

  // ============================================================
  // USER DETAILS
  // ============================================================

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email";
  const userRole = user?.role || "Fleet Manager";

  return (
    <div className="min-h-screen bg-[#06141F] text-white">
      <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
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
                  Settings
                </h1>

                <p className="text-sm text-[#8BA3B3] mt-1">
                  Manage your profile, preferences, and GreenFleet AI settings.
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 rounded-full bg-[#0D9488]/10 border border-[#2DD4BF]/30">
            <span className="text-xs font-semibold text-[#2DD4BF]">
              Quantum-Inspired Optimization
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROFILE */}
        {/* ========================================================= */}

        <div className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] shadow-xl">
          <div className="flex items-center gap-3 border-b border-[#16445A] pb-4">
            <div className="w-9 h-9 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 flex items-center justify-center">
              <User className="w-4 h-4 text-[#2DD4BF]" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Profile Information
              </h3>

              <p className="text-xs text-[#718A9A] mt-1">
                Information associated with your GreenFleet AI account.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {/* NAME */}
            <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-[#2DD4BF]" />

                <span className="text-xs text-[#718A9A]">Full Name</span>
              </div>

              <p className="text-sm font-semibold text-white break-words">
                {userName}
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-[#38BDF8]" />

                <span className="text-xs text-[#718A9A]">Email</span>
              </div>

              <p className="text-sm font-semibold text-white break-words">
                {userEmail}
              </p>
            </div>

            {/* ROLE */}
            <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-[#A78BFA]" />

                <span className="text-xs text-[#718A9A]">Role</span>
              </div>

              <p className="text-sm font-semibold text-[#A78BFA]">{userRole}</p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* APPLICATION PREFERENCES */}
        {/* ========================================================= */}

        <form
          onSubmit={handleSave}
          className="bg-[#0A1C29] p-6 rounded-2xl border border-[#16445A] shadow-xl space-y-7"
        >
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-3 border-b border-[#16445A] pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center">
                <Settings className="w-4 h-4 text-[#38BDF8]" />
              </div>

              <span>Application Preferences</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* UNITS */}
              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5 text-xs">
                  Measurement Units
                </label>

                <select
                  value={preferences.units}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      units: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                >
                  <option value="Metric">Metric</option>
                  <option value="Imperial">Imperial</option>
                </select>
              </div>

              {/* DISTANCE */}
              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5 text-xs">
                  Distance Unit
                </label>

                <select
                  value={preferences.distance}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      distance: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                >
                  <option value="Kilometers">Kilometers</option>

                  <option value="Nautical Miles">Nautical Miles</option>

                  <option value="Miles">Miles</option>
                </select>
              </div>

              {/* FUEL UNIT */}
              <div>
                <label className="block text-[#B7C8D3] font-medium mb-1.5 text-xs">
                  Fuel Unit
                </label>

                <select
                  value={preferences.fuelUnit}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      fuelUnit: e.target.value,
                    })
                  }
                  className="w-full bg-[#071923] border border-[#16445A] rounded-lg p-2.5 text-white focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/30 focus:outline-none transition"
                >
                  <option value="Metric Tons">Metric Tons</option>

                  <option value="Kilograms">Kilograms</option>
                </select>
              </div>

              {/* NOTIFICATIONS */}
              <div className="bg-[#071923] border border-[#16445A] rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-[#2DD4BF]" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Notifications
                    </p>

                    <p className="text-[10px] text-[#718A9A]">
                      Fleet alerts and updates
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      notifications: !preferences.notifications,
                    })
                  }
                  className={`relative w-11 h-6 rounded-full transition ${
                    preferences.notifications ? "bg-[#0D9488]" : "bg-[#16445A]"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                      preferences.notifications ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* =======================================================
              SYSTEM INFORMATION
          ======================================================= */}

          <div className="bg-[#071923] border border-[#16445A] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/40" />

                <span className="text-xs font-semibold text-[#B7C8D3]">
                  GreenFleet AI System
                </span>
              </div>

              <span className="text-[10px] text-[#718A9A] font-mono">
                VERSION 1.0
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
              <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-3.5 h-3.5 text-[#38BDF8]" />

                  <span className="text-[#718A9A]">API</span>
                </div>

                <span className="text-[#2DD4BF] font-semibold">Connected</span>
              </div>

              <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-3.5 h-3.5 text-[#38BDF8]" />

                  <span className="text-[#718A9A]">Database</span>
                </div>

                <span className="text-[#2DD4BF] font-semibold">SQLite</span>
              </div>

              <div className="bg-[#0A1C29] border border-[#16445A] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-3.5 h-3.5 text-[#A78BFA]" />

                  <span className="text-[#718A9A]">Optimization</span>
                </div>

                <span className="text-[#2DD4BF] font-semibold">
                  Quantum-Inspired
                </span>
              </div>
            </div>
          </div>

          {/* =======================================================
              SAVE / RESET
          ======================================================= */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#16445A]">
            <div className="text-xs">
              {saved ? (
                <span className="text-[#2DD4BF] font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Settings saved successfully!
                </span>
              ) : (
                <span className="text-[#718A9A]">
                  Your preferences are saved locally.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
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
