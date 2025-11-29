// src/pages/feature-demos/DefaultFeatureDemo.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css"; // keep your global theme

export default function DefaultFeatureDemo({ feature, runDemo }) {
  const Icon = feature?.icon || BarChart3;

  const handleRun = (e) => {
    e.preventDefault();
    if (runDemo) {
      runDemo();
    } else {
      // simple placeholder behaviour
      alert(`Sample run for: ${feature?.title || "Unknown feature"}`);
    }
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container feature-demo-container" data-animate="stagger">

        {/* Header */}
        <header className="feature-demo-header" data-animate="item">
          <Link to="/" className="back-link fd-back-link" aria-label="Back to portal">
            <ArrowLeft size={18} /> <span>Back to AgroVerse</span>
          </Link>

          <div className="feature-demo-title">
            <div
              className={`feature-demo-icon ${feature?.color || "green-emerald"}`}
              title={feature?.title || "Feature icon"}
              aria-hidden="true"
            >
              <Icon size={28} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div className="fd-category-chip">{feature?.category || "AgroVerse Feature"}</div>
              <h1 className="feature-demo-heading">{feature?.title || "Feature Demo"}</h1>
              <p className="feature-demo-sub">
                {feature?.desc ||
                  "Configure inputs on the left and view example outputs on the right."}
              </p>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="feature-demo-content feature-demo-grid" data-animate="item">

          {/* LEFT: Inputs */}
          <section className="feature-demo-panel" aria-labelledby="inputs-heading">
            <h3 id="inputs-heading">Configure Inputs</h3>

            <p className="fd-body">
              Select which inputs you want to include for <b>{feature?.title}</b>.
            </p>

            <ul className="fd-input-list">
              {(feature?.inputs || []).map((item, idx) => (
                <li key={idx}>
                  <label className="fd-input-item">
                    <input type="checkbox" defaultChecked aria-checked="true" />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="fd-scenario-row">
              <div className="fd-field">
                <label className="fd-label">
                  Scenario name
                  <input
                    type="text"
                    placeholder="e.g. Baseline scenario"
                    className="fd-input"
                  />
                </label>
              </div>

              <div className="fd-field">
                <label className="fd-label">
                  Notes / assumptions
                  <textarea
                    placeholder="Add assumptions for this run..."
                    className="fd-textarea"
                    rows={3}
                  />
                </label>
              </div>
            </div>

            <button
              className="fd-run-button"
              onClick={handleRun}
              aria-label={`Run sample scenario for ${feature?.title || "feature"}`}
            >
              Run Sample Scenario
            </button>
          </section>

          {/* RIGHT: Outputs & tech */}
          <section className="feature-demo-panel" aria-labelledby="outputs-heading">
            <h2 id="outputs-heading">
              <BarChart3 size={20} /> Expected Outputs
            </h2>
            <ul className="outputs-list">
              {(feature?.outputs || []).map((output, idx) => (
                <li key={idx}>{output}</li>
              ))}
            </ul>

            <div className="panel-divider" />

            <h3>
              <Cpu size={18} /> ML / Architecture
            </h3>
            <div className="tech-tags">
              {(feature?.ml || []).map((tech, idx) => (
                <span key={idx} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="panel-divider" />

            <h3>
              <Database size={18} /> Data Sources
            </h3>
            <div className="dataset-grid">
              {(feature?.datasets || []).map((dataset, idx) => (
                <div key={idx} className="dataset-item">
                  <Cloud size={16} />
                  <span>{dataset}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
