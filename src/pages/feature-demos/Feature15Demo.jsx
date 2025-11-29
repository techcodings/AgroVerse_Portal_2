// src/pages/feature-demos/Feature15EcoImpact.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, FileText, Database, Cloud, BarChart3 } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = ["NDVI/LAI", "Soil maps", "Weather", "User water/pesticide usage"];

export default function Feature15EcoImpact({ feature }) {
  const Icon = feature?.icon || Leaf;
  const [params, setParams] = useState({ region: "Local", timeframe: "12 months" });
  const [results, setResults] = useState(null);

  const run = (e) => {
    e.preventDefault();
    setResults({
      footprint: { water: "1200 m³/ha", carbon: "0.9 tCO₂e/ha" },
      score: "B (65/100)",
      recommendations: ["Reduce N fertilizer by 15%", "Switch to drip irrigation in Zone C"]
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "green-dark"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Field Monitoring"}</span>
              <h1>{feature?.title || "Eco-Impact & Sustainability Analyzer"}</h1>
              <p>Estimate environmental footprint, sustainability score and get eco-friendly recommendations.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Inputs</h3>
            <form className="fd-form" onSubmit={run}>
              <label className="fd-label">Region
                <input className="fd-input" value={params.region} onChange={(e)=>setParams({...params, region: e.target.value})}/>
              </label>

              <label className="fd-label">Timeframe
                <select className="fd-input" value={params.timeframe} onChange={(e)=>setParams({...params, timeframe: e.target.value})}>
                  <option>3 months</option><option>12 months</option><option>24 months</option>
                </select>
              </label>

              <div className="panel-divider"/>
              <ul className="fd-input-list">{backendSources.map((s,i)=>(<li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>))}</ul>

              <button className="fd-run-button" type="submit"><BarChart3 size={14}/> Compute Eco-Impact</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><FileText size={18}/> 2. Results</h3>
            {!results && <div className="fd-placeholder"><p>Run to compute footprint, sustainability score and actionable recommendations.</p></div>}

            {results && (
              <>
                <div className="fd-summary-card">
                  <div className="fd-summary-header"><Leaf size={20}/><span>Footprint & Score</span></div>
                  <p className="fd-summary-value">Water: {results.footprint.water} • Carbon: {results.footprint.carbon}</p>
                  <p className="fd-summary-sub">Sustainability score: {results.score}</p>
                </div>

                <div className="panel-divider"/>
                <h4>Recommendations</h4>
                <ul className="outputs-list">{results.recommendations.map((r,i)=>(<li key={i}>{r}</li>))}</ul>

                <div className="panel-divider"/>
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Download eco-impact report</p>
                    <p className="fd-report-sub">Includes footprint breakdown, trends and suggested actions.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample</button>
                </div>
              </>
            )}

            <div className="panel-divider"/>
            <h3><Database size={18}/> Data sources</h3>
            <div className="dataset-grid">{backendSources.map((s,i)=>(<div key={i} className="dataset-item"><Cloud size={16}/><span>{s}</span></div>))}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
