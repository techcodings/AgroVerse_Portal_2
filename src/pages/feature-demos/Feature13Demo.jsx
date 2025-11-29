// src/pages/feature-demos/Feature13CommunityExchange.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, FileText, Cloud, MessageSquare, Database } from "lucide-react";
import "../../AgroVerse/AgroPortal.css";

const backendSources = ["Satellite overlays", "Pest alerts", "Weather forecasts"];

export default function Feature13CommunityExchange({ feature }) {
  const Icon = feature?.icon || Users;
  const [posts, setPosts] = useState([
    { id: 1, author: "Ramesh", text: "Yellowing leaves in field A — any tips?", image: null, votes: 5 },
    { id: 2, author: "Anita", text: "Observed armyworm near boundary", image: null, votes: 3 }
  ]);
  const [newPost, setNewPost] = useState("");

  const submitPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), author: "You", text: newPost, image: null, votes: 0 }, ...posts]);
    setNewPost("");
  };

  const upvote = (id) => setPosts(posts.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));

  return (
    <div className="feature-demo-page">
      <div className="features-container">
        <header className="feature-demo-header">
          <Link to="/" className="back-link"><ArrowLeft size={18}/> Back to AgroVerse</Link>
          <div className="feature-demo-title">
            <div className={`feature-demo-icon ${feature?.color || "orange-red"}`}><Icon size={28}/></div>
            <div>
              <span className="modal-category">{feature?.category || "Analytics & Intelligence"}</span>
              <h1>{feature?.title || "Farmer Community Knowledge Exchange"}</h1>
              <p>Share observations, images and get crowd-sourced advice from local farmers and extension workers.</p>
            </div>
          </div>
        </header>

        <main className="feature-demo-content feature-demo-grid">
          <section className="feature-demo-panel">
            <h3>1. Post observation</h3>
            <form className="fd-form" onSubmit={submitPost}>
              <label className="fd-label">Write your observation
                <textarea value={newPost} onChange={(e)=>setNewPost(e.target.value)} className="fd-textarea" rows={3} placeholder="Describe what you see..."/>
              </label>

              <label className="fd-label">Attach image (optional)
                <input type="file" className="fd-input" accept="image/*"/>
              </label>

              <div className="panel-divider"/>
              <button className="fd-run-button" type="submit"><MessageSquare size={14}/> Share Observation</button>
            </form>
          </section>

          <section className="feature-demo-panel">
            <h3><MessageSquare size={18}/> 2. Community feed</h3>
            <div className="panel-divider"/>
            <ul className="community-list">
              {posts.map(p=>(
                <li key={p.id} className="community-item">
                  <div className="community-meta"><b>{p.author}</b> • <span className="community-text">{p.text}</span></div>
                  <div className="community-actions">
                    <button onClick={()=>upvote(p.id)} className="small-btn">👍 {p.votes}</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="panel-divider"/>
            <div className="fd-report-row">
              <FileText size={18}/>
              <div>
                <p className="fd-report-title">Export community report</p>
                <p className="fd-report-sub">Summary of recent observations and alerts for extension agents.</p>
              </div>
              <button className="fd-outline-button" type="button">Download sample</button>
            </div>

            <div className="panel-divider"/>
            <h3><Database size={18}/> Data sources</h3>
            <div className="dataset-grid">{backendSources.map((s,i)=>(<div key={i} className="dataset-item"><Cloud size={16}/><span>{s}</span></div>))}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
