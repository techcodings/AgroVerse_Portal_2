// src/pages/feature-demos/Feature04Demo.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Cloud,
  Activity,
  AlertTriangle,
  BarChart3,
  Cpu,
  Database,
  FileText,
  Droplets,
  DollarSign,
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "NDVI & soil moisture (Copernicus, SMAP / ESA CCI)",
  "Rainfall & humidity (Open-Meteo)",
  "Terrain slope / aspect (Open-Elevation DEM)",
  "Crop type maps (Copernicus)",
  "Irrigation cost data (USDA ARMS)",
  "Evapotranspiration (ETa) maps from MODIS",
];

export default function Feature04Demo({ feature }) {
  const Icon = feature?.icon || Droplets;
  const [results, setResults] = useState(null);

  const handleRunPlanning = (e) => {
    e.preventDefault();

    // 🔮 Sample static output – replace with real backend later
    setResults({
      status: "Moderate water stress in 2 of 5 zones – targeted irrigation recommended.",
      moistureMaps: [
        "Zone A – Soil moisture ~32% (healthy range).",
        "Zone B – Soil moisture ~18% (approaching deficit).",
        "Zone C – Soil moisture ~14% (high stress, shallow groundwater).",
      ],
      stressLevels: [
        "Rice fields on lighter soils show earlier water stress than fields with clay content > 40%.",
        "South-facing slope loses ~12–15% more water via ETa compared with north-facing slope.",
      ],
      schedule: [
        "Apply 35 mm irrigation to Zone C within the next 24–36 hours.",
        "Apply 20 mm irrigation to Zone B within the next 48 hours.",
        "Skip irrigation for Zone A for at least 4–5 days (sufficient moisture).",
      ],
      cost: [
        "Recommended plan uses ~22% less water than blanket irrigation while keeping yield loss risk < 5%.",
        "Estimated pumping cost: ₹ 7,800 vs ₹ 10,000 for uniform irrigation.",
      ],
      alerts: [
        "Rainfall deficit of −28% vs seasonal norm detected for the last 30 days.",
        "Groundwater depth trend: falling ~0.4 m compared to same period last year.",
      ],
      recommendations: [
        "Switch Zone C from continuous flooding to alternate wetting and drying (AWD) method.",
        "Align irrigation events with cooler evening / night hours to reduce evaporation losses.",
        "Consider micro-irrigation (drip / sprinkler) for high-value plots on sloping terrain.",
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
              className={`feature-demo-icon ${
                feature?.color || "yellow-orange"
              }`}
            >
              <Icon size={28} />
            </div>
            <div>
              <span className="modal-category">
                {feature?.category || "Field Monitoring"}
              </span>
              <h1>{feature?.title || "Water Stress & Irrigation Advisor"}</h1>
              <p>
                Combine soil moisture, rainfall, ETa and terrain information to
                detect water stress early and generate optimized, cost-aware
                irrigation plans for each management zone.
              </p>
            </div>
          </div>
        </header>

        {/* ===== MAIN GRID ===== */}
        <main className="feature-demo-content feature-demo-grid">
          {/* LEFT PANEL – Inputs */}
          <section className="feature-demo-panel">
            <h3>1. Field & Water Inputs</h3>

            <form className="fd-form" onSubmit={handleRunPlanning}>
              <div className="fd-field-group">
                <label className="fd-label">
                  Field / Farm name
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Riverbend Farm – Block C"
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

              {/* Crop + irrigation method */}
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Main crop
                  <select className="fd-input">
                    <option>Paddy / Rice</option>
                    <option>Wheat</option>
                    <option>Maize</option>
                    <option>Cotton</option>
                    <option>Pulses / Legumes</option>
                    <option>Vegetables</option>
                  </select>
                </label>
                <label className="fd-label">
                  Irrigation type / method
                  <select className="fd-input">
                    <option>Canal / flood</option>
                    <option>Borewell – flood</option>
                    <option>Drip irrigation</option>
                    <option>Sprinkler</option>
                    <option>Rainfed (supplemental)</option>
                  </select>
                </label>
              </div>

              {/* Groundwater + field conditions */}
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Groundwater table depth (m)
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="fd-input"
                    placeholder="e.g. 7.5"
                  />
                </label>
                <label className="fd-label">
                  Number of management zones
                  <select className="fd-input">
                    <option>1 zone</option>
                    <option>3 zones</option>
                    <option>5 zones</option>
                    <option>7 zones</option>
                  </select>
                </label>
              </div>

              <div className="panel-divider" />
              <h4>Field conditions</h4>
              <label className="fd-label">
                Current field observations
                <textarea
                  className="fd-textarea"
                  rows={3}
                  placeholder="e.g. Cracks on soil surface, leaf rolling in afternoon, standing water in low-lying corner…"
                />
              </label>

              {/* Backend sources checklist */}
              <div className="panel-divider" />
              <h4>Backend data sources</h4>
              <p className="fd-body">
                These are automatically fetched by the backend – no manual work
                for the farmer.
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

              {/* Cost preferences */}
              <div className="panel-divider" />
              <h4>Cost & strategy preferences</h4>
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Cost priority
                  <select className="fd-input">
                    <option>Balance yield & cost</option>
                    <option>Minimize water use</option>
                    <option>Maximize yield</option>
                  </select>
                </label>
                <label className="fd-label">
                  Max irrigations per week
                  <select className="fd-input">
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>No limit</option>
                  </select>
                </label>
              </div>

              <button type="submit" className="fd-run-button">
                <Droplets size={18} /> Run Water Stress Planning
              </button>
            </form>
          </section>

          {/* RIGHT PANEL – Outputs */}
          <section className="feature-demo-panel">
            <h3>
              <BarChart3 size={18} /> 2. Analysis Outputs
            </h3>

            {!results && (
              <div className="fd-placeholder">
                <p>
                  Fill the field & water details on the left and click{" "}
                  <b>“Run Water Stress Planning”</b> to view a sample moisture
                  map, irrigation schedule and cost analysis.
                </p>
              </div>
            )}

            {results && (
              <>
                {/* Overall status */}
                <div className="fd-summary-card">
                  <div className="fd-summary-header">
                    <Activity size={20} />
                    <span>Current water status</span>
                  </div>
                  <p className="fd-summary-value">{results.status}</p>
                  <p className="fd-summary-sub">
                    Derived from NDVI, soil moisture, ETa and terrain-aware
                    water balance models.
                  </p>
                </div>

                {/* Soil moisture maps */}
                <div className="panel-divider" />
                <h4>Soil moisture & management zones</h4>
                <ul className="outputs-list">
                  {results.moistureMaps.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>

                {/* Stress levels */}
                <div className="panel-divider" />
                <h4>Water stress levels per field / crop</h4>
                <ul className="outputs-list">
                  {results.stressLevels.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                {/* Irrigation schedule */}
                <div className="panel-divider" />
                <h4>Irrigation scheduling & optimization</h4>
                <ul className="outputs-list">
                  {results.schedule.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                {/* Cost-benefit */}
                <div className="panel-divider" />
                <h4>
                  <DollarSign size={16} /> Cost–benefit analysis
                </h4>
                <ul className="outputs-list">
                  {results.cost.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>

                {/* Alerts */}
                <div className="panel-divider" />
                <h4>
                  <AlertTriangle size={16} /> Rainfall deficit & groundwater
                  alerts
                </h4>
                <ul className="outputs-list">
                  {results.alerts.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>

                {/* Recommended methods */}
                <div className="panel-divider" />
                <h4>Recommended irrigation methods</h4>
                <ul className="outputs-list">
                  {results.recommendations.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>

                {/* Report placeholder */}
                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18} />
                  <div>
                    <p className="fd-report-title">
                      Printable irrigation plan & maps
                    </p>
                    <p className="fd-report-sub">
                      In production, this will export a PDF with soil moisture
                      maps, ETa layers, irrigation schedule and cost summary for
                      each management zone.
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
                <b>RL (MuZero)</b> optimizes irrigation timing and depth for
                each management zone under cost and water constraints.
              </li>
              <li>
                <b>Multimodal Transformer</b> fuses NDVI, soil moisture, ETa,
                rainfall, terrain and crop-type signals.
              </li>
              <li>
                <b>PINN (Physics-Informed Neural Network)</b> models subsurface
                water movement and crop water uptake while respecting physical
                constraints.
              </li>
              <li>
                <b>Temporal forecasting (TFT + Neural ODEs)</b> predicts future
                soil moisture and ETa trajectories under different irrigation
                and rainfall scenarios.
              </li>
              <li>
                <b>End-to-end MLOps pipeline</b> handles data ingestion,
                retraining, deployment and monitoring of irrigation policies.
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
                <span>Groundwater depth, field conditions & irrigation type</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
