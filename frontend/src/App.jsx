import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import FleetPage from "./pages/FleetPage";
import FuelPredictionPage from "./pages/FuelPredictionPage";
import VoyageOptimizerPage from "./pages/VoyageOptimizerPage";
import SimulatorPage from "./pages/SimulatorPage";
import EmissionsPage from "./pages/EmissionsPage";
import BenchmarkingPage from "./pages/BenchmarkingPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Pages that should NOT have Navbar, Sidebar or Footer
  const isPublicPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-[#06141F] text-slate-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto min-w-0">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/predict" element={<FuelPredictionPage />} />
            <Route path="/optimizer" element={<VoyageOptimizerPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/emissions" element={<EmissionsPage />} />
            <Route path="/benchmarking" element={<BenchmarkingPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
