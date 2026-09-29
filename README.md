# GreenFleet AI – Quantum-Inspired Green Fleet Optimization Platform

**GreenFleet AI** combines machine learning-based fuel prediction, quantum-inspired optimization, and adaptive scenario simulation to help maritime operators make data-driven decisions that balance fuel consumption, operating cost, emissions, and delivery requirements.

> **Important Disclaimer:**  
> **Quantum-Inspired Optimization running on classical computing infrastructure.**  
> GreenFleet AI uses classical mathematical formulations of Quantum-Inspired Annealing (QIA) and QUBO algorithms running on standard computing hardware. It does not require or claim to use physical quantum hardware.

---

## 🌟 Key Platform Features

1. **Adaptive Green Voyage Decision Simulator (Primary Innovation):**
   - Live multi-objective priority sliders: **Cost Priority (0–100%)**, **Emission Priority (0–100%)**, **Delivery-Time Priority (0–100%)**.
   - Instant dynamic recalculation of fuel consumption, CO₂ emissions, operating cost, travel time, and radar trade-off charts.

2. **ML Hydrodynamics Fuel Consumption Prediction:**
   - Modular Scikit-Learn service comparing **Gradient Boosting Regressor** and **Random Forest Regressor**.
   - Predicts fuel consumption based on non-linear speed³ hydrodynamic drag, cargo load, engine power, distance, fuel type, and sea margin weather factors.
   - Outputs empirical model accuracy metrics (**R²**, **MAE**, **RMSE**) and interactive **Speed vs Fuel Consumption** curves.

3. **Quantum-Inspired Voyage Fleet Optimizer:**
   - Multi-objective solver assessing candidate fleet configurations across vessel options, alternative fuel options (HFO, MGO, LNG, Methanol, Ammonia, Hydrogen), speed limits, and schedule constraints.
   - Evaluates candidate plans (Plan A, Plan B, Plan C) and highlights the **Recommended Plan According to Selected Objectives**.

4. **Explainable Recommendations Engine:**
   - Generates transparent, empirical rationale bullet points detailing cargo capacity compliance, schedule deadline satisfaction, emission reduction factors, and score alignment.

5. **Maritime CO₂ & Emissions Analytics:**
   - IMO CII intensity ratings, total GHG metric tons, fuel-type emission breakdown, and side-by-side comparison of **Conventional Plan vs. Quantum-Optimized Plan** (showing calculated **19.8% CO₂ reduction**).

6. **SIH Benchmarking Suite:**
   - Comparative benchmark comparing **Conventional MILP / Heuristic Optimization** vs. **Quantum-Inspired Annealing**.
   - Side-by-side execution time, solution quality score, iterations to convergence, and scalability metrics.

7. **Executive Report Generator:**
   - Generates formal voyage optimization reports with structured PDF export and print layouts.

---

## 🛠️ Technology Stack

- **Frontend:** React.js 18, Vite, Tailwind CSS, React Router v6, Recharts, Lucide React icons.
- **Backend:** Python 3.10+, FastAPI, REST APIs, Pydantic v2, SQLAlchemy.
- **Machine Learning:** Pandas, NumPy, Scikit-learn (Gradient Boosting & Random Forest Regressors).
- **Optimization:** Classical Quantum-Inspired Annealing (QIA) & QUBO formulation in Python.
- **Database:** PostgreSQL (with SQLite zero-dependency local fallback).

---

## 🚀 How to Run the Application

### 1. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python run.py
```
*The FastAPI backend will start on `http://localhost:8000`. Documentation will be live at `http://localhost:8000/docs`.*

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*The React UI will start on `http://localhost:5173`.*

---

## 📁 Project Directory Structure

```
SIHA/
├── backend/
│   ├── app/
│   │   ├── api/             # REST API routers (vessels, predictions, optimization, simulator, benchmarking, emissions, reports, dashboard)
│   │   ├── ml/              # Dataset generator & Scikit-learn Fuel Model training service
│   │   ├── optimization/    # Quantum-inspired annealing QUBO solver & Conventional benchmark solver
│   │   ├── config.py        # Settings
│   │   ├── database.py      # SQLAlchemy setup
│   │   ├── models.py        # Database ORM models
│   │   ├── schemas.py       # Pydantic schemas
│   │   └── main.py          # FastAPI application entrypoint
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, Footer, DemoBadge, TradeoffRadarChart, ExplainableRecommendation
│   │   ├── pages/           # LandingPage, DashboardPage, FleetPage, FuelPredictionPage, VoyageOptimizerPage, SimulatorPage, EmissionsPage, BenchmarkingPage, ReportsPage, SettingsPage
│   │   ├── services/        # REST API service layer with intelligent offline fallback
│   │   ├── App.jsx          # React Router setup
│   │   └── index.css        # Tailwind styling & dark theme
│   ├── package.json
│   └── vite.config.js
└── start.py
```

---

## 🏆 SIH Final Presentation Summary Message

> **“GreenFleet AI combines machine learning-based fuel prediction, quantum-inspired optimization and adaptive scenario simulation to help maritime operators make data-driven decisions that balance fuel consumption, operating cost, emissions and delivery requirements.”**
