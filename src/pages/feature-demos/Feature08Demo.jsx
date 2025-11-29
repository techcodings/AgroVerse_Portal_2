// src/pages/feature-demos/Feature08LLMAssistant.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Mic,
  Search,
  FileText,
  Database,
  Cloud
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = [
  "Satellite/weather maps (Sentinel-2, Open-Meteo)",
  "Ag Data Commons",
  "Internal knowledge base"
];

export default function Feature08LLMAssistant({ feature }) {
  const Icon = feature?.icon || MessageSquare;
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("en");
  const [answer, setAnswer] = useState(null);

  const handleAsk = async (e) => {
    e.preventDefault();
    // Mock assistant answer. Replace with real LLM backend call.
    setAnswer({
      text: `Sample advice (lang:${lang}): For ${query || "your crop"}, check soil moisture and ensure irrigation after predicted dry spell.`,
      references: ["Open-Meteo forecast", "Sentinel-2 NDVI trend"]
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "pink-rose"}`}><Icon size={28} /></div>
            <div>
              <span className="modal-category">{feature?.category || "Analytics & Intelligence"}</span>
              <h1>{feature?.title || "Multilingual LLM Agro Assistant"}</h1>
              <p>Ask about crops, weather, pests or management — assistant supports text & (mock) voice in multiple languages.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Ask the Assistant</h3>
            <form className="fd-form" onSubmit={handleAsk}>
              <label className="fd-label">Language
                <select className="fd-input" value={lang} onChange={(e)=>setLang(e.target.value)}>
                  <option value="en">English</option>
                  <option value="bn">Bangla</option>
                  <option value="ta">Tamil</option>
                </select>
              </label>

              <label className="fd-label">Query
                <input className="fd-input" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="e.g. Why are leaves turning yellow?" />
              </label>

              <div className="panel-divider" />
              <h4>Optional: Attach GeoJSON or images</h4>
              <label className="fd-label">Upload (optional)
                <input type="file" className="fd-input" accept=".geojson,image/*"/>
              </label>

              <button type="submit" className="fd-run-button"><Search size={16}/> Ask Assistant</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><FileText size={18}/> 2. Response</h3>
            {!answer && <div className="fd-placeholder"><p>Ask a question to see multilingual response, suggested actions and sources.</p></div>}
            {answer && (
              <>
                <div className="fd-summary-card">
                  <div className="fd-summary-header"><MessageSquare size={20}/><span>Assistant answer</span></div>
                  <p className="fd-summary-value">{answer.text}</p>
                </div>

                <div className="panel-divider" />
                <h4>References</h4>
                <ul className="outputs-list">{answer.references.map((r,i)=>(<li key={i}>{r}</li>))}</ul>

                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Download guidance note</p>
                    <p className="fd-report-sub">Personalized guidance summary will be available for download in production.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample note</button>
                </div>
              </>
            )}

            <div className="panel-divider" />
            <h3><Database size={18}/> Data sources used</h3>
            <div className="dataset-grid">
              {backendSources.map((s,i)=> <div key={i} className="dataset-item"><Cloud size={16}/><span>{s}</span></div>)}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
