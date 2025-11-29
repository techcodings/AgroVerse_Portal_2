// src/pages/feature-demos/Feature09YieldForecast.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LineChart, Database, BarChart3, FileText, Cloud } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "NDVI/EVI timeseries (Sentinel-2, MODIS, Landsat)",
  "Weather forecasts (Open-Meteo)",
  "Soil + terrain (Copernicus)",
  "Historical yield data (EuroCropsML)"
];

export default function Feature09YieldForecast({ feature }) {
  const Icon = feature?.icon || LineChart;
  const [params, setParams] = useState({ crop: "Wheat", region: "Local", season: "Rabi" });
  const [results, setResults] = useState(null);

  const handleChange = (e) => setParams({...params, [e.target.name]: e.target.value});

  const handleRun = (e) => {
    e.preventDefault();
    // Mock result (replace with actual model call)
    setResults({
      predictedYield: "3.8 t/ha",
      growthTimeline: ["Emergence: Week 1", "Tillering: Week 4", "Flowering: Week 10", "Maturity: Week 18"],
      zoneMaps: ["Zone A: 4.0 t/ha", "Zone B: 3.2 t/ha"],
      alerts: ["Yield deviation risk (Zone B): −12% vs baseline"]
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "cyan-blue"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Forecasting & Simulation"}</span>
              <h1>{feature?.title || "Crop Yield & Growth Forecasting"}</h1>
              <p>Predict yields, growth stages and provide zone-level recommendations using multimodal signals.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Inputs</h3>
            <form className="fd-form" onSubmit={handleRun}>
              <label className="fd-label">Crop
                <select name="crop" value={params.crop} onChange={handleChange} className="fd-input">
                  <option>Wheat</option><option>Rice</option><option>Maize</option>
                </select>
              </label>

              <label className="fd-label">Region
                <input name="region" value={params.region} onChange={handleChange} className="fd-input" />
              </label>

              <label className="fd-label">Season
                <select name="season" value={params.season} onChange={handleChange} className="fd-input">
                  <option>Rabi</option><option>Kharif</option><option>Zaid</option>
                </select>
              </label>

              <div className="panel-divider" />
              <h4>Data sources</h4>
              <ul className="fd-input-list">{backendSources.map((s,i)=> <li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>)}</ul>

              <button className="fd-run-button" type="submit"><LineChart size={16}/> Run Yield Forecast</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><BarChart3 size={18}/> 2. Results</h3>
            {!results && <div className="fd-placeholder"><p>Run the forecast to see predicted yield, growth timeline and zone maps.</p></div>}
            {results && (
              <>
                <div className="fd-summary-card">
                  <div className="fd-summary-header"><BarChart3 size={20}/><span>Predicted yield</span></div>
                  <p className="fd-summary-value">{results.predictedYield}</p>
                  <p className="fd-summary-sub">Model: TFT + N-BEATS ensemble (mock)</p>
                </div>

                <div className="panel-divider" />
                <h4>Growth timeline</h4>
                <ul className="outputs-list">{results.growthTimeline.map((g,i)=> <li key={i}>{g}</li>)}</ul>

                <div className="panel-divider" />
                <h4>Zone-specific predictions</h4>
                <ul className="outputs-list">{results.zoneMaps.map((z,i)=> <li key={i}>{z}</li>)}</ul>

                <div className="panel-divider" />
                <h4>Alerts</h4>
                <ul className="outputs-list">{results.alerts.map((a,i)=> <li key={i}>{a}</li>)}</ul>

                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Download forecast report</p>
                    <p className="fd-report-sub">Includes yield maps, uncertainty bands and recommendations.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample report</button>
                </div>
              </>
            )}

            <div className="panel-divider" />
            <h3><Database size={18}/> Data sources</h3>
            <div className="dataset-grid">{backendSources.map((s,i)=> <div key={i} className="dataset-item"><Cloud size={16}/><span>{s}</span></div>)}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
