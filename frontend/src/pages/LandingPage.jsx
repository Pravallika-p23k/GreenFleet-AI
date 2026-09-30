import React from "react";
import { Link } from "react-router-dom";
import oceanBackground from "../asserts/ocean.png";
import {
  Ship,
  Fuel,
  Leaf,
  BarChart3,
  Brain,
  Gauge,
  Route,
  CloudSun,
  Anchor,
  Package,
  Zap,
  ShieldCheck,
  Activity,
  TrendingDown,
  Globe2,
  Database,
  Cpu,
  Waves,
  Clock3,
  CircleDollarSign,
  Wind,
  FlaskConical,
  Network,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LineChart,
  Settings2,
  RefreshCw,
} from "lucide-react";

const COLORS = {
  page: "#06141F",
  card: "#0A1C29",
  cardDark: "#071923",
  border: "#16445A",
  grid: "#163242",
  teal: "#2DD4BF",
  aqua: "#5EEAD4",
  blue: "#38BDF8",
  amber: "#FBBF24",
  purple: "#A78BFA",
  text: "#F8FAFC",
  secondary: "#B7C8D3",
  muted: "#718A9A",
};

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1C29]/80 border border-[#16445A] text-[#5EEAD4] text-xs font-bold uppercase tracking-[0.16em]">
        <Sparkles className="w-4 h-4" />
        {eyebrow}
      </div>

      <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight">
        {title}
      </h2>

      <p className="mt-5 text-[#8BA3B3] leading-relaxed text-base md:text-lg">
        {description}
      </p>
    </div>
  );
}

