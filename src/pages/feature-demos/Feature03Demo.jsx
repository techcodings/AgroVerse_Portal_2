// src/pages/feature-demos/Feature03Demo.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Cloud,
  Activity,
  BarChart3,
  Cpu,
  Database,
  FileText,
  Layers,
  RefreshCw,
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "Historical NDVI / EVI (Sentinel / Landsat / MODIS)",
  "Landsat-8/9 NDVI time series",
  "MODIS NDVI / EVI time series",
  "Weather forecast (Open-Meteo)",
  "Terrain + soil (Copernicus – DEM, soil type, slope)",
  "Crop rotation / planting schedule datasets",
  "Ag Data Commons crop + management datasets",
];

export default function Feature03Demo({ feature }) {
  const Icon = feature?.icon || Layers;
  const [results, setResults] = useState(null);

  const handleRunSimulation = (e) => {
    e.preventDefault();

    // 🔮 Static demo output – replace with real API later
    setResults({
      overallScenario:
        "Baseline + Optimized rotation – expected yield ↑ 12% over 3 seasons",
      scenarios: [
        "Scenario A – Baseline climate, current rotation: stable yields but soil organic matter slowly declining.",
        "Scenario B – Introduce legumes every 3rd season: yield slightly higher with improved soil health.",
        "Scenario C – High-value maize + pulse rotation, optimized by MuZero: best margin with acceptable risk.",
      ],
      growthStages: [
        "Kharif season: simulated emergence at day 6–8, canopy closure by day 32–36.",
        "Rabi season: slower early growth but better biomass accumulation from day 45 onwards.",
        "Stress test: delayed monsoon shifts growth curve right by ~10–14 days with minor yield penalty.",
      ],
      rotations: [
        "Year 1: Maize → Mustard → Fallow cover crop.",
        "Year 2: Maize → Chickpea → Green manure.",
        "Year 3: Maize → Lentil → Short-duration vegetable.",
      ],
      suggestions: [
        "Prefer maize–pulse–cover crop rotations on light soils to stabilize yields and improve nitrogen.",
        "Avoid back-to-back cereal rotations on fields with low organic carbon.",
        "Use legumes in at least one season out of three for long-term soil fertility.",
      ],
      schedule: [
        "Optimal maize sowing window: 10–18 June for this region.",
        "Legume sowing window: 25 October – 5 November.",
        "Plan land prep and input purchase 2–3 weeks before each sowing window.",
      ],
      alerts: [
        "What-if: Under a 1.5 °C warmer scenario, Scenario B is more resilient than Scenario A.",
        "What-if: If Kharif rainfall is −20%, shift to drought-tolerant variety + earlier sowing by ~7 days.",
      ],
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        {/* ===== HEADER ===== */}
        <header className="feature-demo-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to AgroVerse
          </Link>

          <div className="feature-demo-title">
            <div
              className={`feature-demo-icon ${feature?.color || "blue-cyan"}`}
            >
              <Icon size={28} />
            </div>
            <div>
              <span className="modal-category">
                {feature?.category || "Forecasting & Simulation"}
              </span>
              <h1>{feature?.title || "Generative Future Crop Visualization"}</h1>
              <p>
                Simulate future crop growth, rotations and what-if scenarios
                using historical NDVI/EVI, weather forecasts and soil/terrain
                data. Explore multi-season plans before taking real-world
                decisions.
              </p>
            </div>
          </div>
        </header>

        {/* ===== MAIN GRID ===== */}
        <main className="feature-demo-content feature-demo-grid">
          {/* LEFT: configuration */}
          <section className="feature-demo-panel">
            <h3>1. Scenario & Data Inputs</h3>

            <form className="fd-form" onSubmit={handleRunSimulation}>
              {/* Field + region */}
              <div className="fd-field-group">
                <label className="fd-label">
                  Farm / Project name
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Sunrise Agro – Rotation Pilot"
                  />
                </label>

                <label className="fd-label">
                  Region
                  <div className="fd-input-row">
                    <MapPin size={16} />
                    <select className="fd-input">
                      <option>Delta – Tamil Nadu</option>
                      <option>Punjab – India</option>
                      <option>US Midwest</option>
                      <option>Custom region</option>
                    </select>
                  </div>
                </label>
              </div>

              {/* Horizon + time window */}
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Simulation horizon (years)
                  <select className="fd-input">
                    <option>1 year</option>
                    <option>2 years</option>
                    <option>3 years</option>
                    <option>5 years</option>
                  </select>
                </label>
                <label className="fd-label">
                  Starting season
                  <select className="fd-input">
                    <option>Kharif</option>
                    <option>Rabi</option>
                    <option>Summer</option>
                  </select>
                </label>
              </div>

              {/* Crop rotation plan */}
              <div className="panel-divider" />
              <h4>User crop rotation plan</h4>
              <p className="fd-body">
                Define your intended crop sequence. The simulator will compare
                this with AI-optimized alternatives.
              </p>

              <div className="fd-field-group">
                <label className="fd-label">
                  Year 1 rotation
                  <input
                    className="fd-input"
                    type="text"
                    placeholder="e.g. Maize → Wheat → Fallow"
                  />
                </label>
                <label className="fd-label">
                  Year 2 rotation
                  <input
                    className="fd-input"
                    type="text"
                    placeholder="e.g. Maize → Chickpea → Green manure"
                  />
                </label>
                <label className="fd-label">
                  Year 3 rotation (optional)
                  <input
                    className="fd-input"
                    type="text"
                    placeholder="e.g. Maize → Lentil → Vegetable"
                  />
                </label>
              </div>

              {/* Backend sources checklist */}
              <div className="panel-divider" />
              <h4>Backend data sources</h4>
              <p className="fd-body">
                These feeds are pulled automatically by the backend – no manual
                upload required.
              </p>

              <ul className="fd-input-list">
                {backendSources.map((src, idx) => (
                  <li key={idx}>
                    <label className="fd-input-item">
                      <input type="checkbox" defaultChecked />
                      <span>{src}</span>
                    </label>
                  </li>
                ))}
              </ul>

              {/* Notes */}
              <div className="panel-divider" />
              <h4>Notes / constraints</h4>
              <label className="fd-label">
                Optional planning notes
                <textarea
                  className="fd-textarea"
                  rows={3}
                  placeholder="e.g. Prefer low-water crops in Year 2, avoid continuous maize on Field 3…"
                />
              </label>

              <button type="submit" className="fd-run-button">
                <RefreshCw size={18} /> Run Rotation Simulation
              </button>
            </form>
          </section>

          {/* RIGHT: outputs & architecture */}
          <section className="feature-demo-panel">
            <h3>
              <BarChart3 size={18} /> 2. Simulation Outputs
            </h3>

            {!results && (
              <div className="fd-placeholder">
                <p>
                  Configure the scenario on the left and click{" "}
                  <b>“Run Rotation Simulation”</b> to view a sample multi-year
                  plan, growth curves and crop suggestions.
                </p>
              </div>
            )}

            {results && (
              <>
                {/* Overall summary */}
                <div className="fd-summary-card">
                  <div className="fd-summary-header">
                    <Activity size={20} />
                    <span>Simulation summary</span>
                  </div>
                  <p className="fd-summary-value">
                    {results.overallScenario}
                  </p>
                  <p className="fd-summary-sub">
                    Generated using historical NDVI/EVI + forecasted weather
                    under your rotation plan and AI-optimized variants.
                  </p>
                </div>

                {/* Scenario descriptions */}
                <div className="panel-divider" />
                <h4>Multi-season crop rotation simulations</h4>
                <ul className="outputs-list">
                  {results.scenarios.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                {/* Growth stage predictions */}
                <div className="panel-divider" />
                <h4>Growth stage predictions</h4>
                <ul className="outputs-list">
                  {results.growthStages.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>

                {/* AI-optimized rotation plan */}
                <div className="panel-divider" />
                <h4>AI-recommended rotation (MuZero-optimized)</h4>
                <ul className="outputs-list">
                  {results.rotations.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>

                {/* Suggestions & schedule */}
                <div className="panel-divider" />
                <h4>Crop selection suggestions</h4>
                <ul className="outputs-list">
                  {results.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                <div className="panel-divider" />
                <h4>Recommended planting schedule</h4>
                <ul className="outputs-list">
                  {results.schedule.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                {/* What-if alerts */}
                <div className="panel-divider" />
                <h4>“What-if” scenario highlights</h4>
                <ul className="outputs-list">
                  {results.alerts.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>

                {/* Printable report placeholder */}
                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18} />
                  <div>
                    <p className="fd-report-title">
                      Printable scenario report & simulated imagery
                    </p>
                    <p className="fd-report-sub">
                      In production, this will export a PDF with simulated NDVI
                      maps, rotation timelines and recommended plans for each
                      field.
                    </p>
                  </div>
                  <button className="fd-outline-button" type="button">
                    Download sample report
                  </button>
                </div>
              </>
            )}

            {/* Architecture */}
            <div className="panel-divider" />
            <h3>
              <Cpu size={18} /> Under the hood (Architecture)
            </h3>
            <ul className="outputs-list">
              <li>
                <b>One-Shot GAN / Diffusion hybrid</b> generates future crop
                growth imagery and field-level vegetation maps.
              </li>
              <li>
                <b>RL (MuZero)</b> searches over crop sequences and suggests
                optimized multi-year rotations balancing yield, risk and soil
                health.
              </li>
              <li>
                <b>Temporal forecasting (TFT + Informer)</b> predicts NDVI/EVI
                curves under different climate and management scenarios.
              </li>
              <li>
                <b>End-to-end MLOps pipeline</b> orchestrates data ingestion,
                model training, simulation runs and monitoring.
              </li>
            </ul>

            {/* Data sources */}
            <div className="panel-divider" />
            <h3>
              <Database size={18} /> Data sources used
            </h3>
            <div className="dataset-grid">
              {backendSources.map((src, idx) => (
                <div key={idx} className="dataset-item">
                  <Cloud size={16} />
                  <span>{src}</span>
                </div>
              ))}
              <div className="dataset-item">
                <Cloud size={16} />
                <span>User crop rotation plan / planting schedule</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
