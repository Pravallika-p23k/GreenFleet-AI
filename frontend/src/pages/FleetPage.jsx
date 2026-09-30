import React, { useEffect, useState } from "react";
import { Ship, Search, Filter, Fuel, Eye, X, Flag } from "lucide-react";
import { api } from "../services/api";
export default function FleetPage() {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [fuelFilter, setFuelFilter] = useState("All");
  const [selectedVessel, setSelectedVessel] = useState(null);
  useEffect(() => {
    loadVessels();
  }, [typeFilter, fuelFilter]);
  const loadVessels = () => {
    setLoading(true);
    api
      .getVessels({ vessel_type: typeFilter, fuel_type: fuelFilter })
      .then((res) => {
        setVessels(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load vessels:", err);
        setLoading(false);
      });
  };
  const filteredVessels = vessels.filter(
    (vessel) =>
      vessel.name.toLowerCase().includes(search.toLowerCase()) ||
      vessel.vessel_id.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div
      className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
      style={{ backgroundColor: "#06141F" }}
    >
      {" "}
      {/* ======================================================== HEADER ======================================================== */}{" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0D9488 0%, #16445A 100%)",
            }}
          >
            {" "}
            <Ship className="w-5 h-5 text-[#5EEAD4]" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {" "}
              Fleet Management{" "}
            </h1>{" "}
            <p className="text-sm text-[#8BA3B3] mt-1">
              {" "}
              View active maritime vessel profiles, engine specifications, and
              fuel efficiencies.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* ======================================================== SEARCH & FILTER CONTROLS ======================================================== */}{" "}
      <div
        className="p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ backgroundColor: "#0A1C29", border: "1px solid #16445A" }}
      >
        {" "}
        {/* SEARCH */}{" "}
        <div className="relative w-full md:w-80">
          {" "}
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#718A9A]" />{" "}
          <input
            type="text"
            placeholder="Search vessel name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-[#718A9A] focus:outline-none transition"
            style={{ backgroundColor: "#071923", border: "1px solid #16445A" }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#2DD4BF";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#16445A";
            }}
          />{" "}
        </div>{" "}
        {/* FILTERS */}{" "}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {" "}
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
            {" "}
            <Filter className="w-3.5 h-3.5 text-[#2DD4BF]" />{" "}
            <span>Filters:</span>{" "}
          </div>{" "}
          {/* VESSEL TYPE */}{" "}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            style={{ backgroundColor: "#071923", border: "1px solid #16445A" }}
          >
            {" "}
            <option value="All">All Vessel Types</option>{" "}
            <option value="Container Ship">Container Ship</option>{" "}
            <option value="Bulk Carrier">Bulk Carrier</option>{" "}
            <option value="Oil Tanker">Oil Tanker</option>{" "}
            <option value="Ro-Ro Vessel">Ro-Ro Vessel</option>{" "}
          </select>{" "}
          {/* FUEL TYPE */}{" "}
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            style={{ backgroundColor: "#071923", border: "1px solid #16445A" }}
          >
            {" "}
            <option value="All">All Fuel Types</option>{" "}
            <option value="HFO">HFO</option> <option value="MGO">MGO</option>{" "}
            <option value="LNG">LNG</option>{" "}
            <option value="Methanol">Methanol</option>{" "}
            <option value="Ammonia">Ammonia</option>{" "}
            <option value="Hydrogen">Hydrogen</option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      {/* ======================================================== VESSEL RESULTS ======================================================== */}{" "}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          {" "}
          <div className="flex items-center gap-3 text-[#2DD4BF] font-medium">
            {" "}
            <div className="w-5 h-5 border-2 border-[#2DD4BF] border-t-transparent rounded-full animate-spin" />{" "}
            <span>Loading vessels...</span>{" "}
          </div>{" "}
        </div>
      ) : filteredVessels.length === 0 ? (
        <div
          className="py-16 text-center text-[#8BA3B3] rounded-xl"
          style={{ backgroundColor: "#0A1C29", border: "1px solid #16445A" }}
        >
          {" "}
          No vessels match your search filter.{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {" "}
          {filteredVessels.map((vessel) => (
            <div
              key={vessel.vessel_id}
              className="p-5 rounded-2xl flex flex-col justify-between space-y-4 group transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: "#0A1C29",
                border: "1px solid #16445A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(45, 212, 191, 0.55)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#16445A";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {" "}
              {/* ================================================== VESSEL HEADER ================================================== */}{" "}
              <div>
                {" "}
                <div className="flex items-start justify-between gap-3">
                  {" "}
                  <div>
                    {" "}
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                      style={{
                        color: "#5EEAD4",
                        backgroundColor: "rgba(45, 212, 191, 0.08)",
                        borderColor: "rgba(45, 212, 191, 0.25)",
                      }}
                    >
                      {" "}
                      {vessel.vessel_id}{" "}
                    </span>{" "}
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#5EEAD4] transition">
                      {" "}
                      {vessel.name}{" "}
                    </h3>{" "}
                  </div>{" "}
                  {/* EFFICIENCY RATING */}{" "}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${vessel.efficiency_rating.includes("A") ? "" : ""}`}
                    style={
                      vessel.efficiency_rating.includes("A")
                        ? {
                            backgroundColor: "rgba(45, 212, 191, 0.10)",
                            color: "#5EEAD4",
                            border: "1px solid rgba(45, 212, 191, 0.30)",
                          }
                        : {
                            backgroundColor: "rgba(251, 191, 36, 0.10)",
                            color: "#FBBF24",
                            border: "1px solid rgba(251, 191, 36, 0.30)",
                          }
                    }
                  >
                    {" "}
                    Rating: {vessel.efficiency_rating}{" "}
                  </span>{" "}
                </div>{" "}
                <p className="text-xs text-[#8BA3B3] mt-1 font-medium">
                  {" "}
                  {vessel.type}{" "}
                </p>{" "}
              </div>{" "}
              {/* ================================================== TECHNICAL SPECIFICATIONS ================================================== */}{" "}
              <div
                className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl"
                style={{
                  backgroundColor: "#071923",
                  border: "1px solid #163242",
                }}
              >
                {" "}
                <div>
                  {" "}
                  <span className="text-[#718A9A] text-[10px] block">
                    {" "}
                    Capacity (DWT){" "}
                  </span>{" "}
                  <span className="font-semibold text-[#CBD5E1] font-mono">
                    {" "}
                    {vessel.capacity_dwt.toLocaleString()} t{" "}
                  </span>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <span className="text-[#718A9A] text-[10px] block">
                    {" "}
                    Engine Power{" "}
                  </span>{" "}
                  <span className="font-semibold text-[#CBD5E1] font-mono">
                    {" "}
                    {vessel.engine_power_kw.toLocaleString()} kW{" "}
                  </span>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <span className="text-[#718A9A] text-[10px] block">
                    {" "}
                    Current Speed{" "}
                  </span>{" "}
                  <span className="font-semibold text-[#2DD4BF] font-mono">
                    {" "}
                    {vessel.current_speed_knots} knots{" "}
                  </span>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <span className="text-[#718A9A] text-[10px] block">
                    {" "}
                    Default Fuel{" "}
                  </span>{" "}
                  <span className="font-semibold text-[#38BDF8] font-mono">
                    {" "}
                    {vessel.default_fuel_type}{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
              {/* ================================================== FOOTER ================================================== */}{" "}
              <div
                className="flex items-center justify-between pt-2"
                style={{ borderTop: "1px solid #163242" }}
              >
                {" "}
                <span className="text-xs text-[#8BA3B3] flex items-center gap-1">
                  {" "}
                  <Flag className="w-3.5 h-3.5 text-[#718A9A]" />{" "}
                  {vessel.flag}{" "}
                </span>{" "}
                <button
                  onClick={() => setSelectedVessel(vessel)}
                  className="px-3 py-1.5 rounded-lg text-[#CBD5E1] text-xs font-medium flex items-center gap-1.5 transition"
                  style={{
                    backgroundColor: "#102B3A",
                    border: "1px solid #16445A",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#16445A";
                    e.currentTarget.style.color = "#5EEAD4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#102B3A";
                    e.currentTarget.style.color = "#CBD5E1";
                  }}
                >
                  {" "}
                  <Eye className="w-3.5 h-3.5 text-[#2DD4BF]" />{" "}
                  <span>View Specs</span>{" "}
                </button>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
      {/* ======================================================== VESSEL DETAILS MODAL ======================================================== */}{" "}
      {selectedVessel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.72)" }}
        >
          {" "}
          <div
            className="rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative"
            style={{ backgroundColor: "#0A1C29", border: "1px solid #16445A" }}
          >
            {" "}
            {/* CLOSE */}{" "}
            <button
              onClick={() => setSelectedVessel(null)}
              className="absolute top-4 right-4 text-[#718A9A] hover:text-white transition"
            >
              {" "}
              <X className="w-5 h-5" />{" "}
            </button>{" "}
            {/* MODAL HEADER */}{" "}
            <div className="flex items-center gap-3">
              {" "}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(45, 212, 191, 0.10)",
                  border: "1px solid rgba(45, 212, 191, 0.30)",
                }}
              >
                {" "}
                <Ship className="w-5 h-5 text-[#5EEAD4]" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-bold text-white">
                  {" "}
                  {selectedVessel.name}{" "}
                </h3>{" "}
                <p className="text-xs text-[#8BA3B3]">
                  {" "}
                  {selectedVessel.vessel_id} • {selectedVessel.type}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {/* ================================================== PRIMARY SPECIFICATIONS ================================================== */}{" "}
            <div className="grid grid-cols-2 gap-4 text-xs">
              {" "}
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: "#071923",
                  border: "1px solid #16445A",
                }}
              >
                {" "}
                <span className="text-[#718A9A] block mb-1">
                  {" "}
                  Deadweight Tonnage{" "}
                </span>{" "}
                <span className="text-base font-bold text-white font-mono">
                  {" "}
                  {selectedVessel.capacity_dwt.toLocaleString()} DWT{" "}
                </span>{" "}
              </div>{" "}
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: "#071923",
                  border: "1px solid #16445A",
                }}
              >
                {" "}
                <span className="text-[#718A9A] block mb-1">
                  {" "}
                  Main Engine Power{" "}
                </span>{" "}
                <span className="text-base font-bold text-white font-mono">
                  {" "}
                  {selectedVessel.engine_power_kw.toLocaleString()} kW{" "}
                </span>{" "}
              </div>{" "}
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: "#071923",
                  border: "1px solid #16445A",
                }}
              >
                {" "}
                <span className="text-[#718A9A] block mb-1">
                  {" "}
                  Design Speed{" "}
                </span>{" "}
                <span className="text-base font-bold text-[#2DD4BF] font-mono">
                  {" "}
                  {selectedVessel.design_speed_knots} knots{" "}
                </span>{" "}
              </div>{" "}
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: "#071923",
                  border: "1px solid #16445A",
                }}
              >
                {" "}
                <span className="text-[#718A9A] block mb-1">
                  {" "}
                  Fuel Configuration{" "}
                </span>{" "}
                <span className="text-base font-bold text-[#38BDF8] font-mono">
                  {" "}
                  {selectedVessel.default_fuel_type}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            {/* ================================================== ADDITIONAL INFORMATION ================================================== */}{" "}
            <div
              className="p-4 rounded-xl text-xs space-y-3"
              style={{
                backgroundColor: "#071923",
                border: "1px solid #16445A",
              }}
            >
              {" "}
              <div className="flex justify-between text-[#CBD5E1]">
                {" "}
                <span>Built Year:</span>{" "}
                <span className="font-semibold text-white">
                  {" "}
                  {selectedVessel.built_year}{" "}
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between text-[#CBD5E1]">
                {" "}
                <span>Flag State:</span>{" "}
                <span className="font-semibold text-white">
                  {" "}
                  {selectedVessel.flag}{" "}
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between text-[#CBD5E1]">
                {" "}
                <span>Efficiency Rating:</span>{" "}
                <span className="font-semibold text-[#2DD4BF]">
                  {" "}
                  {selectedVessel.efficiency_rating}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            {/* ================================================== CLOSE BUTTON ================================================== */}{" "}
            <button
              onClick={() => setSelectedVessel(null)}
              className="w-full py-2.5 rounded-xl text-sm font-bold transition"
              style={{ backgroundColor: "#2DD4BF", color: "#06141F" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5EEAD4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2DD4BF";
              }}
            >
              {" "}
              Close Details{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
