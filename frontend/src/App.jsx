import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FleetPage from './pages/FleetPage';
import FuelPredictionPage from './pages/FuelPredictionPage';
import VoyageOptimizerPage from './pages/VoyageOptimizerPage';
import SimulatorPage from './pages/SimulatorPage';
import EmissionsPage from './pages/EmissionsPage';
import BenchmarkingPage from './pages/BenchmarkingPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
        
        {/* Top Header Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Body with Sidebar + Page Content */}
        <div className="flex-1 flex overflow-hidden">
          
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          <main className="flex-1 overflow-y-auto min-w-0">
            <Routes>
              <Route path="/" element={<LandingPage />} />
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
    </Router>
  );
}
