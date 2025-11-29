// src/pages/feature-demos/Feature07MarketSimulator.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, TrendingUp, Cloud, BarChart3, Database, FileText, Globe, Search
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "Weather & NDVI changes (Open-Meteo, Sentinel-2)",
  "Crop growth simulations (Feature 3 outputs)",
  "FAO market & policy reports",
  "NewsAPI (free tier)",
  "Open Food Facts API",
  "Commodity price APIs (World Bank, FAO GIEWS)",
  "Subsidy / government scheme data"
];

export default function Feature07MarketSimulator({ feature }) {
  const Icon = feature?.icon || TrendingUp;
  const [results, setResults] = useState(null);
  const [params, setParams] = useState({ crop: "Maize", region: "Local", months: 6 });

  const handleChange = (e) => setParams({ ...params, [e.target.name]: e.target.value });

  const handleRunSim = (e) => {
    e.preventDefault();
    // Mock output
    setResults({
      priceForecast: [
        { month: "M1", price: 200 },
        { month: "M2", price: 210 },
        { month: "M3", price: 195 },
        { month: "M4", price: 220 },
        { month: "M5", price: 230 },
        { month: "M6", price: 225 }
      ],
      scenarios: [
        { name: "Baseline", probability: 0.5, impact: "Stable prices" },
        { name: "Drought", probability: 0.2, impact: "Prices +12%" },
        { name: "Policy subsidy", probability: 0.15, impact: "Prices −8%" },
      ],
      recommendations: [
        "Delay storage for 2 months to capture peak price in M5.",
        "If subsidy announced, prioritise sale immediately to avoid price slump."
      ],
      alerts: ["Alert: Local market price 6% below regional benchmark today."]
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18} /> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "indigo-purple"}`}><Icon size={28} /></div>
            <div>
              <span className="modal-category">{feature?.category || "Forecasting & Simulation"}</span>
              <h1>{feature?.title || "Market & Policy Trend Simulator"}</h1>
              <p>Simulate market & policy impacts, forecast local & global crop prices and explore scenario outcomes.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Simulation inputs</h3>
            <form className="fd-form" onSubmit={handleRunSim}>
              <label className="fd-label">
                Crop
                <select name="crop" value={params.crop} onChange={handleChange} className="fd-input">
                  <option>Maize</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Vegetables</option>
                </select>
              </label>

              <label className="fd-label">
                Region
                <input name="region" value={params.region} onChange={handleChange} className="fd-input" />
              </label>

              <label className="fd-label">
                Forecast months
                <select name="months" value={params.months} onChange={handleChange} className="fd-input">
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                </select>
              </label>

              <div className="panel-divider" />
              <h4>Backend sources</h4>
              <ul className="fd-input-list">
                {backendSources.map((s,i)=>(
                  <li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked /><span>{s}</span></label></li>
                ))}
              </ul>

              <button type="submit" className="fd-run-button"><Search size={16}/> Run Market Simulation</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><BarChart3 size={18}/> 2. Outputs</h3>

            {!results && <div className="fd-placeholder"><p>Set inputs and Run Market Simulation to view forecast, scenarios and recommendations.</p></div>}

            {results && (
              <>
                <div className="fd-summary-card">
                  <div className="fd-summary-header"><BarChart3 size={20}/><span>Price forecast (local)</span></div>
                  <div className="fd-summary-sub">Projected average prices for next {params.months} months</div>
                  <ul className="outputs-list">
                    {results.priceForecast.map((p, idx)=> <li key={idx}>{p.month}: ₹ {p.price}</li>)}
                  </ul>
                </div>

                <div className="panel-divider" />
                <h4>Scenario analysis</h4>
                <ul className="outputs-list">{results.scenarios.map((s,i)=> <li key={i}><b>{s.name}</b> — {s.impact} (P {Math.round(s.probability*100)}%)</li>)}</ul>

                <div className="panel-divider" />
                <h4>Recommendations & Alerts</h4>
                <ul className="outputs-list">{results.recommendations.map((r,i)=> <li key={i}>{r}</li>)}</ul>
                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Downloadable market report</p>
                    <p className="fd-report-sub">Includes forecasts, scenario charts and recommended actions.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample report</button>
                </div>
              </>
            )}

            <div className="panel-divider" />
            <h3><Database size={18}/> Data sources used</h3>
            <div className="dataset-grid">
              {backendSources.map((s, i)=> <div key={i} className="dataset-item"><Cloud size={16}/><span>{s}</span></div>)}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
