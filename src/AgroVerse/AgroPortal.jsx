import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Menu, X, ChevronRight, Sun, Wind, Battery, Zap, TrendingUp, Globe, 
  Activity, AlertTriangle, BarChart3, Database, Leaf, Users, Settings,
  Search, Filter, ArrowRight, Play, Bell, Code, MapPin, LineChart, Shield, 
  Cpu, Cloud, Box, GitBranch, LogOut, User, LayoutDashboard, MessageSquare, Download,
  Github, Linkedin
} from 'lucide-react';
import './AgroPortal.css';
import Auth from '../components/Auth';
import FeatureDocsModal from "../components/FeatureDocsModal"; // (import kept)
import { auth, db } from '../config/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";


// Complete feature data with all 16 AgroVerse features
const allFeatures = [
  {
    id: 1,
    title: 'Crop Health Intelligence',
    icon: Leaf,
    category: 'Field Monitoring',
    color: 'green-emerald',
    desc: 'Real-time analysis of crop health using satellite and weather data.',
    inputs: ['Sentinel-2 NDVI/EVI', 'MODIS NDVI/EVI', 'Landsat-8/9 NDVI/EVI', 'Soil-adjusted indices (SAVI, MSAVI)', 'Weather (Open-Meteo)', 'Terrain/elevation (Open-Elevation)', 'Soil type (Copernicus)', 'Irrigation coverage (FAO AQUASTAT)', 'Regional agricultural statistics (USDA Quick Stats)', 'Optional field boundaries (GeoJSON)', 'Observation notes / field photos'],
    outputs: ['Field-level vegetation health maps', 'Stress detection: water, nutrient, disease', 'Temporal crop health trends', 'Field segmentation for management zones', 'Irrigation, fertilization, pesticide recommendations', 'Alerts for sudden drops in vegetation indices', 'Printable reports with annotated maps'],
    ml: ['Multimodal Transformer (Perceiver IO)', 'GAN / Diffusion Hybrid', 'RL (MuZero)', 'Temporal Forecasting: TFT + N-BEATS', 'GNN', 'End-to-End MLOps pipeline'],
    datasets: ['Sentinel-2', 'MODIS', 'Landsat-8/9', 'Open-Meteo', 'Copernicus', 'FAO AQUASTAT', 'USDA Quick Stats'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Crop Health', 'Monitoring', 'AI', 'Satellite']
  },
  {
    id: 2,
    title: 'Pest & Disease Early Warning',
    icon: AlertTriangle,
    category: 'Field Monitoring',
    color: 'red-pink',
    desc: 'Early warning system for pest and disease outbreaks.',
    inputs: ['Sentinel-2 NDVI/LAI', 'MODIS LAI', 'Weather (Open-Meteo)', 'FAO bulletins', 'Twitter/X API (free tier)', 'Plant data (Perenual API)', 'Land-use maps (OpenStreetMap)', 'Optional local agricultural extension data', 'Pest sightings'],
    outputs: ['Pest/disease risk heatmaps', 'Outbreak probability per crop', 'Species-specific pest/disease alerts', 'Trend analysis of occurrences', 'Suggested control measures', 'Community notifications and alerts', 'Reports for agricultural extension workers'],
    ml: ['Multimodal Transformer', 'RL (DreamerV3)', 'GNN', 'End-to-End MLOps'],
    datasets: ['Sentinel-2', 'MODIS', 'Open-Meteo', 'FAO', 'Twitter/X', 'OpenStreetMap'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Pest', 'Disease', 'Warning', 'AI']
  },
  {
    id: 3,
    title: 'Generative Future Crop Visualization',
    icon: TrendingUp,
    category: 'Forecasting & Simulation',
    color: 'blue-cyan',
    desc: 'Simulate future crop growth and rotation scenarios.',
    inputs: ['Historical NDVI/EVI', 'Landsat-8/9 NDVI', 'MODIS NDVI/EVI', 'Weather forecast (Open-Meteo)', 'Terrain + soil (Copernicus)', 'Crop rotation/planting schedule datasets', 'Ag Data Commons datasets', 'Crop rotation plan / planting schedule'],
    outputs: ['Simulated crop growth imagery', 'Multi-season crop rotation simulations', 'Growth stage predictions', '“What-if” scenario visualizations', 'Crop selection suggestions', 'Recommended optimal planting schedule'],
    ml: ['One-Shot GAN / Diffusion Hybrid', 'RL (MuZero)', 'Temporal Forecasting: TFT + Informer', 'End-to-End MLOps'],
    datasets: ['Landsat-8/9', 'MODIS', 'Open-Meteo', 'Copernicus', 'Ag Data Commons'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Simulation', 'Generative AI', 'Forecasting']
  },
  {
    id: 4,
    title: 'Water Stress & Irrigation Advisor',
    icon: Sun,
    category: 'Field Monitoring',
    color: 'yellow-orange',
    desc: 'Optimize irrigation schedules based on water stress models.',
    inputs: ['NDVI & soil moisture (Copernicus, SMAP/ESA CCI)', 'Rainfall & humidity (Open-Meteo)', 'Terrain slope/aspect (Open-Elevation)', 'Crop type maps (Copernicus)', 'Irrigation cost data (USDA ARMS)', 'ETa maps from MODIS', 'Groundwater table depth', 'Field conditions', 'Irrigation type / method'],
    outputs: ['Soil moisture maps', 'Water stress levels per field/crop', 'Irrigation scheduling & optimization', 'Cost-benefit analysis of irrigation strategies', 'Evapotranspiration maps', 'Rainfall deficit alerts', 'Recommended irrigation methods'],
    ml: ['RL (MuZero)', 'Multimodal Transformer', 'PINN', 'Temporal Forecasting: TFT + Neural ODEs', 'End-to-End MLOps'],
    datasets: ['Copernicus', 'SMAP', 'Open-Meteo', 'Open-Elevation', 'USDA ARMS', 'MODIS'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Water', 'Irrigation', 'Optimization', 'AI']
  },
  {
    id: 5,
    title: 'Climate Impact & Anomaly Detector',
    icon: Globe,
    category: 'Analytics & Intelligence',
    color: 'blue-indigo',
    desc: 'Detects climate anomalies and assesses impact on crops.',
    inputs: ['Historical & real-time weather (Open-Meteo)', 'NDVI/EVI (Sentinel-2, MODIS)', 'Soil/terrain (Copernicus)', 'NewsAPI free tier / FAO bulletins', 'Historical crop patterns (EuroCropsML)', 'Climate indices (SPI, SPEI)', 'Extreme events datasets (NASA FIRMS)', 'Observations of local extreme events'],
    outputs: ['Climate anomaly alerts (drought, flood, heatwave)', 'Impact assessment on current crops', 'Trend analysis of extreme events', 'Localized climate risk scores', 'SPI/SPEI temporal visualization', 'Predictive alerts for upcoming anomalies', 'Reports linking climate anomalies to crop yield'],
    ml: ['RL (ConnectX / MuZero)', 'Multimodal Transformer', 'Temporal Forecasting: TFT + Informer', 'Bayesian Ensembles', 'End-to-End MLOps pipeline'],
    datasets: ['Open-Meteo', 'Sentinel-2', 'MODIS', 'Copernicus', 'NewsAPI', 'EuroCropsML', 'NASA FIRMS'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Climate', 'Anomaly', 'Risk', 'Impact']
  },
  {
    id: 6,
    title: 'Knowledge Graph of Agro-Events',
    icon: GitBranch,
    category: 'Analytics & Intelligence',
    color: 'violet-purple',
    desc: 'Interactive knowledge graph linking all agricultural events.',
    inputs: ['FAO bulletins', 'Satellite imagery changes', 'Weather streams (Open-Meteo)', 'Pest/disease alerts (FAO bulletins)', 'Crop breeding/genetic data (BrAPI)', 'Land Use/Land Cover datasets (ESA CCI)', 'Remote sensing-derived phenology data', 'Local agricultural events'],
    outputs: ['Visual knowledge graph linking events, crops, pests, climate', 'Insights into causal relationships', 'Alerts for high-risk event chains', 'Intervention strategy suggestions', 'Event-driven scenario predictions', 'Searchable database of agro-events'],
    ml: ['Graph Neural Network / Graphormer', 'Multimodal Transformer', 'RL (MuZero)', 'End-to-End MLOps'],
    datasets: ['FAO', 'Sentinel-2', 'Open-Meteo', 'BrAPI', 'ESA CCI'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Knowledge Graph', 'Events', 'AI', 'GNN']
  },
  {
    id: 7,
    title: 'Market & Policy Trend Simulator',
    icon: TrendingUp,
    category: 'Forecasting & Simulation',
    color: 'indigo-purple',
    desc: 'Simulates market trends and policy impacts on crop prices.',
    inputs: ['Weather & NDVI changes (Open-Meteo, Sentinel-2)', 'Crop growth simulations', 'FAO market & policy reports', 'NewsAPI free tier', 'Open Food Facts API', 'Commodity price APIs (World Bank, FAO GIEWS)', 'Subsidy/government scheme data', 'Local market prices / farm-level costs'],
    outputs: ['Crop price forecasts (local & global)', 'Policy impact simulations', 'Supply-demand balance predictions', 'Profitability analysis per crop/season', 'Scenario-based crop choice recommendations', 'Market price alerts', 'Visualization of trends & policy effects'],
    ml: ['Temporal Fusion Transformer + N-BEATS', 'RL (MuZero / Agent57)', 'Anomaly Detection / Bayesian Ensembles', 'End-to-End MLOps'],
    datasets: ['Open-Meteo', 'Sentinel-2', 'FAO', 'NewsAPI', 'Open Food Facts', 'World Bank'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Market', 'Policy', 'Economics', 'Simulation']
  },
  {
    id: 8,
    title: 'Multilingual LLM Agro Assistant',
    icon: MessageSquare,
    category: 'Analytics & Intelligence',
    color: 'pink-rose',
    desc: 'AI assistant for agro queries in English and Bangla.',
    inputs: ['Text queries (Bangla, English, local terms)', 'Optional voice input', 'Optional field boundaries (GeoJSON)', 'Satellite/weather maps (Sentinel-2, Open-Meteo)', 'Ag Data Commons datasets', 'Crop issues or local conditions'],
    outputs: ['Text/voice-based advice in multiple languages', 'Contextual crop management recommendations', 'Summarized weather & satellite insights', 'Pest/disease identification guides', 'Interactive Q&A with local terminology', 'Personalized recommendations', 'Downloadable guidance reports'],
    ml: ['Large LLM (LLaMA 3 / GPT-4 fine-tuned)', 'Multi-lingual ASR', 'Multimodal Transformer', 'End-to-End MLOps'],
    datasets: ['Sentinel-2', 'Open-Meteo', 'Ag Data Commons', 'Internal Knowledge Base'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['AI Assistant', 'LLM', 'Multilingual', 'NLP']
  },
  {
    id: 9,
    title: 'Crop Yield & Growth Forecasting',
    icon: LineChart,
    category: 'Forecasting & Simulation',
    color: 'cyan-blue',
    desc: 'Forecast crop yield and growth stages per field.',
    inputs: ['NDVI/EVI time series (Sentinel-2, MODIS, Landsat)', 'Weather forecasts (Open-Meteo)', 'Soil + terrain (Copernicus)', 'Crop type mapping (Copernicus)', 'Historical yield data (EuroCropsML, national statistics)', 'Remote sensing indices (LAI, fAPAR)', 'Crop-specific phenology models', 'Local cultivation practices'],
    outputs: ['Predicted yield per field & crop', 'Growth stage timelines', 'Yield deviation alerts', 'Zone-specific yield maps', 'Recommendations to improve yield', 'Comparative analysis across seasons/farms'],
    ml: ['Multimodal Transformer', 'Temporal Forecasting: TFT + N-BEATS', 'RL (MuZero)', 'GNN', 'Bayesian Ensembles', 'End-to-End MLOps pipeline'],
    datasets: ['Sentinel-2', 'MODIS', 'Landsat', 'Open-Meteo', 'Copernicus', 'EuroCropsML'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Yield', 'Forecasting', 'AI', 'Growth']
  },
  {
    id: 10,
    title: 'Risk & Alert Dashboard',
    icon: Shield,
    category: 'Analytics & Intelligence',
    color: 'red-orange',
    desc: 'Unified dashboard for all farm-related risks and alerts.',
    inputs: ['Aggregated outputs from Features 1–9', 'Real-time weather & satellite feeds (Open-Meteo, Sentinel-2)', 'Crop type & soil maps (Copernicus)', 'USDA Quick Stats & Open Food Facts API', 'Field conditions', 'Community pest/disease events', 'Local emergency events / irrigation problems'],
    outputs: ['Aggregated risk scores: pest, disease, water, market, climate', 'Interactive dashboards: maps, charts, tables', 'Real-time alerts & notifications', 'Community-reported event visualization', 'Customizable alert thresholds', 'Historical risk trends & projections'],
    ml: ['RL (ConnectX)', 'Multimodal Transformer', 'Concept Drift / Anomaly Detection', 'End-to-End MLOps'],
    datasets: ['Open-Meteo', 'Sentinel-2', 'Copernicus', 'USDA', 'Open Food Facts', 'User Reports'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Risk', 'Dashboard', 'Alerts', 'Monitoring']
  },
  {
    id: 11,
    title: 'Soil Nutrient & Fertility Advisor',
    icon: Database,
    category: 'Field Monitoring',
    color: 'amber-yellow',
    desc: 'Analyzes soil data to recommend fertilizer and nutrients.',
    inputs: ['Soil type (Copernicus)', 'Farmer soil test reports', 'Crop nutrient requirement datasets (FAO)', 'Weather (Open-Meteo)', 'Optional NDVI/EVI historical data', 'Fertilizer usage history'],
    outputs: ['Soil nutrient maps (N, P, K, microelements)', 'Fertility stress detection', 'Fertilizer recommendations (dose, timing, method)', 'Predicted crop response to fertilization', 'Nutrient deficiency alerts', 'Temporal nutrient trend comparison'],
    ml: ['Multimodal Transformer', 'RL (MuZero)', 'Temporal Forecasting: TFT + Neural ODEs', 'GAN / Diffusion', 'End-to-End MLOps'],
    datasets: ['Copernicus', 'FAO', 'Open-Meteo', 'User Reports'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Soil', 'Nutrients', 'Fertilizer', 'AI']
  },
  {
    id: 12,
    title: 'Crop Variety / Breeding Recommendation',
    icon: Settings,
    category: 'Analytics & Intelligence',
    color: 'purple-indigo',
    desc: 'Recommends optimal crop varieties based on genetics and climate.',
    inputs: ['Crop type', 'Local climate (Open-Meteo)', 'Soil type (Copernicus)', 'Historical yield data', 'Genetic data (BrAPI)', 'Preferred crop varieties'],
    outputs: ['Recommended crop varieties per soil-climate combo', 'Expected yield comparison', 'Disease resistance suitability', 'Climate adaptation suitability', 'Interactive variety recommendation dashboard'],
    ml: ['Graph Neural Network', 'RL (MuZero)', 'Multimodal Transformer', 'End-to-End MLOps'],
    datasets: ['Open-Meteo', 'Copernicus', 'BrAPI', 'Historical Yield Data'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Crops', 'Genetics', 'Recommendation', 'GNN']
  },
  {
    id: 13,
    title: 'Farmer Community Knowledge Exchange',
    icon: Users,
    category: 'Analytics & Intelligence',
    color: 'orange-red',
    desc: 'A platform for farmers to share knowledge and alerts.',
    inputs: ['Farmer-submitted observations (text, images)', 'Satellite/NDVI overlays', 'Pest/disease alerts', 'Weather forecasts', 'Community alerts / comments'],
    outputs: ['Shared community observations', 'Pest/disease outbreak alerts', 'Collaborative problem-solving threads', 'Interactive maps of community-reported events', 'Crop management tips from peers', 'Aggregated local best practices'],
    ml: ['Multimodal Transformer', 'GNN', 'RL (ConnectX)', 'End-to-End MLOps'],
    datasets: ['User Reports', 'Sentinel-2', 'Open-Meteo'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Community', 'Farmer', 'Knowledge', 'Social']
  },
  {
    id: 14,
    title: 'Precision Harvest & Logistics Planner',
    icon: MapPin,
    category: 'Forecasting & Simulation',
    color: 'teal-green',
    desc: 'Plan optimal harvest dates and logistics.',
    inputs: ['Predicted crop growth stages', 'Yield forecast', 'Weather forecast', 'Farm location', 'Market price data (World Bank / Open Food Facts)', 'Preferred harvest labor / transport resources'],
    outputs: ['Optimal harvest dates', 'Labor & resource allocation plans', 'Transportation route suggestions', 'Predicted harvest vs actual yield comparison', 'Market-informed harvest prioritization', 'Alerts for harvest window closure', 'Printable harvest & logistics schedules'],
    ml: ['RL (MuZero / Agent57)', 'Temporal Forecasting: TFT + Informer', 'Multimodal Transformer', 'End-to-End MLOps'],
    datasets: ['Open-Meteo', 'World Bank', 'Open Food Facts', 'User Inputs'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Harvest', 'Logistics', 'Planning', 'Optimization']
  },
  {
    id: 15,
    title: 'Eco-Impact & Sustainability Analyzer',
    icon: Leaf,
    category: 'Field Monitoring',
    color: 'green-dark',
    desc: 'Analyze the environmental footprint and sustainability of farm practices.',
    inputs: ['Pesticide/fertilizer use', 'NDVI/LAI', 'Water use (optional sensors)', 'Soil maps', 'Climate data', 'Planned sustainability practices'],
    outputs: ['Environmental footprint per field/farm', 'Sustainability scoring / rating', 'Recommendations to reduce chemical/water use', 'Long-term soil health projections', 'Carbon footprint estimation', 'Suggested eco-friendly practices', 'Impact comparison (conventional vs sustainable methods)'],
    ml: ['Multimodal Transformer', 'GAN / Diffusion', 'RL (MuZero)', 'End-to-End MLOps'],
    datasets: ['Sentinel-2', 'Copernicus', 'Open-Meteo', 'User Reports'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Sustainability', 'Eco', 'Impact', 'Carbon']
  },
  {
    id: 16,
    title: 'Extreme Event Simulation & Adaptation',
    icon: AlertTriangle,
    category: 'Forecasting & Simulation',
    color: 'rose-pink',
    desc: 'Simulate extreme events and plan adaptation strategies.',
    inputs: ['Historical climate events', 'NDVI/EVI', 'Crop type', 'Soil type', 'SPI/SPEI indices', 'Local adaptation measures / emergency plans'],
    outputs: ['Simulated impact of floods, droughts, heatwaves', 'Adaptive management strategies', 'Emergency action plans per field', 'Risk maps for extreme events', 'Predicted crop yield loss under various scenarios', 'Resilience scores per farm', 'Recommendations for climate-resilient crop planning'],
    ml: ['RL (MuZero / ConnectX)', 'Multimodal Transformer', 'Temporal Forecasting: TFT + Neural ODEs', 'Bayesian Ensemble', 'End-to-End MLOps'],
    datasets: ['Open-Meteo', 'Sentinel-2', 'Copernicus', 'Climate Indices', 'User Plans'],
    integration: 'Backend + User Input',
    demoUrl: "",
    tags: ['Risk', 'Simulation', 'Climate', 'Adaptation']
  }
];


// Group features by category
const featureCategories = allFeatures.reduce((acc, feature) => {
  if (!acc[feature.category]) {
    acc[feature.category] = [];
  }
  acc[feature.category].push(feature);
  return acc;
}, {});


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
      initials: "LMG"
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
      initials: "D"
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
      initials: "+"
    }
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
            AgroVerse 2.0 is crafted by a focused team of AI, data and full-stack
            engineers who care about farmers, sustainability and real-world agricultural impact.
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


// --- New User Menu Component ---
const UserMenu = ({ user, onLogout, onClose }) => {
  return (
    <div className="user-menu-dropdown">
      <div className="user-info">
        <User size={20} />
        <span><b>{user.displayName || user.email?.split('@')[0]}</b></span>
        <p className="user-email">{user.email}</p>
      </div>

      <div className="menu-divider"></div>

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

      <div className="menu-divider"></div>

      <button onClick={onLogout} className="menu-item logout-btn">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
};


// ------------------------------

const Header = ({ mobileMenuOpen, setMobileMenuOpen, setShowSearch, onUserButtonClick, user, showUserMenu, setShowUserMenu }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserClick = (e) => {
    if (user) {
      // If user is logged in, toggle the dropdown menu
      e.stopPropagation(); 
      setShowUserMenu(!showUserMenu);
    } else {
      // If user is logged out, show the Auth modal
      onUserButtonClick(); 
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
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
            
            {/* ↓ USER CONTROL CONTAINER */}
            <div className="user-control">
              <button 
                className="btn-primary" 
                onClick={handleUserClick}
              >
                {user ? `Hello, ${user.displayName || user.email?.split('@')[0]}` : 'Get Started'}
              </button>
              {user && showUserMenu && (
                <UserMenu 
                  user={user} 
                  onLogout={onUserButtonClick}
                  onClose={() => setShowUserMenu(false)}
                />
              )}
            </div>
            {/* ↑ USER CONTROL CONTAINER */}
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#capabilities" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
          <a href="#integration" onClick={() => setMobileMenuOpen(false)}>Integration</a>
          <a href="#docs" onClick={() => setMobileMenuOpen(false)}>Documentation</a>
          {/* Mobile button should either log out or open Auth */}
          <button className="btn-primary mobile" onClick={() => { onUserButtonClick(); setMobileMenuOpen(false); }}>
            {user ? 'Logout' : 'Get Started'}
          </button>
        </div>
      )}
    </header>
  );
};


const Hero = () => {
  const scrollToFeatures = () => {
    const section = document.querySelector("#features");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-particles"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot"></span>
          <span>16 AI-Powered Features • 40+ Data Sources • 10+ ML Models</span>
        </div>

        <h1 className="hero-title">
          The Future of<br />
          <span className="gradient-text">Agricultural Intelligence</span>
        </h1>

        <p className="hero-description">
          Comprehensive multimodal AI platform for crop health monitoring, pest forecasting, 
          yield prediction, and intelligent farm management. Powered by cutting-edge ML models 
          and real-time data integration from 40+ global APIs.
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
            <div className="stat-icon"><Leaf size={24} /></div>
            <div className="stat-value">16+</div>
            <div className="stat-label">AI Features</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Database size={24} /></div>
            <div className="stat-value">40+</div>
            <div className="stat-label">Data Sources</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Cpu size={24} /></div>
            <div className="stat-value">10+</div>
            <div className="stat-label">ML Models</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Cloud size={24} /></div>
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


const SearchModal = ({ isOpen, onClose, features }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFeatures = useMemo(() => {
    if (!searchQuery) return features;
    const query = searchQuery.toLowerCase();
    return features.filter(f => 
      f.title.toLowerCase().includes(query) ||
      f.desc.toLowerCase().includes(query) ||
      f.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, features]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
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
            filteredFeatures.map(feature => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="search-result-item">
                  <div className={`result-icon ${feature.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="result-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                    <div className="result-tags">
                      {feature.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
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

  const handleViewDocs = () => {
    onClose();
    navigate("/docs", { state: { feature: feature.title } });
  };

  if (!isOpen || !feature) return null;

  const Icon = feature.icon;

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
            <h3><Box size={20} /> Inputs</h3>
            <ul>
              {feature.inputs.map((input, idx) => (
                <li key={idx}>{input}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3><BarChart3 size={20} /> Outputs</h3>
            <ul>
              {feature.outputs.map((output, idx) => (
                <li key={idx}>{output}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3><Cpu size={20} /> ML Technologies</h3>
            <div className="tech-tags">
              {feature.ml.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3><Database size={20} /> Data Sources</h3>
            <div className="dataset-grid">
              {feature.datasets.map((dataset, idx) => (
                <div key={idx} className="dataset-item">
                  <Cloud size={16} />
                  <span>{dataset}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3><Code size={20} /> Integration Mode</h3>
            <p className="integration-mode">{feature.integration}</p>
          </div>

          <div className="modal-actions">
            <button
              className="btn-primary"
              onClick={() => window.open(feature.demoUrl, "_blank")}
              disabled={!feature.demoUrl}
            >
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


const FeatureCard = ({ feature, index, onClick }) => {
  const Icon = feature.icon;
  
  return (
    <div 
      className="feature-card"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onClick(feature)}
    >
      <div className={`card-overlay ${feature.color}`}></div>
      
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
          {feature.tags.slice(0, 2).map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>

        <div className="card-footer">
          <div className="card-tech">
            <Cpu size={14} />
            <span>{feature.ml[0]}</span>
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


const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Features');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = ['All Features', ...Object.keys(featureCategories)];
  
  const displayedFeatures = activeCategory === 'All Features' 
    ? allFeatures 
    : featureCategories[activeCategory];

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
              16 advanced AI-powered features for complete farm management, 
              from crop health and pest detection to yield forecasting and market simulation.
            </p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
                <span className="tab-count">
                  {category === 'All Features' ? allFeatures.length : featureCategories[category]?.length || 0}
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

      <FeatureModal 
        feature={selectedFeature}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};


const CapabilitiesSection = () => {
  const capabilities = [
    {
      icon: LineChart,
      title: 'Advanced Analytics',
      desc: 'Real-time data processing with predictive analytics and ML-driven insights',
      features: ['Time Series Forecasting', 'Anomaly Detection', 'Predictive Maintenance']
    },
    {
      icon: MapPin,
      title: 'Geospatial Intelligence',
      desc: 'Satellite imagery analysis with interactive mapping and spatial correlation',
      features: ['Sentinel-2 Integration', 'GeoJSON Support', 'Regional Analysis']
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      desc: 'Proactive notifications with customizable thresholds and multi-channel delivery',
      features: ['Real-time Alerts', 'SMS/Push/Email', 'Severity Ranking']
    },
    {
      icon: Code,
      title: 'API-First Design',
      desc: 'RESTful APIs with comprehensive documentation and SDK support',
      features: ['REST API', 'WebSocket', 'GraphQL Support']
    }
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
            const Icon = capability.icon;
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
              AI-powered agricultural intelligence platform for a sustainable future.
              Integrating 40+ data sources with 10+ ML models.
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


export default function VersePortal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAuth, setShowAuth] = useState(false); 
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // 1. Firebase Auth Listener for persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  
  // 2. Main handler for 'Get Started' / 'Hello, User' button
  const handleUserButtonClick = async () => {
    if (user) {
      try {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("role");
        setShowUserMenu(false);
        navigate("/");
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to log out.');
      }
    } else {
      setShowAuth(true);
    }
  };

  // 3. Callback after successful login/signup from Auth.jsx
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

  // 4. Close the UserMenu when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showUserMenu && !e.target.closest('.user-control')) {
        setShowUserMenu(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showUserMenu]);

  // 🔒 If user is not logged in, show only the Auth page
  if (!user) {
    return (
      <div className="auth-only-screen">
        <Auth 
          onClose={() => setShowAuth(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  // ✅ Once logged in, show the full website
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
      
      <SearchModal 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        features={allFeatures}
      />
    </div>
  );
}
