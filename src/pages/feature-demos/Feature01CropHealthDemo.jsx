// src/pages/feature-demos/Feature01CropHealthDemo.jsx
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
} from "lucide-react";

// ✅ import the new CSS (see below)
import "./FeatureDemo.css";

const backendSources = [
  "Sentinel-2 NDVI/EVI, MODIS NDVI/EVI, Landsat-8/9 NDVI/EVI",
  "Soil-adjusted indices (SAVI, MSAVI)",
  "Weather (Open-Meteo: temperature, precipitation, humidity, wind)",
  "Terrain & elevation (Open-Elevation DEM, slope/aspect/curvature)",
  "Soil type (Copernicus Land Monitoring Service)",
  "Irrigation coverage (FAO AQUASTAT)",
  "Regional agricultural statistics (USDA Quick Stats API)",
];

export default function Feature01CropHealthDemo({ feature }) {
  const Icon = feature?.icon || Activity;
  const [results, setResults] = useState(null);

  const handleRunAnalysis = (e) => {
    e.preventDefault();

    // 🔮 Sample static output – later you can replace with real API call
    setResults({
      overallHealth: "Moderate ↗  (field-average NDVI 0.58)",
      stressSignals: [
        "Mild water stress in south-east management zone",
        "Possible nitrogen deficiency patches in central band",
      ],
      trends: [
        "NDVI increased ~8% over the last 14 days.",
        "Short-term dip after 3 days of heavy rain last week.",
        "SAVI shows stable canopy cover with slight improvement at edges.",
      ],
      zones: [
        "Zone A – High vigor (NDVI ≈ 0.72) – keep current practice.",
        "Zone B – Medium vigor (NDVI ≈ 0.55) – monitor closely.",
        "Zone C – Low vigor (NDVI ≈ 0.38) – investigate water & nutrients.",
      ],
      recommendations: [
        "Increase irrigation by 10–15% in Zone C for the next 3 irrigation cycles.",
        "Schedule targeted NPK foliar spray for Zone B & C within 3–5 days.",
        "Flag Zone C for pest scouting if leaf spots / discoloration are visible.",
      ],
      alerts: [
        "Alert: NDVI dropped −0.12 in Zone C during the last 3 days.",
        "Alert: EVI variability suggests possible disease onset in Zone B.",
      ],
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="feature-demo-container">
        {/* ===== HEADER ===== */}
        <header className="feature-demo-header">
          <Link to="/" className="fd-back-link">
            <ArrowLeft size={18} /> Back to AgroVerse
          </Link>

          <div className="feature-demo-title">
            <div
              className={`feature-demo-icon ${feature?.color || "green-emerald"}`}
            >
              <Icon size={28} />
            </div>
            <div>
              <span className="fd-category-chip">
                {feature?.category || "Field Monitoring"}
              </span>
              <h1>{feature?.title || "Crop Health Intelligence"}</h1>
              <p>
                Combine satellite vegetation indices, weather, soil, terrain and
                farmer observations to monitor crop health and stress in
                near-real time.
              </p>
            </div>
          </div>
        </header>

        {/* ===== MAIN GRID ===== */}
        <main className="feature-demo-grid">
          {/* LEFT: Field & Input configuration */}
          <section className="feature-demo-panel">
            <h3>1. Field &amp; Data Inputs</h3>

            <form className="fd-form" onSubmit={handleRunAnalysis}>
              {/* Field details */}
              <div className="fd-field-group">
                <label className="fd-label">
                  Field / Farm name
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Delta Farm – Plot 7"
                  />
                </label>

                <label className="fd-label">
                  Region
                  <div className="fd-input-row">
                    <MapPin size={16} />
                    <select className="fd-input fd-select">
                      <option>Delta – Tamil Nadu</option>
                      <option>Punjab – India</option>
                      <option>US Midwest</option>
                      <option>Custom region</option>
                    </select>
                  </div>
                </label>
              </div>

              {/* Date range */}
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Analysis from
                  <input type="date" className="fd-input" />
                </label>
                <label className="fd-label">
                  to
                  <input type="date" className="fd-input" />
                </label>
              </div>

              {/* Backend sources */}
              <div className="panel-divider" />
              <h4>Backend data sources</h4>
              <p className="fd-body">
                These are automatically fetched by the backend (no manual work
                for the farmer).
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

              {/* User inputs */}
              <div className="panel-divider" />
              <h4>User contributions</h4>

              <div className="fd-field-group">
                <label className="fd-label">
                  Field boundaries (GeoJSON, optional)
                  <input
                    type="file"
                    className="fd-input fd-file"
                    accept=".geojson,application/geo+json"
                  />
                </label>

                <label className="fd-label">
                  Field photos / observation images
                  <input
                    type="file"
                    className="fd-input fd-file"
                    accept="image/*"
                    multiple
                  />
                </label>

                <label className="fd-label">
                  Observation notes
                  <textarea
                    className="fd-textarea"
                    rows={3}
                    placeholder="e.g. Yellowing leaves in south-east corner, standing water after last rain…"
                  />
                </label>
              </div>

              <button type="submit" className="fd-run-button">
                Run Crop Health Analysis
              </button>
            </form>
          </section>

          {/* RIGHT: Outputs & architecture */}
          <section className="feature-demo-panel">
            <h3>
              <BarChart3 size={18} /> 2. Analysis Outputs
            </h3>

            {!results && (
              <div className="fd-placeholder">
                <p>
                  Configure the field on the left and click{" "}
                  <b>“Run Crop Health Analysis”</b> to see a sample result.
                </p>
              </div>
            )}

            {results && (
              <>
                {/* Overall health */}
                <div className="fd-summary-card">
                  <div className="fd-summary-header">
                    <Activity size={20} />
                    <span>Overall vegetation health</span>
                  </div>
                  <p className="fd-summary-value">
                    {results.overallHealth}
                  </p>
                  <p className="fd-summary-sub">
                    Combination of NDVI / EVI / SAVI / MSAVI over the current
                    season window.
                  </p>
                </div>

                {/* Stress detection */}
                <div className="panel-divider" />
                <h4>
                  <AlertTriangle size={16} /> Stress detection
                </h4>
                <ul className="outputs-list">
                  {results.stressSignals.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                {/* Temporal trends */}
                <div className="panel-divider" />
                <h4>Temporal crop health trends</h4>
                <ul className="outputs-list">
                  {results.trends.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>

                {/* Management zones */}
                <div className="panel-divider" />
                <h4>Management zones</h4>
                <ul className="outputs-list">
                  {results.zones.map((z, idx) => (
                    <li key={idx}>{z}</li>
                  ))}
                </ul>

                {/* Recommendations */}
                <div className="panel-divider" />
                <h4>Irrigation / fertilizer / pesticide recommendations</h4>
                <ul className="outputs-list">
                  {results.recommendations.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>

                {/* Alerts */}
                <div className="panel-divider" />
                <h4>Alerts</h4>
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
                      Printable report with annotated maps
                    </p>
                    <p className="fd-report-sub">
                      In production, this button will export a PDF with
                      vegetation maps, stress zones and recommendations.
                    </p>
                  </div>
                  <button className="fd-outline-button" type="button">
                    Download sample report
                  </button>
                </div>
              </>
            )}

            {/* Architecture section */}
            <div className="panel-divider" />
            <h3>
              <Cpu size={18} /> Under the hood (Architecture)
            </h3>
            <ul className="outputs-list">
              <li>
                <b>Multimodal Transformer (Perceiver IO)</b> fuses satellite,
                weather, soil and terrain signals.
              </li>
              <li>
                <b>GAN / Diffusion hybrid</b> generates high-resolution crop
                stress visualizations from index maps.
              </li>
              <li>
                <b>RL (MuZero)</b> learns adaptive irrigation and fertilization
                strategies per management zone.
              </li>
              <li>
                <b>Temporal forecasting (TFT + N-BEATS)</b> predicts future
                vegetation index curves.
              </li>
              <li>
                <b>Graph Neural Network (GNN)</b> models inter-field
                correlations (shared water source, soil, climate).
              </li>
              <li>
                <b>End-to-end MLOps pipeline</b> handles data ingestion,
                training, monitoring and continuous deployment.
              </li>
            </ul>

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
                <span>User GeoJSON + field photos / notes</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
