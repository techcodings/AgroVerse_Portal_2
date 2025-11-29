// src/pages/feature-demos/Feature05Demo.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Cloud,
  Activity,
  AlertTriangle,
  BarChart3,
  Cpu,
  Database,
  FileText,
  Thermometer,
  Zap,
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "Historical & real-time weather (Open-Meteo)",
  "NDVI / EVI (Sentinel-2, MODIS)",
  "Soil & terrain (Copernicus)",
  "NewsAPI / FAO bulletins",
  "Historical crop patterns (EuroCropsML)",
  "Climate indices (SPI, SPEI)",
  "Extreme events datasets (NASA FIRMS / global flood datasets)",
];

export default function Feature05Demo({ feature }) {
  const Icon = feature?.icon || Globe;
  const [results, setResults] = useState(null);

  const handleRunAnalysis = (e) => {
    e.preventDefault();

    // Static demo results — replace with real API/backend call later
    setResults({
      summary:
        "Detected multiple climate anomalies in the last 90 days: localized drought + heatwave windows. Predicted near-term increased drought risk for next 10–14 days.",
      anomalies: [
        "Drought anomaly detected (SPI −1.6) in northern sector over last 60 days.",
        "Heatwave window detected: 4 consecutive days > 38°C affecting maize flowering stage.",
        "Flash flood report (local) overlapped with NDVI drop in downstream fields.",
      ],
      impacts: [
        "Estimated yield impact: −8% for maize fields in Zone 2 under current trajectory.",
        "Vegetative vigor decline (NDVI ~ −0.09) in fields with sandy soils.",
      ],
      trendSeries: [
        "SPI: steady decline from +0.2 → −1.4 over 90 days.",
        "NDVI: 30-day smoothed NDVI fell by ~7% in affected fields.",
        "Temperature: night-time minima rose ~1.4°C vs long-term average.",
      ],
      riskScores: {
        zone1: 0.32, // lower is better — example
        zone2: 0.78,
        zone3: 0.55,
      },
      predictiveAlerts: [
        "High chance (65%) of short-term drought continuation in Zone 2 within 14 days.",
        "Moderate risk (40%) of heat stress during flowering window next 10 days — consider irrigation & shading.",
      ],
      recommendations: [
        "Prioritise irrigation for Zone 2 during critical growth windows; consider partial deficit irrigation to conserve water while protecting yield.",
        "Deploy shade nets or mulching for high-value vegetable plots to reduce heat stress impact on flowers.",
        "Prepare contingency for seed/variety switch in next season if drought persists (>30% probability).",
      ],
      reportNote:
        "Downloadable report will include time series charts (SPI/SPEI), anomaly maps, NDVI change maps and suggested interventions.",
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        {/* HEADER */}
        <header className="feature-demo-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to AgroVerse
          </Link>

          <div className="feature-demo-title">
            <div
              className={`feature-demo-icon ${feature?.color || "blue-indigo"}`}
            >
              <Icon size={28} />
            </div>
            <div>
              <span className="modal-category">
                {feature?.category || "Analytics & Intelligence"}
              </span>
              <h1>{feature?.title || "Climate Impact & Anomaly Detector"}</h1>
              <p>
                Detect and quantify climate anomalies (droughts, floods, heatwaves),
                estimate impacts on crops, and produce early warnings and risk scores.
              </p>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="feature-demo-content feature-demo-grid">
          {/* LEFT: Inputs */}
          <section className="feature-demo-panel">
            <h3>1. Location & Input Data</h3>

            <form className="fd-form" onSubmit={handleRunAnalysis}>
              <div className="fd-field-group">
                <label className="fd-label">
                  Project / Farm name
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Coastal Resilience Pilot"
                  />
                </label>

                <label className="fd-label">
                  Region
                  <div className="fd-input-row">
                    <Globe size={16} />
                    <select className="fd-input">
                      <option>Delta – Tamil Nadu</option>
                      <option>Punjab – India</option>
                      <option>US Midwest</option>
                      <option>Custom region</option>
                    </select>
                  </div>
                </label>
              </div>

              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Analysis window from
                  <input type="date" className="fd-input" />
                </label>
                <label className="fd-label">
                  to
                  <input type="date" className="fd-input" />
                </label>
              </div>

              <div className="panel-divider" />
              <h4>Backend data sources</h4>
              <p className="fd-body">These feeds are fetched by the backend automatically.</p>
              <ul className="fd-input-list">
                {backendSources.map((s, i) => (
                  <li key={i}>
                    <label className="fd-input-item">
                      <input type="checkbox" defaultChecked />
                      <span>{s}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="panel-divider" />
              <h4>User observations</h4>
              <label className="fd-label">
                Local extreme event notes (optional)
                <textarea
                  className="fd-textarea"
                  rows={3}
                  placeholder="e.g. Flooding observed on 2025-07-10 near canal; crop lodging observed…"
                />
              </label>

              <label className="fd-label">
                Upload local reports / photos (optional)
                <input type="file" className="fd-input" accept="image/*,.pdf" multiple />
              </label>

              <button type="submit" className="fd-run-button">
                <Zap size={18} /> Run Climate Anomaly Detection
              </button>
            </form>
          </section>

          {/* RIGHT: Outputs */}
          <section className="feature-demo-panel">
            <h3>
              <BarChart3 size={18} /> 2. Analysis Outputs
            </h3>

            {!results && (
              <div className="fd-placeholder">
                <p>
                  Fill the inputs on the left and click <b>“Run Climate Anomaly Detection”</b> to
                  get anomaly maps, risk scores and downloadable reports.
                </p>
              </div>
            )}

            {results && (
              <>
                {/* Summary */}
                <div className="fd-summary-card">
                  <div className="fd-summary-header">
                    <Thermometer size={20} />
                    <span>Climate anomaly summary</span>
                  </div>
                  <p className="fd-summary-value">{results.summary}</p>
                  <p className="fd-summary-sub">{results.reportNote}</p>
                </div>

                {/* Anomalies */}
                <div className="panel-divider" />
                <h4><AlertTriangle size={16} /> Detected anomalies</h4>
                <ul className="outputs-list">
                  {results.anomalies.map((a, idx) => <li key={idx}>{a}</li>)}
                </ul>

                {/* Impacts */}
                <div className="panel-divider" />
                <h4>Impact assessment on crops</h4>
                <ul className="outputs-list">
                  {results.impacts.map((i, idx) => <li key={idx}>{i}</li>)}
                </ul>

                {/* Trends */}
                <div className="panel-divider" />
                <h4>Trend analysis (time-series)</h4>
                <ul className="outputs-list">
                  {results.trendSeries.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>

                {/* Risk scores */}
                <div className="panel-divider" />
                <h4>Localized climate risk scores (0—1)</h4>
                <div className="risk-grid">
                  {Object.entries(results.riskScores).map(([zone, val]) => (
                    <div key={zone} className="risk-card">
                      <div className="risk-zone">{zone.toUpperCase()}</div>
                      <div className="risk-value">{(val * 100).toFixed(0)}%</div>
                      <div className="risk-bar" style={{ width: `${val * 100}%` }} />
                    </div>
                  ))}
                </div>

                {/* Predictive alerts */}
                <div className="panel-divider" />
                <h4>Predictive alerts</h4>
                <ul className="outputs-list">
                  {results.predictiveAlerts.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>

                {/* Recommendations */}
                <div className="panel-divider" />
                <h4>Recommended actions</h4>
                <ul className="outputs-list">
                  {results.recommendations.map((r, idx) => <li key={idx}>{r}</li>)}
                </ul>

                {/* Downloadable report */}
                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18} />
                  <div>
                    <p className="fd-report-title">Downloadable climate impact report</p>
                    <p className="fd-report-sub">
                      PDF includes SPI/SPEI charts, NDVI anomaly maps, impact estimates and recommended interventions.
                    </p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample report</button>
                </div>
              </>
            )}

            {/* Architecture */}
            <div className="panel-divider" />
            <h3><Cpu size={18} /> Under the hood (Architecture)</h3>
            <ul className="outputs-list">
              <li><b>RL (ConnectX / MuZero)</b> simulates adaptive strategies and interventions.</li>
              <li><b>Multimodal Transformer</b> fuses satellite, weather, soil, bulletin and user reports.</li>
              <li><b>Temporal Forecasting (TFT + Informer)</b> predicts anomaly trajectories.</li>
              <li><b>Bayesian ensembles</b> provide uncertainty-aware risk estimates.</li>
              <li><b>End-to-end MLOps</b> manages data, retraining and alerting pipelines.</li>
            </ul>

            {/* Data sources */}
            <div className="panel-divider" />
            <h3><Database size={18} /> Data sources used</h3>
            <div className="dataset-grid">
              {backendSources.map((src, idx) => (
                <div key={idx} className="dataset-item">
                  <Cloud size={16} />
                  <span>{src}</span>
                </div>
              ))}
              <div className="dataset-item">
                <Cloud size={16} />
                <span>User local observations / reports</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
