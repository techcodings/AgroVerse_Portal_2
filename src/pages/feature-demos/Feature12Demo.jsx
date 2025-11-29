// src/pages/feature-demos/Feature12VarietyRecommendation.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings, FileText, Database, Cloud, BarChart3 } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = ["Open-Meteo climate", "Copernicus soil", "Historical yield datasets", "BrAPI genetics"];

export default function Feature12VarietyRecommendation({ feature }) {
  const Icon = feature?.icon || Settings;
  const [params, setParams] = useState({ crop: "Rice", region: "Local" });
  const [results, setResults] = useState(null);

  const handleChange = (e)=> setParams({...params, [e.target.name]: e.target.value});

  const run = (e) => {
    e.preventDefault();
    setResults({
      recommendations: [
        { variety: "Variety A", yield: "5.2 t/ha", diseaseResistance: "High", climateSuitability: "Good" },
        { variety: "Variety B", yield: "4.6 t/ha", diseaseResistance: "Medium", climateSuitability: "Very Good" }
      ],
      rationale: "Variety A has strong N-use efficiency; Variety B tolerates intermittent drought."
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "purple-indigo"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Analytics & Intelligence"}</span>
              <h1>{feature?.title || "Crop Variety / Breeding Recommendation"}</h1>
              <p>Recommend crop varieties by combining genetics, local climate and soil information.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Inputs</h3>
            <form className="fd-form" onSubmit={run}>
              <label className="fd-label">Crop
                <select name="crop" value={params.crop} onChange={handleChange} className="fd-input">
                  <option>Rice</option><option>Wheat</option><option>Sorghum</option>
                </select>
              </label>

              <label className="fd-label">Region
                <input name="region" value={params.region} onChange={handleChange} className="fd-input"/>
              </label>

              <div className="panel-divider"/>
              <h4>Optional: Preferred varieties</h4>
              <label className="fd-label">Preferred varieties (comma separated)
                <input className="fd-input" placeholder="e.g. VarA, VarB" />
              </label>

              <div className="panel-divider"/>
              <ul className="fd-input-list">{backendSources.map((s,i)=>(<li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>))}</ul>

              <button className="fd-run-button" type="submit"><Settings size={14}/> Run Recommendation</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><BarChart3 size={18}/> 2. Recommended varieties</h3>

            {!results && <div className="fd-placeholder"><p>Run to view recommended varieties, expected yields and disease suitability.</p></div>}

            {results && (
              <>
                <ul className="outputs-list">
                  {results.recommendations.map((r,i)=>(
                    <li key={i}><b>{r.variety}</b> — {r.yield} • Resistance: {r.diseaseResistance} • Climate: {r.climateSuitability}</li>
                  ))}
                </ul>

                <div className="panel-divider"/>
                <h4>Rationale</h4>
                <p className="fd-body">{results.rationale}</p>

                <div className="panel-divider"/>
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Export variety recommendation</p>
                    <p className="fd-report-sub">PDF with comparison tables and suitability scores.</p>
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