function SolutionCard({
  icon: Icon,
  title,
  description,
  color = COLORS.teal,
  badge,
}) {
  return (
    <div
      className="group rounded-2xl p-6 border bg-[#0A1C29]/85 backdrop-blur-xl transition duration-300 hover:-translate-y-1"
      style={{
        borderColor: COLORS.border,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border"
          style={{
            backgroundColor: `${color}15`,
            borderColor: `${color}55`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        {badge && (
          <span
            className="text-[10px] px-2.5 py-1 rounded-full border uppercase tracking-wider font-bold"
            style={{
              color,
              borderColor: `${color}55`,
              backgroundColor: `${color}10`,
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm text-[#8BA3B3] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function InnovationCard({ number, icon: Icon, title, description, color }) {
  return (
    <div className="relative rounded-2xl border border-[#16445A] bg-[#071923]/90 p-6 hover:border-[#2DD4BF]/50 transition">
      <div className="absolute top-5 right-5 text-xs font-black text-[#718A9A]">
        {number}
      </div>

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center border"
        style={{
          color,
          backgroundColor: `${color}10`,
          borderColor: `${color}45`,
        }}
      >
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="mt-5 text-lg font-bold">{title}</h3>

      <p className="mt-3 text-sm text-[#8BA3B3] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div
      className="min-h-screen w-full text-white relative overflow-x-hidden"
      style={{
        backgroundColor: COLORS.page,
        backgroundImage: `url(${oceanBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* =========================================================
          GLOBAL BACKGROUND
      ========================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: `${COLORS.teal}10` }}
        />

        <div
          className="absolute top-[40%] -right-40 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: `${COLORS.blue}09` }}
        />

        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: `${COLORS.purple}08` }}
        />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="relative z-50 sticky top-0 border-b border-[#16445A]/70 bg-[#06141F]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0D9488]/20 border border-[#2DD4BF]/40 flex items-center justify-center">
              <Ship className="w-6 h-6 text-[#2DD4BF]" />
            </div>

            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight">
             AQUA <span className="text-[#2DD4BF]">SETU</span>
              </h1>

              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#718A9A]">
                Intelligent Maritime Optimization
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-[#8BA3B3]">
            <a href="#problem" className="hover:text-[#5EEAD4] transition">
              Problem
            </a>
            <a href="#solution" className="hover:text-[#5EEAD4] transition">
              Solution
            </a>
            <a href="#innovation" className="hover:text-[#5EEAD4] transition">
              Innovation
            </a>
            <a href="#workflow" className="hover:text-[#5EEAD4] transition">
              How It Works
            </a>
            <a href="#impact" className="hover:text-[#5EEAD4] transition">
              Impact
            </a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/login"
              className="px-3 md:px-4 py-2 rounded-lg text-sm font-semibold text-[#D7E2E8] border border-[#16445A] hover:border-[#2DD4BF] hover:text-[#5EEAD4] transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-3 md:px-4 py-2 rounded-lg bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] text-sm font-bold transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <main className="relative z-10">
        <section
          className="relative min-h-[760px] flex items-center"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(6, 20, 31, 0.58),
                rgba(6, 20, 31, 0.95)
              ),
              url(${oceanBackground})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1C29]/80 backdrop-blur-xl border border-[#2DD4BF]/40 text-[#5EEAD4] text-xs md:text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
                AI + QUANTUM-INSPIRED GREEN FLEET MANAGEMENT
              </div>

              <h2 className="mt-7 text-5xl md:text-7xl font-black tracking-tight leading-[1.02]">
                Smarter Voyages.
                <br />
                <span className="text-[#2DD4BF]">Greener Fleet.</span>
              </h2>

              <p className="mt-7 max-w-3xl text-lg md:text-xl text-[#C3D2DA] leading-relaxed">
               AUQA SETU is a decision-support platform that predicts
                vessel fuel consumption and intelligently optimizes vessel
                selection, capacity, speed, route, and fuel choice while
                considering cargo demand, delivery schedules, operational
                constraints, cost, and lifecycle emissions.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="group px-7 py-4 rounded-xl bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] font-extrabold shadow-xl shadow-[#0D9488]/20 transition flex items-center gap-2"
                >
                  Explore GreenFleet
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
                {[
                  ["AI", "Fuel Prediction"],
                  ["Q-INSPIRED", "Optimization"],
                  ["MULTI", "Objective Decisions"],
                  ["REAL-WORLD", "Scenario Analysis"],
                ].map(([top, bottom]) => (
                  <div
                    key={top}
                    className="rounded-xl border border-[#16445A]/80 bg-[#06141F]/70 backdrop-blur-xl px-4 py-4"
                  >
                    <div className="text-[#2DD4BF] text-xs font-black">
                      {top}
                    </div>
                    <div className="mt-1 text-xs text-[#8BA3B3]">{bottom}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROBLEM
        ========================================================= */}
        <section id="problem" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <SectionTitle
            eyebrow="The Maritime Challenge"
            title="Why Green Fleet Management Is Difficult"
            description="Maritime fleet decisions involve many variables at the same time. A decision that reduces fuel may affect delivery time, cost, cargo capacity, or emissions."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <SolutionCard
              icon={Fuel}
              title="High Fuel Consumption"
              description="Fuel is a major operational expense. Speed, vessel characteristics, route conditions, weather and cargo load can significantly affect consumption."
              color={COLORS.teal}
            />

            <SolutionCard
              icon={Leaf}
              title="GHG Emissions"
              description="Fleet decisions must consider greenhouse-gas emissions and changing environmental requirements while maintaining operational performance."
              color={COLORS.blue}
            />

            <SolutionCard
              icon={Clock3}
              title="Schedule Reliability"
              description="Reducing fuel alone is not enough. Cargo still needs to arrive within the required delivery window."
              color={COLORS.amber}
            />

            <SolutionCard
              icon={Network}
              title="Too Many Combinations"
              description="Choosing vessels, speeds, fuels and deployment plans creates a large search space that becomes difficult to solve using simple rules."
              color={COLORS.purple}
            />
          </div>
        </section>

        {/* =========================================================
            SIH SOLUTION
        ========================================================= */}
        <section
          id="solution"
          className="border-y border-[#16445A]/70 bg-[#071923]/60"
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
            <SectionTitle
              eyebrow="Our Solution"
              title="One Platform. Multiple Green Fleet Decisions."
              description="GreenFleet AI combines data-driven prediction, mathematical modeling, quantum-inspired optimization, alternative-fuel analysis and scenario simulation into one decision-support platform."
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SolutionCard
                icon={Brain}
                title="AI Fuel Prediction"
                description="Machine-learning models estimate fuel consumption using vessel characteristics, speed, distance, cargo, fuel type and environmental conditions."
                color={COLORS.teal}
                badge="AI"
              />

              <SolutionCard
                icon={Leaf}
                title="Lifecycle Emission Analysis"
                description="Estimate operational and lifecycle greenhouse-gas impact for different fuel and fleet scenarios using configurable emission factors."
                color={COLORS.blue}
                badge="GREEN"
              />

              <SolutionCard
                icon={Cpu}
                title="Quantum-Inspired Optimization"
                description="Use quantum-inspired search concepts on classical computing hardware to explore large combinations of fleet and voyage decisions."
                color={COLORS.purple}
                badge="CORE"
              />

              <SolutionCard
                icon={FlaskConical}
                title="Alternative Fuel Scenarios"
                description="Compare HFO, MGO, LNG, methanol, hydrogen and ammonia scenarios based on fuel consumption, cost, emissions and operational constraints."
                color={COLORS.amber}
                badge="FUEL"
              />

              <SolutionCard
                icon={Route}
                title="Voyage Optimization"
                description="Evaluate vessel, speed, route and fuel combinations while respecting cargo demand, delivery deadline and operational constraints."
                color={COLORS.blue}
                badge="VOYAGE"
              />

              <SolutionCard
                icon={BarChart3}
                title="Multi-Objective Decisions"
                description="Balance fuel consumption, operating cost, emissions and schedule requirements instead of optimizing only one metric."
                color={COLORS.teal}
                badge="MULTI"
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW IT SOLVES SIH REQUIREMENTS
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <SectionTitle
            eyebrow="Expected Solution Coverage"
            title="Working Platform"
            description="Each major requirement is represented as a functional module in GreenFleet AI."
          />

          <div className="mt-14 overflow-hidden rounded-2xl border border-[#16445A] bg-[#071923]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#0A1C29] border-b border-[#16445A]">
                  <tr>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#718A9A]">
                      SIH Requirement
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#718A9A]">
                      GreenFleet Module
                    </th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#718A9A]">
                      Output
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#16445A]/60">
                  {[
                    [
                      "Fuel consumption prediction",
                      "AI Fuel Prediction",
                      "Predicted fuel consumption",
                    ],
                    [
                      "Vessel deployment optimization",
                      "Fleet Optimizer",
                      "Candidate fleet plans",
                    ],
                    [
                      "Speed optimization",
                      "Voyage Optimizer",
                      "Recommended operating speed",
                    ],
                    [
                      "Alternative fuels",
                      "Fuel Intelligence",
                      "Fuel scenario comparison",
                    ],
                    [
                      "Lifecycle GHG minimization",
                      "Emission Intelligence",
                      "CO₂ / GHG estimates",
                    ],
                    [
                      "Cargo demand",
                      "Cargo-Fleet Optimization",
                      "Capacity-feasible plan",
                    ],
                    [
                      "Schedule reliability",
                      "Voyage Constraints",
                      "Travel-time feasibility",
                    ],
                    [
                      "Quantum-inspired optimization",
                      "Optimization Engine",
                      "Search / candidate solutions",
                    ],
                    [
                      "Benchmarking",
                      "Benchmark Center",
                      "Measured algorithm comparison",
                    ],
                  ].map(([requirement, module, output]) => (
                    <tr
                      key={requirement}
                      className="hover:bg-[#0A1C29]/70 transition"
                    >
                      <td className="px-6 py-4 text-sm text-[#D7E2E8]">
                        {requirement}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#5EEAD4]">
                        {module}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#8BA3B3]">
                        {output}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================
            INNOVATIONS
        ========================================================= */}
        <section
          id="innovation"
          className="border-y border-[#16445A]/70 bg-[#071923]/60"
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
            <SectionTitle
              eyebrow="Beyond the Basic Requirement"
              title="Our GreenFleet Innovations"
              description="The platform extends the core SIH requirements with practical decision-support capabilities for real-world maritime operations."
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <InnovationCard
                number="01"
                icon={RefreshCw}
                title="Self-Learning Fleet Intelligence"
                description="Compare predicted and actual voyage performance so future model versions can be improved as new operational data becomes available."
                color={COLORS.teal}
              />

              <InnovationCard
                number="02"
                icon={Activity}
                title="Vessel Efficiency Tracking"
                description="Track vessel-level efficiency indicators to identify changes in operational performance over time."
                color={COLORS.blue}
              />

              <InnovationCard
                number="03"
                icon={CloudSun}
                title="Weather-Aware Optimization"
                description="Include wind, waves and environmental conditions in voyage planning and scenario analysis."
                color={COLORS.aqua}
              />

              <InnovationCard
                number="04"
                icon={Clock3}
                title="Just-In-Time Green Arrival"
                description="Consider arrival timing together with fuel efficiency so vessels do not unnecessarily optimize for speed when an earlier arrival provides no operational benefit."
                color={COLORS.amber}
              />

              <InnovationCard
                number="05"
                icon={Anchor}
                title="Port Intelligence"
                description="Include port congestion, berth availability, waiting time and fuel availability as additional decision variables."
                color={COLORS.blue}
              />

              <InnovationCard
                number="06"
                icon={Package}
                title="Cargo-Fleet Co-Optimization"
                description="Match cargo demand and capacity with suitable vessels instead of optimizing vessel selection separately from cargo requirements."
                color={COLORS.teal}
              />

              <InnovationCard
                number="07"
                icon={ShieldCheck}
                title="Resilient Backup Plans"
                description="Generate alternative feasible plans for situations such as fuel unavailability, weather disruption, vessel unavailability or schedule changes."
                color={COLORS.purple}
              />

              <InnovationCard
                number="08"
                icon={Settings2}
                title="Constraint Conflict Explanation"
                description="Explain when requirements conflict, such as low emissions versus strict delivery deadlines, instead of returning only a numerical result."
                color={COLORS.amber}
              />

              <InnovationCard
                number="09"
                icon={LineChart}
                title="Pareto Decision Support"
                description="Present multiple trade-off solutions so operators can examine different cost, fuel, emissions and schedule combinations."
                color={COLORS.teal}
              />

              <InnovationCard
                number="10"
                icon={Globe2}
                title="Green Voyage Score"
                description="Combine operational indicators into an interpretable voyage-performance view for comparing scenarios."
                color={COLORS.blue}
              />

              <InnovationCard
                number="11"
                icon={Waves}
                title="Route Scenario Intelligence"
                description="Compare route alternatives using distance, time, weather, fuel, emissions, cost and risk factors."
                color={COLORS.aqua}
              />

              <InnovationCard
                number="12"
                icon={Database}
                title="Green Voyage Audit Trail"
                description="Maintain a structured record of optimization inputs, assumptions, selected plan and model version for traceability."
                color={COLORS.purple}
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            WORKFLOW
        ========================================================= */}
        <section id="workflow" className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <SectionTitle
            eyebrow="System Workflow"
            title="Sense → Predict → Optimize → Compare → Decide"
            description="GreenFleet AI turns vessel and voyage information into explainable fleet decisions."
          />

          <div className="mt-16 relative">
            <div className="hidden lg:block absolute top-10 left-12 right-12 h-px bg-gradient-to-r from-[#2DD4BF] via-[#38BDF8] to-[#A78BFA] opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
              {[
                {
                  icon: Database,
                  title: "Input",
                  text: "Vessel, cargo, route, speed, fuel and environmental data.",
                  color: COLORS.teal,
                },
                {
                  icon: Brain,
                  title: "Predict",
                  text: "AI estimates fuel consumption and voyage performance.",
                  color: COLORS.blue,
                },
                {
                  icon: Route,
                  title: "Generate",
                  text: "Create feasible fleet, speed, route and fuel combinations.",
                  color: COLORS.aqua,
                },
                {
                  icon: Cpu,
                  title: "Optimize",
                  text: "Quantum-inspired search explores candidate solutions.",
                  color: COLORS.purple,
                },
                {
                  icon: BarChart3,
                  title: "Evaluate",
                  text: "Compare fuel, cost, emissions, time and constraints.",
                  color: COLORS.amber,
                },
                {
                  icon: CheckCircle2,
                  title: "Decide",
                  text: "Present explainable candidate plans to the operator.",
                  color: COLORS.teal,
                },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="relative z-10 rounded-2xl border border-[#16445A] bg-[#0A1C29]/95 p-5 text-center"
                  >
                    <div
                      className="mx-auto w-12 h-12 rounded-full border flex items-center justify-center"
                      style={{
                        color: step.color,
                        borderColor: `${step.color}55`,
                        backgroundColor: `${step.color}12`,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="mt-4 text-[10px] font-black tracking-widest text-[#718A9A]">
                      STEP {index + 1}
                    </div>

                    <h3 className="mt-2 font-bold">{step.title}</h3>

                    <p className="mt-2 text-xs text-[#8BA3B3] leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            DIGITAL TWIN
        ========================================================= */}
        <section className="border-y border-[#16445A]/70 bg-[#071923]/60">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#5EEAD4] text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-4 h-4" />
                  Vessel Digital Twin
                </div>

                <h2 className="mt-6 text-3xl md:text-5xl font-extrabold">
                  Test a Voyage
                  <span className="text-[#2DD4BF]"> Before Sailing</span>
                </h2>

                <p className="mt-6 text-[#8BA3B3] leading-relaxed">
                  The Digital Twin acts as a software simulation of a vessel.
                  Operators can change speed, cargo, distance, weather or fuel
                  and observe the predicted effect before selecting a voyage
                  plan.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Vessel type and capacity",
                    "Engine power and efficiency",
                    "Speed and voyage distance",
                    "Cargo weight",
                    "Fuel type",
                    "Weather condition",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-[#C3D2DA]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#2DD4BF]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#16445A] bg-[#06141F] p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-5 border-b border-[#16445A]">
                  <div>
                    <div className="text-xs text-[#718A9A] uppercase tracking-widest">
                      Digital Twin
                    </div>
                    <div className="mt-1 text-xl font-bold">Vessel VES-101</div>
                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#5EEAD4] text-xs font-bold">
                    SIMULATION
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    ["Predicted Fuel", "1,284 t", Fuel, COLORS.teal],
                    ["CO₂ Estimate", "4,012 t", Leaf, COLORS.blue],
                    ["Travel Time", "214 h", Clock3, COLORS.amber],
                    [
                      "Operating Cost",
                      "$962K",
                      CircleDollarSign,
                      COLORS.purple,
                    ],
                  ].map(([label, value, Icon, color]) => (
                    <div
                      key={label}
                      className="rounded-2xl bg-[#0A1C29] border border-[#16445A] p-4"
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                      <div className="mt-4 text-xs text-[#718A9A]">{label}</div>
                      <div className="mt-1 text-xl font-extrabold">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#16445A] bg-[#0A1C29] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      Scenario Performance
                    </span>
                    <span className="text-xs text-[#5EEAD4]">MODEL OUTPUT</span>
                  </div>

                  <div className="mt-5 h-2 rounded-full bg-[#163242] overflow-hidden">
                    <div className="h-full w-[76%] bg-[#2DD4BF] rounded-full" />
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-[#718A9A]">
                    <span>Fuel</span>
                    <span>Cost</span>
                    <span>Emissions</span>
                    <span>Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ALTERNATIVE FUELS
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <SectionTitle
            eyebrow="Fuel Intelligence"
            title="Compare the Future of Marine Fuels"
            description="GreenFleet AI can model different fuel scenarios instead of assuming one fuel is suitable for every vessel and voyage."
          />

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ["HFO", "Conventional", COLORS.muted],
              ["MGO", "Marine Gas Oil", COLORS.blue],
              ["LNG", "Lower-carbon scenario", COLORS.teal],
              ["Methanol", "Alternative fuel", COLORS.aqua],
              ["Hydrogen", "Future fuel", COLORS.purple],
              ["Ammonia", "Future fuel", COLORS.amber],
            ].map(([fuel, description, color]) => (
              <div
                key={fuel}
                className="rounded-2xl border border-[#16445A] bg-[#0A1C29] p-5 text-center hover:border-[#2DD4BF]/50 transition"
              >
                <div
                  className="mx-auto w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{
                    color,
                    borderColor: `${color}55`,
                    backgroundColor: `${color}10`,
                  }}
                >
                  <Fuel className="w-5 h-5" />
                </div>

                <h3 className="mt-4 font-extrabold">{fuel}</h3>

                <p className="mt-2 text-xs text-[#718A9A]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            REAL WORLD BENEFITS
        ========================================================= */}
        <section
          id="impact"
          className="border-y border-[#16445A]/70 bg-[#071923]/60"
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-24">
            <SectionTitle
              eyebrow="Real-World Impact"
              title="How GreenFleet AI Helps Maritime Operators"
              description="The platform is designed as a decision-support layer for practical fleet and voyage planning."
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <SolutionCard
                icon={TrendingDown}
                title="Lower Fuel Usage"
                description="Identify operating conditions and voyage plans with lower predicted fuel consumption."
                color={COLORS.teal}
              />

              <SolutionCard
                icon={Leaf}
                title="Lower Emissions"
                description="Compare operational and alternative-fuel scenarios using configurable emission factors."
                color={COLORS.blue}
              />

              <SolutionCard
                icon={CircleDollarSign}
                title="Cost Awareness"
                description="Include fuel price and operating cost in the optimization decision."
                color={COLORS.amber}
              />

              <SolutionCard
                icon={Clock3}
                title="Schedule Awareness"
                description="Keep delivery requirements in the optimization instead of treating time as an afterthought."
                color={COLORS.purple}
              />

              <SolutionCard
                icon={Ship}
                title="Better Fleet Utilization"
                description="Match vessel capacity and characteristics with cargo and voyage requirements."
                color={COLORS.teal}
              />

              <SolutionCard
                icon={Wind}
                title="Weather Awareness"
                description="Evaluate how environmental conditions can influence voyage performance."
                color={COLORS.blue}
              />

              <SolutionCard
                icon={ShieldCheck}
                title="Risk & Resilience"
                description="Generate alternative plans when important operating conditions change."
                color={COLORS.aqua}
              />

              <SolutionCard
                icon={Gauge}
                title="Explainable Decisions"
                description="Show the factors behind candidate plans rather than presenting only one unexplained number."
                color={COLORS.purple}
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            DASHBOARD PREVIEW
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
          <div className="rounded-3xl border border-[#16445A] bg-[#071923] p-6 md:p-10 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#5EEAD4] font-bold">
                  GreenFleet Decision Center
                </div>

                <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">
                  From raw data to an actionable voyage plan.
                </h2>
              </div>

              <Link
                to="/dashboard"
                className="shrink-0 px-5 py-3 rounded-xl border border-[#16445A] hover:border-[#2DD4BF] text-[#D7E2E8] hover:text-[#5EEAD4] transition font-semibold flex items-center gap-2"
              >
                Open Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-[#0A1C29] border border-[#16445A] p-5">
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-[#2DD4BF]" />
                  <span className="font-semibold">Predicted Fuel</span>
                </div>

                <div className="mt-7 text-3xl font-black">Model Output</div>

                <div className="mt-2 text-xs text-[#718A9A]">
                  Based on vessel and voyage inputs
                </div>
              </div>

              <div className="rounded-2xl bg-[#0A1C29] border border-[#16445A] p-5">
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#38BDF8]" />
                  <span className="font-semibold">CO₂ Estimate</span>
                </div>

                <div className="mt-7 text-3xl font-black">Model Output</div>

                <div className="mt-2 text-xs text-[#718A9A]">
                  Based on selected fuel scenario
                </div>
              </div>

              <div className="rounded-2xl bg-[#0A1C29] border border-[#16445A] p-5">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#A78BFA]" />
                  <span className="font-semibold">Optimization</span>
                </div>

                <div className="mt-7 text-3xl font-black">Candidate Plans</div>

                <div className="mt-2 text-xs text-[#718A9A]">
                  Evaluated against configured constraints
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            TECHNOLOGY
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
          <SectionTitle
            eyebrow="Technology Stack"
            title="Built for AI, Optimization and Real-World Deployment"
            description="The architecture combines modern web technologies with machine learning and optimization components."
          />

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              ["React", "Frontend", COLORS.blue],
              ["FastAPI", "Backend API", COLORS.teal],
              ["Python", "AI / ML", COLORS.amber],
              ["XGBoost", "Prediction", COLORS.purple],
              ["Qiskit", "Quantum-ready", COLORS.aqua],
              ["OR-Tools", "Optimization", COLORS.blue],
            ].map(([name, type, color]) => (
              <div
                key={name}
                className="rounded-2xl border border-[#16445A] bg-[#0A1C29] p-5 text-center"
              >
                <div
                  className="mx-auto w-11 h-11 rounded-xl border flex items-center justify-center"
                  style={{
                    color,
                    borderColor: `${color}55`,
                    backgroundColor: `${color}10`,
                  }}
                >
                  <Cpu className="w-5 h-5" />
                </div>

                <h3 className="mt-4 font-bold">{name}</h3>
                <p className="mt-1 text-xs text-[#718A9A]">{type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
          <div
            className="relative overflow-hidden rounded-3xl border border-[#2DD4BF]/30 p-8 md:p-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(13,148,136,0.16), rgba(56,189,248,0.08), rgba(167,139,250,0.08))",
            }}
          >
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#2DD4BF]/10 blur-[100px]" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#38BDF8]/10 blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2DD4BF]/30 bg-[#2DD4BF]/10 text-[#5EEAD4] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Green Maritime Intelligence
              </div>

              <h2 className="mt-6 text-3xl md:text-5xl font-black">
                Make Every Voyage a Smarter Decision.
              </h2>

              <p className="mt-5 max-w-2xl mx-auto text-[#8BA3B3] leading-relaxed">
                Explore vessel performance, simulate scenarios, compare
                alternative fuels and evaluate optimized voyage plans through
                one integrated platform.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-7 py-4 rounded-xl bg-[#0D9488] hover:bg-[#2DD4BF] text-[#06141F] font-extrabold transition flex items-center gap-2"
                >
                 Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>

                
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="relative z-10 border-t border-[#16445A]/70 bg-[#06141F]/95">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/20 border border-[#2DD4BF]/40 flex items-center justify-center">
                <Ship className="w-5 h-5 text-[#2DD4BF]" />
              </div>

              <div>
                <div className="font-extrabold">
                  AUQA <span className="text-[#2DD4BF]">SETU</span>
                </div>

                <div className="text-xs text-[#718A9A]">
                  Smarter Fleet Decisions. Lower Fuel. Lower Emissions.
                </div>
              </div>
            </div>

            <div className="text-xs text-[#718A9A] text-center md:text-right">
              <div>
                AI-driven maritime fleet optimization and decision support.
              </div>

              <div className="mt-1">
                Prediction • Optimization • Simulation • Benchmarking
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
