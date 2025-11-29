// src/pages/feature-demos/Feature02Demo.jsx
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

import "../../AgroVerse/AgroPortal.css";
import "./FeatureDemo.css"; // same CSS used by Feature 01

const backendSources = [
  "Sentinel-2 NDVI / LAI",
  "MODIS LAI time series",
  "Weather (Open-Meteo: temperature, humidity, rainfall, wind)",
  "FAO pest & disease bulletins",
  "Twitter / X API (free tier – pest keyword stream)",
  "Plant data (Perenual API – species traits)",
  "Land-use maps (OpenStreetMap – crop / non-crop mask)",
];

const userInputs = [
  "Local agricultural extension reports (PDF / notes)",
  "Farmer-submitted pest sightings (text + images)",
  "Preferred threshold for early-warning alerts",
];

const Feature02Demo = ({ feature }) => {
  const Icon = feature?.icon || AlertTriangle;
  const [results, setResults] = useState(null);

  const handleRunAnalysis = (e) => {
    e.preventDefault();

    // 🔮 Sample static data – later swap with real backend output
    setResults({
      overallRisk: "High risk in 2 of 5 fields (rust & leaf-spot clusters)",
      hotspots: [
        "Hotspot 1 – North-East block: rapid increase in LAI variance + high humidity.",
        "Hotspot 2 – Central band: NDVI drop + farmer photos with visible leaf spots.",
      ],
      outbreakProbabilities: [
        "Wheat rust – 0.76 probability in fields F2 & F3.",
        "Leaf spot – 0.61 probability in low-lying areas near canal.",
      ],
      controls: [
        "Apply recommended fungicide for rust in F2 & F3 within the next 48–72 hours.",
        "Introduce biological control (Trichoderma) in hotspot 2 to slow leaf-spot spread.",
        "Avoid overhead irrigation in high-risk zones for the next 5–7 days.",
      ],
      community: [
        "Send SMS / WhatsApp alerts to all farmers within 5 km radius.",
        "Notify local extension officer with risk map and suggested spray window.",
      ],
      alerts: [
        "Early Warning: Social media + FAO bulletin show regional rust outbreak trending.",
        "Micro-climate: 3 consecutive nights with humidity > 90% in hotspot 1.",
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
              className={`feature-demo-icon ${feature?.color || "red-pink"}`}
            >
              <Icon size={28} />
            </div>
            <div>
              <span className="fd-category-chip">
                {feature?.category || "Field Monitoring"}
              </span>
              <h1>{feature?.title || "Pest & Disease Early Warning"}</h1>
              <p>
                Fuse satellite, weather, FAO bulletins and social signals to
                detect pest and disease outbreaks early, estimate risk per crop,
                and push actionable alerts to farmers and extension workers.
              </p>
            </div>
          </div>
        </header>

        {/* ===== MAIN GRID ===== */}
        <main className="feature-demo-grid">
          {/* LEFT PANEL – Inputs */}
          <section className="feature-demo-panel">
            <h3>1. Field &amp; Data Inputs</h3>

            <form className="fd-form" onSubmit={handleRunAnalysis}>
              {/* Basic field info */}
              <div className="fd-field-group">
                <label className="fd-label">
                  Field / Cluster name
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Delta Wheat Cluster – F2–F4"
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

              {/* Crop details */}
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Main crop
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Wheat"
                  />
                </label>
                <label className="fd-label">
                  Growth stage
                  <input
                    type="text"
                    className="fd-input"
                    placeholder="e.g. Tillering / heading"
                  />
                </label>
              </div>

              {/* Date range */}
              <div className="fd-field-group fd-field-two-col">
                <label className="fd-label">
                  Monitor from
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
                These feeds run automatically in the background – no manual work
                for the farmer.
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

              {/* User contributions */}
              <div className="panel-divider" />
              <h4>User contributions</h4>

              <ul className="fd-input-list">
                {userInputs.map((src, idx) => (
                  <li key={idx}>
                    <label className="fd-input-item">
                      <input type="checkbox" defaultChecked />
                      <span>{src}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="fd-field-group">
                <label className="fd-label">
                  Upload extension reports / lab results (optional)
                  <input
                    type="file"
                    className="fd-input fd-file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,image/*"
                  />
                </label>

                <label className="fd-label">
                  Recent pest sightings (notes)
                  <textarea
                    className="fd-textarea"
                    rows={3}
                    placeholder="e.g. Brown rust spots on upper leaves in F2, caterpillars on border rows…"
                  />
                </label>
              </div>

              <button type="submit" className="fd-run-button">
                Run Pest &amp; Disease Analysis
              </button>
            </form>
          </section>

          {/* RIGHT PANEL – Outputs */}
          <section className="feature-demo-panel">
            <h3>
              <BarChart3 size={18} /> 2. Risk Outputs &amp; Alerts
            </h3>

            {!results && (
              <div className="fd-placeholder">
                <p>
                  Configure the field on the left and click{" "}
                  <b>“Run Pest &amp; Disease Analysis”</b> to view a sample
                  early-warning output.
                </p>
              </div>
            )}

            {results && (
              <>
                {/* Overall risk summary */}
                <div className="fd-summary-card">
                  <div className="fd-summary-header">
                    <AlertTriangle size={20} />
                    <span>Overall pest / disease situation</span>
                  </div>
                  <p className="fd-summary-value">{results.overallRisk}</p>
                  <p className="fd-summary-sub">
                    Based on LAI trends, humidity, recent rainfall, bulletins
                    and local farmer sightings.
                  </p>
                </div>

                {/* Hotspots */}
                <div className="panel-divider" />
                <h4>Hotspot risk zones</h4>
                <ul className="outputs-list">
                  {results.hotspots.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>

                {/* Outbreak probabilities */}
                <div className="panel-divider" />
                <h4>Outbreak probability per crop</h4>
                <ul className="outputs-list">
                  {results.outbreakProbabilities.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>

                {/* Control measures */}
                <div className="panel-divider" />
                <h4>Suggested control measures</h4>
                <ul className="outputs-list">
                  {results.controls.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>

                {/* Community / extension actions */}
                <div className="panel-divider" />
                <h4>Community notifications &amp; extension actions</h4>
                <ul className="outputs-list">
                  {results.community.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>

                {/* Alerts */}
                <div className="panel-divider" />
                <h4>System alerts</h4>
                <ul className="outputs-list">
                  {results.alerts.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>

                {/* Report row */}
                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18} />
                  <div>
                    <p className="fd-report-title">
                      Report for agricultural extension workers
                    </p>
                    <p className="fd-report-sub">
                      In production, this will export maps, risk scores and
                      recommended interventions in a PDF ready to share.
                    </p>
                  </div>
                  <button className="fd-outline-button" type="button">
                    Download sample report
                  </button>
                </div>
              </>
            )}

            {/* Architecture & data sources */}
            <div className="panel-divider" />
            <h3>
              <Cpu size={18} /> Under the hood (Architecture)
            </h3>
            <ul className="outputs-list">
              <li>
                <b>Multimodal Transformer</b> combines satellite indices
                (NDVI/LAI), weather and text / social streams into a unified
                pest-risk signal.
              </li>
              <li>
                <b>RL (DreamerV3)</b> learns optimal timing for interventions
                based on historical outcomes and cost.
              </li>
              <li>
                <b>GNN</b> models spatial propagation of pests / disease across
                neighboring fields and land-use types.
              </li>
              <li>
                <b>End-to-End MLOps</b> automates data ingestion, retraining,
                monitoring and drift detection.
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
                <span>Local extension data + farmer pest images / notes</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Feature02Demo;
