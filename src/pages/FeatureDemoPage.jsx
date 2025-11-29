// src/pages/FeatureDemoPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { allFeatures } from "../data/agroFeatures";
import "../AgroVerse/AgroPortal.css";

// per-feature demo components
import Feature01CropHealthDemo from "./feature-demos/Feature01CropHealthDemo";
import Feature02Demo from "./feature-demos/Feature02Demo";
import Feature03Demo from "./feature-demos/Feature03Demo";
import Feature04Demo from "./feature-demos/Feature04Demo";
import Feature05Demo from "./feature-demos/Feature05Demo";
import Feature06Demo from "./feature-demos/Feature06Demo";
import Feature07Demo from "./feature-demos/Feature07Demo";
import Feature08Demo from "./feature-demos/Feature08Demo";
import Feature09Demo from "./feature-demos/Feature09Demo";
import Feature10Demo from "./feature-demos/Feature10Demo";
import Feature11Demo from "./feature-demos/Feature11Demo";
import Feature12Demo from "./feature-demos/Feature12Demo";
import Feature13Demo from "./feature-demos/Feature13Demo";
import Feature14Demo from "./feature-demos/Feature14Demo";
import Feature15Demo from "./feature-demos/Feature15Demo";
import Feature16Demo from "./feature-demos/Feature16Demo";

import DefaultFeatureDemo from "./feature-demos/DefaultFeatureDemo";

const demoComponentMap = {
  1: Feature01CropHealthDemo,
  2: Feature02Demo,
  3: Feature03Demo,
  4: Feature04Demo,
  5: Feature05Demo,
  6: Feature06Demo,
  7: Feature07Demo,
  8: Feature08Demo,
  9: Feature09Demo,
  10: Feature10Demo,
  11: Feature11Demo,
  12: Feature12Demo,
  13: Feature13Demo,
  14: Feature14Demo,
  15: Feature15Demo,
  16: Feature16Demo,
};

export default function FeatureDemoPage() {
  const { id } = useParams();
  const featureId = Number(id);

  const feature = allFeatures.find((f) => f.id === featureId);
  const DemoComponent = demoComponentMap[featureId] || DefaultFeatureDemo;

  if (!feature) {
    return (
      <div className="feature-demo-page">
        <div className="features-container">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to AgroVerse
          </Link>
          <h2>Feature not found</h2>
          <p>
            No feature exists for ID <code>{id}</code>. Go back to the portal
            and pick a feature again.
          </p>
        </div>
      </div>
    );
  }

  // each Demo receives the full feature config
  return <DemoComponent feature={feature} />;
}
