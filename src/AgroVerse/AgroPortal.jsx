// src/AgroVerse/AgroPortal.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  Sun,
  Wind,
  Battery,
  Zap,
  TrendingUp,
  Globe,
  Activity,
  AlertTriangle,
  BarChart3,
  Database,
  Leaf,
  Users,
  Settings,
  Search,
  Filter,
  ArrowRight,
  Play,
  Bell,
  Code,
  MapPin,
  LineChart,
  Shield,
  Cpu,
  Cloud,
  Box,
  GitBranch,
  LogOut,
  User,
  LayoutDashboard,
  MessageSquare,
  Download,
  Github,
  Linkedin,
} from "lucide-react";

import "./AgroPortal.css";
import Auth from "../components/Auth";
import { auth, db } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Shared feature data (16 features) from data file
import { allFeatures, featureCategories } from "../data/agroFeatures";

/* ===========================
   ABOUT SECTION
   =========================== */

const AboutSection = () => {
  const people = [
    {
      id: 3,
      name: "Goutham L M",
      role: "Co-builder · Full-Stack & Agri-AI Engineer",
      location: "India",
      bio: "Leads the core architecture, ML pipelines, and UI/UX for AgroVerse, turning crop, climate, and market data into intuitive, production-ready intelligence.",
      github: "https://github.com/techcodings",
      linkedin: "https://www.linkedin.com/in/goutham-lm/",
      website: "https://techcodings.github.io/gouthamlm",
      tags: ["Full-Stack", "AI / ML", "AgriTech", "Product Builder"],
      initials: "GL",
    },
    {
      id: 2,
      name: "Dinesh",
      role: "Co-builder · Full-Stack & Agri-AI Engineer",
      location: "India",
      bio: "Architects feature modules, backend APIs, and performance optimisations for the AgroVerse stack, bridging data, ML, and real-world farm workflows.",
      github: "https://github.com/Twist-Turn",
      linkedin: "https://www.linkedin.com/in/dinesh-kumar-5a1a0b257/",
      website: "https://dinesh-s-portfolio.vercel.app/",
      tags: ["Full-Stack", "ML / AI", "AgriTech", "Product Builder"],
      initials: "D",
    },
    {
      id: 1,
      name: "Ishaa",
      role: "Collaborator Slot",
      location: "Your Team",
      bio: "Add the next teammate’s details here – update the JSON in AboutSection to show their profile inside the AgroVerse portal.",
      github: "https://github.com/techcodings",
      linkedin: "https://www.linkedin.com/in/gouthamlm",
      website: "https://techcodings.github.io/gouthamlm",
      tags: ["Collaboration", "AgriTech", "Innovation"],
      initials: "+",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <div className="section-badge">
            <Users size={16} />
            <span>People behind AgroVerse</span>
          </div>
          <h2>Builders & Contributors</h2>
          <p>
            AgroVerse 2.0 is crafted by a focused team of AI, data and
            full-stack engineers who care about farmers, sustainability and
            real-world agricultural impact.
          </p>
        </div>

        <div className="about-grid">
          {people.map((person) => (
            <div key={person.id} className="about-card">
              <div className="about-card-header">
                <div className="about-avatar">
                  <span>{person.initials}</span>
                </div>
                <div>
                  <h3>{person.name}</h3>
                  <p className="about-role">{person.role}</p>
                  <p className="about-location">{person.location}</p>
                </div>
              </div>

              <p className="about-bio">{person.bio}</p>

              <div className="about-tags">
                {person.tags.map((tag) => (
                  <span key={tag} className="about-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="about-links">
                {person.github && person.github !== "#" && (
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                )}
                {person.linkedin && person.linkedin !== "#" && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {person.website && person.website !== "#" && (
                  <a
                    href={person.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe size={16} />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===========================
   USER MENU
   =========================== */

const UserMenu = ({ user, onLogout, onClose }) => {
  return (
    <div className="user-menu-dropdown">
      <div className="user-info">
        <User size={20} />
        <span>
          <b>{user.displayName || user.email?.split("@")[0]}</b>
        </span>
        <p className="user-email">{user.email}</p>
      </div>

      <div className="menu-divider" />

      <a href="#dashboard" onClick={onClose} className="menu-item">
        <Activity size={16} /> Dashboard
      </a>

      <a href="#profile" onClick={onClose} className="menu-item">
        <Settings size={16} /> Profile Settings
      </a>

      {localStorage.getItem("role") === "admin" && (
        <a href="/admin" onClick={onClose} className="menu-item">
          <LayoutDashboard size={16} /> Admin Panel
        </a>
      )}

      <div className="menu-divider" />

      <button onClick={onLogout} className="menu-item logout-btn">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
};

/* ===========================
   HEADER
   =========================== */

const Header = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  setShowSearch,
  onUserButtonClick,
  user,
  showUserMenu,
  setShowUserMenu,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserClick = (e) => {
    if (user) {
      e.stopPropagation();
      setShowUserMenu(!showUserMenu);
    } else {
      onUserButtonClick();
    }
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">
              <Leaf className="icon" />
            </div>
            <div className="logo-text">
              <h1>AgroVerse</h1>
              <p>AI-Powered Agriculture Platform</p>
            </div>
          </div>

          <nav className="header-nav">
            <a href="#features">Features</a>
            <a href="#capabilities">Capabilities</a>

            <Link
              to="/docs"
              className="px-4 py-2 rounded-md font-semibold text-[#caff37] 
                         border border-[#baff37]/40 hover:border-[#eaff91]/70
                         hover:text-[#eaff91] hover:shadow-[0_0_12px_rgba(186,255,55,0.6)]
                         bg-transparent transition-all duration-300 ease-in-out
                         hover:bg-[#baff37]/10"
            >
              Documentation
            </Link>

            <button className="icon-btn" onClick={() => setShowSearch(true)}>
              <Search size={20} />
            </button>

            {/* USER CONTROL */}
            <div className="user-control">
              <button className="btn-primary" onClick={handleUserClick}>
                {user
                  ? `Hello, ${user.displayName || user.email?.split("@")[0]}`
                  : "Get Started"}
              </button>
              {user && showUserMenu && (
                <UserMenu
                  user={user}
                  onLogout={onUserButtonClick}
                  onClose={() => setShowUserMenu(false)}
                />
              )}
            </div>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </a>
          <a href="#capabilities" onClick={() => setMobileMenuOpen(false)}>
            Capabilities
          </a>
          <a href="#integration" onClick={() => setMobileMenuOpen(false)}>
            Integration
          </a>
          <a href="#docs" onClick={() => setMobileMenuOpen(false)}>
            Documentation
          </a>
          <button
            className="btn-primary mobile"
            onClick={() => {
              onUserButtonClick();
              setMobileMenuOpen(false);
            }}
          >
            {user ? "Logout" : "Get Started"}
          </button>
        </div>
      )}
    </header>
  );
};

/* ===========================
   HERO
   =========================== */

const Hero = () => {
  const scrollToFeatures = () => {
    const section = document.querySelector("#features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-particles" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>16 AI-Powered Features • 40+ Data Sources • 10+ ML Models</span>
        </div>

        <h1 className="hero-title">
          The Future of
          <br />
          <span className="gradient-text">Agricultural Intelligence</span>
        </h1>

        <p className="hero-description">
          Comprehensive multimodal AI platform for crop health monitoring, pest
          forecasting, yield prediction, and intelligent farm management.
          Powered by cutting-edge ML models and real-time data integration from
          40+ global APIs.
        </p>

        <div className="hero-buttons">
          <button onClick={scrollToFeatures} className="btn-glitch large">
            <span>Explore Platform</span>
            <ArrowRight size={20} />
          </button>

          <a
            href="/app/app-release.apk"
            download
            className="btn-download large"
            rel="noopener"
          >
            <Download size={20} />
            <span>Download Android App</span>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-icon">
              <Leaf size={24} />
            </div>
            <div className="stat-value">16+</div>
            <div className="stat-label">AI Features</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Database size={24} />
            </div>
            <div className="stat-value">40+</div>
            <div className="stat-label">Data Sources</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Cpu size={24} />
            </div>
            <div className="stat-value">10+</div>
            <div className="stat-label">ML Models</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <Cloud size={24} />
            </div>
            <div className="stat-value">30+</div>
            <div className="stat-label">API Integrations</div>
          </div>
        </div>

        <div className="hero-trusted">
          <p>Trusted by leading agricultural organizations worldwide</p>
          <div className="trusted-logos">
            <div className="logo-placeholder">FAO</div>
            <div className="logo-placeholder">USDA</div>
            <div className="logo-placeholder">Copernicus</div>
            <div className="logo-placeholder">Open-Meteo</div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   SEARCH MODAL
   =========================== */

const SearchModal = ({ isOpen, onClose, features }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = useMemo(() => {
    if (!searchQuery) return features || [];
    const query = searchQuery.toLowerCase();
    return (features || []).filter(
      (f) =>
        (f.title || "").toLowerCase().includes(query) ||
        (f.desc || "").toLowerCase().includes(query) ||
        (f.tags || []).some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, features]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search features, capabilities, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="search-results">
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature) => {
              const Icon = feature.icon || Leaf;
              return (
                <div key={feature.id} className="search-result-item">
                  <div className={`result-icon ${feature.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="result-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                    <div className="result-tags">
                      {(feature.tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <p>No features found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===========================
   FEATURE MODAL
   =========================== */

const FeatureModal = ({ feature, isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !feature) return null;

  const Icon = feature.icon || Leaf;

  const handleViewDocs = () => {
    onClose();
    navigate("/docs", { state: { feature: feature.title } });
  };

  const handleTryDemo = () => {
    onClose();
    navigate(`/features/${feature.id}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="feature-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className={`modal-icon ${feature.color}`}>
            <Icon size={32} />
          </div>
          <div>
            <span className="modal-category">{feature.category}</span>
            <h2>{feature.title}</h2>
            <p>{feature.desc}</p>
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-section">
            <h3>
              <Box size={20} /> Inputs
            </h3>
            <ul>
              {(feature.inputs || []).map((input, idx) => (
                <li key={idx}>{input}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>
              <BarChart3 size={20} /> Outputs
            </h3>
            <ul>
              {(feature.outputs || []).map((output, idx) => (
                <li key={idx}>{output}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>
              <Cpu size={20} /> ML Technologies
            </h3>
            <div className="tech-tags">
              {(feature.ml || []).map((tech, idx) => (
                <span key={idx} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>
              <Database size={20} /> Data Sources
            </h3>
            <div className="dataset-grid">
              {(feature.datasets || []).map((dataset, idx) => (
                <div key={idx} className="dataset-item">
                  <Cloud size={16} />
                  <span>{dataset}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>
              <Code size={20} /> Integration Mode
            </h3>
            <p className="integration-mode">{feature.integration || "Backend + User Input"}</p>
          </div>

          <div className="modal-actions">
            <button className="btn-primary" onClick={handleTryDemo}>
              <Play size={18} /> Try Demo
            </button>

            <button onClick={handleViewDocs} className="view-docs-btn">
              📘 View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   FEATURE CARD
   =========================== */

const FeatureCard = ({ feature, index, onClick }) => {
  const Icon = feature.icon || Leaf;

  return (
    <div
      className="feature-card"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onClick(feature)}
    >
      <div className={`card-overlay ${feature.color}`} />

      <div className="card-content">
        <div className="card-header">
          <div className={`card-icon ${feature.color}`}>
            <Icon size={24} />
          </div>
          <span className="card-number">#{feature.id}</span>
        </div>

        <h3 className="card-title">{feature.title}</h3>

        <p className="card-description">{feature.desc}</p>

        <div className="card-tags">
          {(feature.tags || []).slice(0, 2).map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <div className="card-tech">
            <Cpu size={14} />
            <span className="card-tech-label">{(feature.ml || [])[0] || "ML model stack"}</span>
          </div>
          <div className="card-link">
            <span>Learn More</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   FEATURES SECTION
   =========================== */

const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All Features");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = ["All Features", ...Object.keys(featureCategories || {})];

  const displayedFeatures =
    activeCategory === "All Features"
      ? allFeatures || []
      : featureCategories?.[activeCategory] || [];

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowModal(true);
  };

  return (
    <>
      <section id="features" className="features-section">
        <div className="features-container">
          <div className="features-header">
            <div className="section-badge">
              <Filter size={16} />
              <span>Platform Features</span>
            </div>
            <h2 data-text="Comprehensive Agro-Intelligence Suite">
              Comprehensive Agro-Intelligence Suite
            </h2>
            <p>
              16 advanced AI-powered features for complete farm management, from
              crop health and pest detection to yield forecasting and market
              simulation.
            </p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-tab ${activeCategory === category ? "active" : ""}`}
              >
                {category}
                <span className="tab-count">
                  {category === "All Features"
                    ? (allFeatures || []).length
                    : (featureCategories[category] || []).length || 0}
                </span>
              </button>
            ))}
          </div>

          <div className="features-grid">
            {displayedFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                onClick={handleFeatureClick}
              />
            ))}
          </div>
        </div>
      </section>

      <FeatureModal feature={selectedFeature} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

/* ===========================
   CAPABILITIES SECTION
   =========================== */

const CapabilitiesSection = () => {
  const capabilities = [
    {
      icon: LineChart,
      title: "Advanced Analytics",
      desc: "Real-time data processing with predictive analytics and ML-driven insights",
      features: ["Time Series Forecasting", "Anomaly Detection", "Predictive Maintenance"],
    },
    {
      icon: MapPin,
      title: "Geospatial Intelligence",
      desc: "Satellite imagery analysis with interactive mapping and spatial correlation",
      features: ["Sentinel-2 Integration", "GeoJSON Support", "Regional Analysis"],
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      desc: "Proactive notifications with customizable thresholds and multi-channel delivery",
      features: ["Real-time Alerts", "SMS/Push/Email", "Severity Ranking"],
    },
    {
      icon: Code,
      title: "API-First Design",
      desc: "RESTful APIs with comprehensive documentation and SDK support",
      features: ["REST API", "WebSocket", "GraphQL Support"],
    },
  ];

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="capabilities-container">
        <div className="section-header">
          <div className="section-badge">
            <Shield size={16} />
            <span>Core Capabilities</span>
          </div>
          <h2>Built for Enterprise Scale</h2>
          <p>Production-ready infrastructure with enterprise-grade security and performance</p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((capability, idx) => {
            const Icon = capability.icon || LineChart;
            return (
              <div key={idx} className="capability-card">
                <div className="capability-icon">
                  <Icon size={28} />
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.desc}</p>
                <ul className="capability-features">
                  {capability.features.map((feature, i) => (
                    <li key={i}>
                      <ChevronRight size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ===========================
   FOOTER
   =========================== */

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column main">
            <div className="footer-logo">
              <div className="logo-icon">
                <Leaf className="icon" />
              </div>
              <span>AgroVerse</span>
            </div>
            <p className="footer-description">
              AI-powered agricultural intelligence platform for a sustainable future. Integrating 40+ data sources with 10+ ML models.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="GitHub">GitHub</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Platform</h3>
            <ul>
              <li><a href="#features">All Features</a></li>
              <li>
                <Link to="/docs" className="px-4 py-2 rounded-md font-semibold text-[#caff37] 
                             border border-[#baff37]/40 hover:border-[#eaff91]/70
                             hover:text-[#eaff91] hover:shadow-[0_0_12px_rgba(186,255,55,0.6)]
                             bg-transparent transition-all duration-300 ease-in-out
                             hover:bg-[#baff37]/10">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Data Sources</h3>
            <ul>
              <li><a href="#">Sentinel-2 / Landsat</a></li>
              <li><a href="#">FAO / USDA</a></li>
              <li><a href="#">Open-Meteo</a></li>
              <li><a href="#">Copernicus</a></li>
              <li><a href="#">View All →</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 AgroVerse. All rights reserved. Built with 💚 for a sustainable future.</p>
          <div className="footer-links">
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#privacy">Privacy</a>
            <span>•</span>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ===========================
   MAIN COMPONENT
   =========================== */

export default function VersePortal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Main handler for 'Get Started' / 'Hello, User'
  const handleUserButtonClick = async () => {
    if (user) {
      try {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("role");
        setShowUserMenu(false);
        navigate("/");
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Logout error:", error);
        alert("Failed to log out.");
      }
    } else {
      setShowAuth(true);
    }
  };

  // After successful login/signup
  const handleAuthSuccess = async (userData) => {
    setUser(userData);
    setShowAuth(false);

    try {
      const userRef = doc(db, "users", userData.uid);
      const userSnap = await getDoc(userRef);

      const role = userSnap.exists() ? userSnap.data().role : "user";

      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Close the UserMenu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showUserMenu && !e.target.closest(".user-control")) {
        setShowUserMenu(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showUserMenu]);

  // If user is not logged in, show only the Auth page
  if (!user) {
    return (
      <div className="auth-only-screen">
        <Auth onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Logged-in view
  return (
    <div className="app">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setShowSearch={setShowSearch}
        onUserButtonClick={handleUserButtonClick}
        user={user}
        showUserMenu={showUserMenu}
        setShowUserMenu={setShowUserMenu}
      />

      <Hero />
      <AboutSection />

      <FeaturesSection />
      <CapabilitiesSection />
      <Footer />

      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} features={allFeatures} />
    </div>
  );
}
