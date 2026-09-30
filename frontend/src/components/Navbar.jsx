import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ship, Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import DemoBadge from "./DemoBadge";

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // ============================================================
  // LOAD LOGGED-IN USER
  // ============================================================

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("greenfleet_user");

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      }
    };

    loadUser();

    // Update Navbar when localStorage changes
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    localStorage.removeItem("greenfleet_user");

    setUser(null);
    setProfileOpen(false);

    navigate("/login");
  };

  // ============================================================
  // DISPLAY USER DETAILS
  // ============================================================

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "No email";
  const displayRole = user?.role || "Fleet Manager";

  return (
    <header className="sticky top-0 z-30 bg-navy-900/90 backdrop-blur-md border-b border-navy-800 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* ======================================================
            LEFT SIDE
        ====================================================== */}

        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
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

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
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

        {/* ======================================================
            RIGHT SIDE - USER PROFILE
        ====================================================== */}

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-navy-800 transition"
          >
            {/* User Icon */}
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Name + Role */}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-white">{displayName}</p>

              <p className="text-[11px] text-slate-400">{displayRole}</p>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ==================================================
              PROFILE DROPDOWN
          ================================================== */}

          {profileOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden z-50"
              style={{
                backgroundColor: "#0A1C29",
                border: "1px solid #16445A",
                boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
              }}
            >
              {/* User Information */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-base font-bold text-white truncate">
                      {displayName}
                    </p>

                    <p className="text-xs text-slate-400 truncate">
                      {displayEmail}
                    </p>

                    <p className="text-[11px] text-emerald-400 mt-1">
                      {displayRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#16445A]" />

              {/* Profile & Settings */}
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-300 hover:bg-navy-800 hover:text-white transition"
              >
                <User className="w-4 h-4" />
                <span>Profile & Settings</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
