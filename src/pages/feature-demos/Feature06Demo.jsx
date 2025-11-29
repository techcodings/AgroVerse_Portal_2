// src/pages/feature-demos/Feature06Demo.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Cloud,
  Activity,
  AlertTriangle,
  BarChart3,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Search,
} from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

/*
  Feature 6: Knowledge Graph of Agro-Events
  - Simple frontend demo that accepts inputs, "runs" a mock graph build,
    and displays an interactive SVG graph (no external libs).
  - Replace/mock API calls later with real Cytoscape/D3 or a graph widget.
*/

const backendSources = [
  "FAO bulletins / pest alerts",
  "Satellite imagery change detections (Sentinel-2)",
  "Weather streams (Open-Meteo)",
  "Crop breeding / genetic data (BrAPI)",
  "Land Use / Land Cover (ESA CCI / GlobeLand30)",
  "Phenology derived from remote sensing",
];

function SimpleGraph({ nodes = [], edges = [], onSelect }) {
  // Basic layout in a circle for demo purposes
  const cx = 340;
  const cy = 220;
  const r = 140;
  const angleStep = (2 * Math.PI) / Math.max(1, nodes.length);

  return (
    <svg viewBox="0 0 700 440" className="kg-graph-svg">
      {/* edges */}
      {edges.map((e, i) => {
        const srcIndex = nodes.findIndex((n) => n.id === e.source);
        const tgtIndex = nodes.findIndex((n) => n.id === e.target);
        if (srcIndex === -1 || tgtIndex === -1) return null;
        const sx = cx + r * Math.cos(srcIndex * angleStep);
        const sy = cy + r * Math.sin(srcIndex * angleStep);
        const tx = cx + r * Math.cos(tgtIndex * angleStep);
        const ty = cy + r * Math.sin(tgtIndex * angleStep);

        return (
          <g key={i}>
            <line
              x1={sx}
              y1={sy}
              x2={tx}
              y2={ty}
              stroke="#8aa4a4"
              strokeWidth={Math.max(1, (e.weight || 1) * 1.5)}
              opacity={0.9}
            />
            {/* small arrow */}
            <polygon
              points={`${tx},${ty} ${tx - (tx - sx) * 0.03 - (ty - sy) * 0.03},${ty - (ty - sy) * 0.03 + (tx - sx) * 0.03} ${tx - (tx - sx) * 0.03 + (ty - sy) * 0.03},${ty - (ty - sy) * 0.03 - (tx - sx) * 0.03}`}
              fill="#6b8f8f"
              opacity={0.9}
            />
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n, idx) => {
        const x = cx + r * Math.cos(idx * angleStep);
        const y = cy + r * Math.sin(idx * angleStep);
        const nodeRadius = Math.max(18, 14 + (n.score || 0) * 8);
        const fill = n.type === "event" ? "#ffd27f" : n.type === "pest" ? "#ff9b9b" : "#9ee7d1";

        return (
          <g
            key={n.id}
            transform={`translate(${x}, ${y})`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect && onSelect(n)}
          >
            <circle r={nodeRadius} fill={fill} stroke="#254c4c" strokeWidth="1.5" />
            <text
              x={0}
              y={nodeRadius + 14}
              fontSize="11"
              textAnchor="middle"
              style={{ fontFamily: "Inter, system-ui, sans-serif", fill: "#033333" }}
            >
              {n.label.length > 18 ? n.label.slice(0, 16) + "…" : n.label}
            </text>
          </g>
        );
      })}

      {/* center label */}
      <text x={cx} y={30} textAnchor="middle" fontSize="14" style={{ fontWeight: 700 }}>
        Agro-Events Knowledge Graph (demo)
      </text>
    </svg>
  );
}

export default function Feature06Demo({ feature }) {
  const Icon = feature?.icon || GitBranch;
  const [results, setResults] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleRunBuild = (e) => {
    e.preventDefault();

    // Mock graph nodes & edges — replace with real API output later.
    const nodes = [
      { id: "n1", label: "FAO: Fall Armyworm Alert", type: "event", score: 0.9 },
      { id: "n2", label: "NDVI Drop (Field 3)", type: "observation", score: 0.6 },
      { id: "n3", label: "Weather: Heatwave (7d)", type: "weather", score: 0.7 },
      { id: "n4", label: "Pest: Locust swarm", type: "pest", score: 0.8 },
      { id: "n5", label: "Crop: Maize", type: "crop", score: 0.4 },
      { id: "n6", label: "Intervention: Emergency spray", type: "action", score: 0.5 },
    ];

    const edges = [
      { source: "n1", target: "n2", weight: 1.2 },
      { source: "n3", target: "n2", weight: 0.9 },
      { source: "n1", target: "n4", weight: 1.1 },
      { source: "n2", target: "n5", weight: 0.7 },
      { source: "n4", target: "n5", weight: 1.3 },
      { source: "n2", target: "n6", weight: 0.8 },
    ];

    // Some simple analytics derived from graph
    const highRiskChains = [
      {
        path: ["FAO: Fall Armyworm Alert", "NDVI Drop (Field 3)", "Intervention: Emergency spray"],
        riskScore: 0.86,
      },
    ];

    setResults({
      nodes,
      edges,
      highRiskChains,
      insights: [
        "FAO alert correlates with NDVI drops in nearby fields (possible outbreak).",
        "Heatwave increases vulnerability; pests show higher propagation probability.",
        "Suggested immediate intervention: targeted scouting & emergency spray for hotspot.",
      ],
      searchableCount: 1285, // demo number
    });

    setSelectedNode(null);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        {/* HEADER */}
        <header className="feature-demo-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} /> Back to AgroVerse
          </Link>

          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "violet-purple"}`}>
              <Icon size={28} />
            </div>
            <div>
              <span className="modal-category">
                {feature?.category || "Analytics & Intelligence"}
              </span>
              <h1>{feature?.title || "Knowledge Graph of Agro-Events"}</h1>
              <p>
                Build an event-driven knowledge graph that links FAO bulletins, satellite
                changes, weather streams and local reports to surface causal relationships
                and prioritized interventions.
              </p>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="feature-demo-content feature-demo-grid">
          {/* LEFT: Inputs & controls */}
          <section className="feature-demo-panel">
            <h3>1. Configure graph build</h3>

            <form className="fd-form" onSubmit={handleRunBuild}>
              <div className="fd-field-group">
                <label className="fd-label">
                  Project / Region name
                  <input type="text" className="fd-input" placeholder="e.g. Coastal District – Event Graph" />
                </label>

                <label className="fd-label">
                  Time window
                  <div className="fd-input-row">
                    <input type="date" className="fd-input" />
                    <span style={{ width: 8 }} />
                    <input type="date" className="fd-input" />
                  </div>
                </label>
              </div>

              <div className="panel-divider" />
              <h4>Backend sources to include</h4>
              <p className="fd-body">Select feeds to fuse into the knowledge graph (mocked for demo).</p>
              <ul className="fd-input-list">
                {backendSources.map((src, i) => (
                  <li key={i}>
                    <label className="fd-input-item">
                      <input type="checkbox" defaultChecked />
                      <span>{src}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="panel-divider" />
              <h4>User contributions</h4>
              <label className="fd-label">
                Local event notes (optional)
                <textarea className="fd-textarea" rows={3} placeholder="e.g. Farmer report: sudden leaf wilting on 2025-06-27" />
              </label>

              <div className="panel-divider" />
              <h4>Searchable database</h4>
              <p className="fd-body">
                The knowledge graph is searchable and can be filtered by event, crop, pest or location.
              </p>

              <button type="submit" className="fd-run-button">
                <Search size={16} /> Build Knowledge Graph
              </button>
            </form>
          </section>

          {/* RIGHT: Graph & outputs */}
          <section className="feature-demo-panel">
            <h3>
              <BarChart3 size={18} /> 2. Graph outputs & insights
            </h3>

            {!results && (
              <div className="fd-placeholder">
                <p>Configure the inputs above and click <b>Build Knowledge Graph</b> to generate a demo graph and insights.</p>
              </div>
            )}

            {results && (
              <>
                {/* Interactive Graph */}
                <div className="panel-divider" />
                <h4>Interactive knowledge graph (click nodes)</h4>
                <div className="kg-graph-container">
                  <SimpleGraph nodes={results.nodes} edges={results.edges} onSelect={handleNodeSelect} />
                </div>

                {/* Selected node details */}
                <div className="panel-divider" />
                <h4>Selected node</h4>
                {selectedNode ? (
                  <div className="kg-node-details">
                    <div className="kg-node-header">
                      <strong>{selectedNode.label}</strong>
                      <span className="kg-node-type">{selectedNode.type}</span>
                    </div>
                    <p>Confidence score: {(selectedNode.score * 100).toFixed(0)}%</p>
                    <p>
                      Brief: This node was derived from backend feed & matched to local events.
                    </p>
                    <div className="kg-actions">
                      <button className="fd-outline-button">View source documents</button>
                      <button className="fd-outline-button">Link to intervention</button>
                    </div>
                  </div>
                ) : (
                  <div className="kg-node-details">
                    <p>No node selected — click any node on the graph to view details.</p>
                  </div>
                )}

                {/* Insights */}
                <div className="panel-divider" />
                <h4>Top insights</h4>
                <ul className="outputs-list">
                  {results.insights.map((ins, i) => (
                    <li key={i}>{ins}</li>
                  ))}
                </ul>

                {/* High-risk chains */}
                <div className="panel-divider" />
                <h4>High-risk event chains</h4>
                {results.highRiskChains.map((chain, i) => (
                  <div key={i} className="kg-chain-card">
                    <div className="kg-chain-path">{chain.path.join(" → ")}</div>
                    <div className="kg-chain-score">Risk: {(chain.riskScore * 100).toFixed(0)}%</div>
                    <div className="kg-chain-actions">
                      <button className="fd-outline-button">Prioritise intervention</button>
                    </div>
                  </div>
                ))}

                <div className="panel-divider" />
                <div className="fd-report-row">
                  <FileText size={18} />
                  <div>
                    <p className="fd-report-title">Export graph & insights</p>
                    <p className="fd-report-sub">Exportable formats: PNG / PDF / JSON (graph). Includes node metadata and suggested interventions.</p>
                  </div>
                  <button className="fd-outline-button" type="button">Download sample export</button>
                </div>

                {/* Quick stats */}
                <div className="panel-divider" />
                <div className="kg-stats-row">
                  <div className="kg-stat">
                    <div className="kg-stat-value">{results.nodes.length}</div>
                    <div className="kg-stat-label">Nodes</div>
                  </div>
                  <div className="kg-stat">
                    <div className="kg-stat-value">{results.edges.length}</div>
                    <div className="kg-stat-label">Edges</div>
                  </div>
                  <div className="kg-stat">
                    <div className="kg-stat-value">{results.searchableCount}</div>
                    <div className="kg-stat-label">Searchable events</div>
                  </div>
                </div>
              </>
            )}

            {/* Architecture */}
            <div className="panel-divider" />
            <h3><Cpu size={18} /> Under the hood (Architecture)</h3>
            <ul className="outputs-list">
              <li><b>Graph Neural Network / Graphormer</b> models causal relationships between events, pests, climate and crops.</li>
              <li><b>Multimodal Transformer</b> fuses satellite, bulletins, phenology and user reports into node representations.</li>
              <li><b>RL (MuZero)</b> prioritizes interventions that minimize cascade risk.</li>
              <li><b>End-to-end MLOps</b> supports real-time updates, retraining and alerting.</li>
            </ul>

            {/* Data sources */}
            <div className="panel-divider" />
            <h3><Database size={18} /> Data sources used</h3>
            <div className="dataset-grid">
              {backendSources.map((src, idx) => (
                <div key={idx} className="dataset-item">
                  <Cloud size={16} />
                  <span>{src}</span>
                </div>
              ))}
              <div className="dataset-item">
                <Cloud size={16} />
                <span>User local events / extension reports</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
