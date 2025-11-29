// src/pages/feature-demos/Feature10RiskDashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Database, Bell, BarChart3, FileText, Cloud } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "Aggregated outputs from Features 1–9",
  "Real-time weather & satellite feeds (Open-Meteo, Sentinel-2)",
  "Crop & soil maps (Copernicus)",
  "USDA Quick Stats & Open Food Facts"
];

export default function Feature10RiskDashboard({ feature }) {
  const Icon = feature?.icon || Shield;
  const [filters, setFilters] = useState({ region: "Local", severity: "All" });
  const [results, setResults] = useState({
    riskSummary: [
      { name: "Water Stress", score: 0.64 },
      { name: "Pest Outbreak", score: 0.44 },
      { name: "Market Risk", score: 0.30 },
      { name: "Climate Anomaly", score: 0.72 }
    ],
    alerts: [
      { id: 1, text: "High water stress in Zone C", severity: "High" },
      { id: 2, text: "Rising pest reports near village X", severity: "Medium" }
    ]
  });

  const handleFilterChange = (e) => setFilters({...filters, [e.target.name]: e.target.value});

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "red-orange"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Analytics & Intelligence"}</span>
              <h1>{feature?.title || "Risk & Alert Dashboard"}</h1>
              <p>Unified dashboard that aggregates risk signals (water, pest, market, climate) and issues alerts with history and actions.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Filters</h3>
            <form className="fd-form">
              <label className="fd-label">Region
                <input name="region" value={filters.region} onChange={handleFilterChange} className="fd-input" />
              </label>
              <label className="fd-label">Severity
                <select name="severity" value={filters.severity} onChange={handleFilterChange} className="fd-input">
                  <option>All</option><option>Low</option><option>Medium</option><option>High</option>
                </select>
              </label>

              <div className="panel-divider" />
              <h4>Sources</h4>
              <ul className="fd-input-list">{backendSources.map((s,i)=> <li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>)}</ul>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><Bell size={18}/> 2. Risks & Alerts</h3>

            <div className="panel-divider" />
            <h4>Risk scores</h4>
            <div className="risk-grid">
              {results.riskSummary.map((r,i)=> (
                <div key={i} className="risk-card">
                  <div className="risk-zone">{r.name}</div>
                  <div className="risk-value">{Math.round(r.score*100)}%</div>
                  <div className="risk-bar" style={{ width: `${r.score*100}%`}}/>
                </div>
              ))}
            </div>

            <div className="panel-divider" />
            <h4>Active alerts</h4>
            <ul className="outputs-list">
              {results.alerts.map(a=> <li key={a.id}><b>{a.severity}</b> — {a.text}</li>)}
            </ul>

            <div className="panel-divider" />
            <h4>Historical trends (mock)</h4>
            <p className="fd-body">Time-series charts and maps would appear here (use charting libs like Recharts / Chart.js for production).</p>

            <div className="panel-divider" />
            <div className="fd-report-row">
              <FileText size={18}/>
              <div>
                <p className="fd-report-title">Download alert summary</p>
                <p className="fd-report-sub">Export alerts, thresholds and recommended actions as PDF/CSV.</p>
              </div>
              <button className="fd-outline-button" type="button">Download sample</button>
            </div>

            <div className="panel-divider" />
            <h3><Database size={18}/> Data sources</h3>
            <div className="dataset-grid">{backendSources.map((s,i)=> <div key={i} className="dataset-item"><Cloud size={16}/><span>{s}</span></div>)}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
