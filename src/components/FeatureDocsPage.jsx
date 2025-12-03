import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { featureDocs } from "../data/featureDocs";
import "./FeatureDocsPage.css";
import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeatureDocsPage() {
  const location = useLocation();
  const sectionRefs = useRef({});

  // Scroll to specific section when arriving with hash or state
  useEffect(() => {
    const feature = location.state?.feature;
    if (feature && sectionRefs.current[feature]) {
      const section = sectionRefs.current[feature];
      section.scrollIntoView({ behavior: "smooth", block: "start" });

      // add highlight animation temporarily
      section.classList.add("feature-highlight");
      setTimeout(() => section.classList.remove("feature-highlight"), 2500);
    }
  }, [location]);

  return (
    <section id="docs" className="featuredocs-wrapper">
      {/* Back Button */}
      <div className="back-button">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Portal</span>
        </Link>
      </div>

      {/* Header */}
      <div className="featuredocs-header">
        <h1>⚡ AgroVerse Feature Documentation</h1>
        <p>
          Dive into detailed technical insights of each AI-powered module —
          inputs, models, and integration structure.
        </p>
        <div className="featuredocs-divider"></div>
      </div>

      {/* Grid */}
      <div className="featuredocs-grid">
        {Object.keys(featureDocs).map((key, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[key] = el)} // store reference
            className="feature-box"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="glow-icon">
              <Zap size={22} />
            </div>

            <h2>⚡ {key}</h2>
            <p>{featureDocs[key].overview}</p>

            <div className="inputs-section">
              <h3>Inputs</h3>
              <ul>
                {featureDocs[key].inputs?.slice(0, 3).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="glow-line"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
