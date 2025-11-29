// src/pages/feature-demos/Feature11SoilNutrients.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, FileText, BarChart3, Cloud, Cpu } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "Copernicus soil maps",
  "Farmer soil test reports (user)",
  "FAO nutrient requirement datasets",
  "Open-Meteo weather",
  "NDVI/EVI historical (optional)"
];

export default function Feature11SoilNutrients({ feature }) {
  const Icon = feature?.icon || Database;
  const [params, setParams] = useState({ region: "Local", crop: "Wheat" });
  const [results, setResults] = useState(null);

  const handleChange = (e) => setParams({ ...params, [e.target.name]: e.target.value });

  const runAnalysis = (e) => {
    e.preventDefault();
    // Mocked result - replace with API calls
    setResults({
      nutrientMaps: { N: "low", P: "moderate", K: "adequate" },
      recommendations: [
        { zone: "Zone A", action: "Apply 20 kg/ha Nitrogen (Urea) - split dose" },
        { zone: "Zone B", action: "Apply 10 kg/ha Phosphorus (DAP) at planting" },
      ],
      predictedResponse: "Expected +10% yield after recommended fertilization",
      trend: "Soil N declining 6% over last season"
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "amber-yellow"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Field Monitoring"}</span>
              <h1>{feature?.title || "Soil Nutrient & Fertility Advisor"}</h1>
              <p>Analyze soil nutrients (NPK + microelements) and get fertilizer recommendations tailored per zone.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Inputs</h3>
            <form className="fd-form" onSubmit={runAnalysis}>
              <label className="fd-label">Region
                <input name="region" value={params.region} onChange={handleChange} className="fd-input"/>
              </label>

              <label className="fd-label">Crop
                <select name="crop" value={params.crop} onChange={handleChange} className="fd-input">
                  <option>Wheat</option><option>Rice</option><option>Maize</option>
                </select>
              </label>

              <div className="panel-divider"/>
              <h4>Upload farmer soil test (optional)</h4>
              <label className="fd-label">Soil test CSV / PDF
                <input type="file" className="fd-input" accept=".csv,.pdf"/>
              </label>

              <div className="panel-divider"/>
              <h4>Data sources</h4>
              <ul className="fd-input-list">
                {backendSources.map((s,i)=>(
                  <li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>
                ))}
              </ul>

              <button className="fd-run-button" type="submit"><Cpu size={14}/> Run Soil Analysis</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><BarChart3 size={18}/> 2. Outputs</h3>

            {!results && <div className="fd-placeholder"><p>Run analysis to get nutrient maps, recommendations and trend comparison.</p></div>}

            {results && (
              <>
                <div className="fd-summary-card">
                  <div className="fd-summary-header"><Database size={20}/><span>Nutrient map summary</span></div>
                  <p className="fd-summary-value">N: {results.nutrientMaps.N} • P: {results.nutrientMaps.P} • K: {results.nutrientMaps.K}</p>
                  <p className="fd-summary-sub">Visual maps (N/P/K) and microelement layers available for download.</p>
                </div>

                <div className="panel-divider"/>
                <h4>Recommendations</h4>
                <ul className="outputs-list">{results.recommendations.map((r,i)=>(<li key={i}>{r.zone}: {r.action}</li>))}</ul>

                <div className="panel-divider"/>
                <h4>Predicted crop response</h4>
                <p className="fd-body">{results.predictedResponse}</p>

                <div className="panel-divider"/>
                <h4>Temporal trend</h4>
                <p className="fd-body">{results.trend}</p>

                <div className="panel-divider"/>
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Export fertility plan</p>
                    <p className="fd-report-sub">Printable plan with doses, timings and maps.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download plan (sample)</button>
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
