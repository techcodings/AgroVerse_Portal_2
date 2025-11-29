// src/pages/feature-demos/Feature14HarvestPlanner.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, FileText, Database, BarChart3 } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = ["Feature 9 yield forecasts", "Open-Meteo weather", "Market price APIs"];

export default function Feature14HarvestPlanner({ feature }) {
  const Icon = feature?.icon || MapPin;
  const [params, setParams] = useState({ harvestWindow: "Next 30 days", region: "Local" });
  const [plan, setPlan] = useState(null);

  const runPlan = (e) => {
    e.preventDefault();
    setPlan({
      optimalDate: "2025-12-10",
      labor: "Hire 12 workers for 3 days",
      transport: "2 trucks recommended",
      priority: "Harvest field section A first (higher price forecast)"
    });
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "teal-green"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Forecasting & Simulation"}</span>
              <h1>{feature?.title || "Precision Harvest & Logistics Planner"}</h1>
              <p>Calculate optimal harvest dates, labour & transport allocation and printable schedules.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Inputs</h3>
            <form className="fd-form" onSubmit={runPlan}>
              <label className="fd-label">Region
                <input className="fd-input" value={params.region} onChange={(e)=>setParams({...params, region: e.target.value})}/>
              </label>

              <label className="fd-label">Harvest window
                <select className="fd-input" value={params.harvestWindow} onChange={(e)=>setParams({...params, harvestWindow: e.target.value})}>
                  <option>Next 7 days</option><option>Next 30 days</option><option>Next 60 days</option>
                </select>
              </label>

              <div className="panel-divider"/>
              <ul className="fd-input-list">{backendSources.map((s,i)=>(<li key={i}><label className="fd-input-item"><input type="checkbox" defaultChecked/><span>{s}</span></label></li>))}</ul>

              <button className="fd-run-button" type="submit"><BarChart3 size={14}/> Plan Harvest</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><FileText size={18}/> 2. Harvest plan</h3>

            {!plan && <div className="fd-placeholder"><p>Run planner to get optimal dates, labour plan and route suggestions.</p></div>}

            {plan && (
              <>
                <ul className="outputs-list">
                  <li><b>Optimal harvest date:</b> {plan.optimalDate}</li>
                  <li><b>Labour:</b> {plan.labor}</li>
                  <li><b>Transport:</b> {plan.transport}</li>
                  <li><b>Priority:</b> {plan.priority}</li>
                </ul>

                <div className="panel-divider"/>
                <div className="fd-report-row">
                  <FileText size={18}/>
                  <div>
                    <p className="fd-report-title">Download harvest & logistics schedule</p>
                    <p className="fd-report-sub">Printable schedule with worker allocation and route maps.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample</button>
                </div>
              </>
            )}

            <div className="panel-divider"/>
            <h3><Database size={18}/> Data sources</h3>
            <div className="dataset-grid">{backendSources.map((s,i)=>(<div key={i} className="dataset-item"><MapPin size={16}/><span>{s}</span></div>))}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
