// src/pages/feature-demos/Feature16ExtremeEvents.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, FileText, Database, Cloud, BarChart3 } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = ["Historical climate events", "NDVI/EVI time series", "SPI/SPEI indices"];

export default function Feature16ExtremeEvents({ feature }) {
  const Icon = feature?.icon || AlertTriangle;
  const [params, setParams] = useState({ scenario: "Drought", region: "Local" });
  const [results, setResults] = useState(null);

  const simulate = (e) => {
    e.preventDefault();
    setResults({
      impact: "Estimated 18% yield loss in worst-case drought scenario",
      recommendedActions: ["Temporary irrigation prioritization for Zone B", "Emergency seed reserves: 500kg"],
      riskMapSummary: ["Zone C: High risk", "Zone B: Medium risk"]
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "rose-pink"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Forecasting & Simulation"}</span>
              <h1>{feature?.title || "Extreme Event Simulation & Adaptation Planner"}</h1>
              <p>Simulate floods/droughts/heatwaves and get adaptation plans and emergency actions for fields.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Scenario</h3>
            <form className="fd-form" onSubmit={simulate}>
              <label className="fd-label">Scenario
                <select className="fd-input" value={params.scenario} onChange={(e)=>setParams({...params, scenario: e.target.value})}>
                  <option>Drought</option><option>Flood</option><option>Heatwave</option>
                </select>
              </label>

              <label className="fd-label">Region
                <input className="fd-input" value={params.region} onChange={(e)=>setParams({...params, region: e.target.value})}/>
              </label>

              <div className="panel-divider"/>
              <ul className="fd-input-list">{backendSources.map((s,i)=>(<li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>))}</ul>

              <button className="fd-run-button" type="submit"><BarChart3 size={14}/> Run Simulation</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><FileText size={18}/> 2. Simulation results</h3>

            {!results && <div className="fd-placeholder"><p>Run scenario to view impact estimate, adaptation steps and risk maps.</p></div>}

            {results && (
              <>
                <div className="fd-summary-card">
                  <div className="fd-summary-header"><AlertTriangle size={20}/><span>Estimated impact</span></div>
                  <p className="fd-summary-value">{results.impact}</p>
                </div>

                <div className="panel-divider"/>
                <h4>Recommended emergency actions</h4>
                <ul className="outputs-list">{results.recommendedActions.map((r,i)=>(<li key={i}>{r}</li>))}</ul>

                <div className="panel-divider"/>
                <h4>Risk map summary</h4>
                <ul className="outputs-list">{results.riskMapSummary.map((r,i)=>(<li key={i}>{r}</li>))}</ul>

                <div className="panel-divider"/>
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Export adaptation plan</p>
                    <p className="fd-report-sub">Printable emergency plan with priority actions and contact list for authorities.</p>
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
