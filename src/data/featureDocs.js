// src/data/featureDocs.js

export const featureDocs = {
  "Crop Health Intelligence": {
    overview:
      "Fuses satellite indices, terrain, soil and weather streams to assess crop vigor, detect stress early, and recommend actionable interventions at field level.",
    inputs: [
      "Sentinel-2 / MODIS / Landsat-8/9 NDVI/EVI",
      "Soil-adjusted indices (SAVI, MSAVI)",
      "Open-Meteo weather (temp, precipitation, humidity, wind)",
      "Open-Elevation DEM (slope/aspect/curvature)",
      "Copernicus soil type",
      "FAO AQUASTAT irrigation coverage",
      "USDA Quick Stats regional ag statistics",
      "Optional: Field boundaries (GeoJSON), notes/photos"
    ],
    outputs: [
      "Vegetation health maps (NDVI/EVI/SAVI/MSAVI)",
      "Water / nutrient / disease stress detection",
      "Temporal crop-health trends",
      "Management-zone segmentation",
      "Irrigation / fertilization / pesticide recommendations",
      "Sudden vegetation drop alerts",
      "Printable reports with annotated maps"
    ],
    ml: [
      "Multimodal Transformer (Perceiver IO)",
      "GAN / Diffusion hybrid (stress visualization)",
      "RL (MuZero) for adaptive recommendations",
      "Temporal Forecasting: TFT + N-BEATS",
      "GNN for inter-field correlation",
      "End-to-End MLOps pipeline"
    ],
    integration:
      "Back end aggregates satellite/weather/terrain/soil and optional user inputs; pipelines produce maps, trends, alerts, and prescriptions.",
    useCases: [
      "Farm-scale crop condition monitoring",
      "Early stress discovery and mitigation",
      "Seasonal benchmarking and reporting"
    ]
  },

  "Pest & Disease Early Warning": {
    overview:
      "Combines vegetation/leaf-area signals, weather, bulletins, and social streams to estimate outbreak risk and trigger early interventions.",
    inputs: [
      "Sentinel-2 NDVI/LAI, MODIS LAI",
      "Open-Meteo weather",
      "FAO bulletins",
      "Twitter/X (free tier) signals",
      "Perenual plant data",
      "OpenStreetMap land-use",
      "Optional: local extension data, pest sightings"
    ],
    outputs: [
      "Pest/disease risk heatmaps",
      "Outbreak probability per crop",
      "Species-specific alerts",
      "Occurrence trend analysis",
      "Suggested control measures",
      "Community notifications",
      "Extension-ready reports"
    ],
    ml: [
      "Multimodal Transformer (satellite + weather + text/social)",
      "RL (DreamerV3) for intervention timing",
      "GNN for spatial propagation",
      "End-to-End MLOps"
    ],
    integration:
      "Risk scoring fuses spectral, climatic, and textual signals; alerts route to users and community channels.",
    useCases: [
      "District-level early warning",
      "Targeted spraying advisories",
      "Extension service dashboards"
    ]
  },

  "Generative Future Crop Visualization": {
    overview:
      "Generates plausible future crop imagery and rotation scenarios using historical indices, forecast weather, terrain/soil, and plans.",
    inputs: [
      "Historical NDVI/EVI (Landsat-8/9, MODIS)",
      "Open-Meteo weather forecast",
      "Copernicus terrain/soil",
      "Crop rotation / planting schedule datasets",
      "Ag Data Commons",
      "User: rotation plan / schedule"
    ],
    outputs: [
      "Simulated crop growth imagery",
      "Multi-season rotation simulations",
      "Growth-stage predictions",
      "‘What-if’ scenario visuals",
      "Crop selection suggestions",
      "Optimal planting schedule"
    ],
    ml: [
      "One-Shot GAN / Diffusion hybrid",
      "RL (MuZero) for rotation optimization",
      "Temporal Forecasting: TFT + Informer",
      "End-to-End MLOps"
    ],
    integration:
      "Scenario engine renders synthetic growth under forecasted conditions and user plans; outputs visuals and schedules.",
    useCases: [
      "Rotation planning and stakeholder demos",
      "Advisory for input procurement",
      "Extension training visuals"
    ]
  },

  "Water Stress & Irrigation Advisor": {
    overview:
      "Estimates soil moisture and water stress to recommend optimal irrigation timing, amount, and method under cost constraints.",
    inputs: [
      "NDVI & soil moisture (Copernicus, SMAP/ESA CCI)",
      "Open-Meteo rainfall & humidity",
      "Open-Elevation slope/aspect",
      "Copernicus crop type maps",
      "USDA ARMS irrigation cost data",
      "MODIS ETa maps",
      "User: groundwater depth, field conditions, irrigation method"
    ],
    outputs: [
      "Soil moisture maps",
      "Field/crop water-stress levels",
      "Irrigation schedules & optimization",
      "Cost-benefit strategy analysis",
      "Evapotranspiration maps",
      "Rainfall-deficit alerts",
      "Method recommendations"
    ],
    ml: [
      "RL (MuZero) for scheduling",
      "Multimodal Transformer (fusion)",
      "PINN (water modeling)",
      "TFT + Neural ODEs",
      "End-to-End MLOps"
    ],
    integration:
      "Combines EO/meteorology/topography with field inputs; prescribes water strategies with economics.",
    useCases: [
      "Canal/groundwater scheduling",
      "Deficit irrigation planning",
      "Irrigation advisory services"
    ]
  },

  "Climate Impact & Anomaly Detector": {
    overview:
      "Detects climate anomalies and quantifies their crop impacts using multi-source signals and probabilistic forecasting.",
    inputs: [
      "Open-Meteo historical & real-time weather",
      "Sentinel-2 / MODIS NDVI/EVI",
      "Copernicus soil/terrain",
      "NewsAPI (free) / FAO bulletins",
      "EuroCropsML historical crop patterns",
      "SPI/SPEI climate indices",
      "NASA FIRMS & global flood datasets",
      "User extreme-event observations"
    ],
    outputs: [
      "Drought/flood/heatwave anomaly alerts",
      "Current-crop impact assessment",
      "Extreme-event trend analysis",
      "Localized climate risk scores",
      "SPI/SPEI visualization",
      "Predictive anomaly alerts",
      "Yield-link reports"
    ],
    ml: [
      "RL (ConnectX / MuZero) for strategy simulation",
      "Multimodal Transformer",
      "TFT + Informer for anomaly prediction",
      "Bayesian Ensembles for uncertainty",
      "MLOps pipeline"
    ],
    integration:
      "Anomaly fusion engine correlates climate, EO, and narrative signals to issue risks with confidence bands.",
    useCases: [
      "District climate risk briefs",
      "Crop insurance pre-assessment",
      "Disaster preparedness"
    ]
  },

  "Knowledge Graph of Agro-Events": {
    overview:
      "Builds a causal, searchable graph linking crops, pests, climate, genetics, and events for discovery and forecasting.",
    inputs: [
      "FAO bulletins",
      "Satellite change events",
      "Open-Meteo weather streams",
      "Pest/disease alerts (FAO)",
      "BrAPI breeding/genetic data",
      "ESA CCI / GlobeLand30 LULC",
      "Phenology data",
      "Local agro events"
    ],
    outputs: [
      "Interactive event-entity knowledge graph",
      "Causal insight discovery",
      "High-risk chain alerts",
      "Intervention suggestions",
      "Event-driven scenario predictions",
      "Searchable event database"
    ],
    ml: [
      "GNN / Graphormer",
      "Multimodal Transformer",
      "RL (MuZero) for prioritization",
      "Real-time MLOps"
    ],
    integration:
      "Entity extraction and temporal linking over heterogeneous streams populates a living graph for analytics.",
    useCases: [
      "Extension intelligence workbench",
      "Academic/NGO research mapping",
      "Policy what-if explorations"
    ]
  },

  "Market & Policy Trend Simulator": {
    overview:
      "Simulates crop prices and policy impacts by blending crop/EO signals, news/policy, and commodity/pricing datasets.",
    inputs: [
      "Open-Meteo & Sentinel-2 (weather/NDVI changes)",
      "Feature-3 growth simulations",
      "FAO market & policy reports",
      "NewsAPI (free tier)",
      "Open Food Facts",
      "World Bank / FAO GIEWS price APIs",
      "Subsidy / scheme data",
      "User local prices / farm costs"
    ],
    outputs: [
      "Local & global price forecasts",
      "Policy impact simulations",
      "Supply-demand balance",
      "Crop profitability analysis",
      "Scenario-based crop choice",
      "Market price alerts",
      "Trend & policy-effect visuals"
    ],
    ml: [
      "TFT + N-BEATS for forecasting",
      "RL (MuZero / Agent57) for crop-market choice",
      "Anomaly/Bayesian ensembles",
      "Real-time MLOps"
    ],
    integration:
      "Joins agronomic signals with market/policy feeds; outputs forecasts and scenario planners.",
    useCases: [
      "Market-led sowing advisories",
      "Procurement planning",
      "Policy option evaluation"
    ]
  },

  "Multilingual LLM Agro Assistant": {
    overview:
      "Conversational assistant for Bangla/English with map-aware answers, summaries, and downloadable reports.",
    inputs: [
      "User queries (Bangla/English/local terms)",
      "Optional: Voice input",
      "Optional: Field boundaries (GeoJSON)",
      "Sentinel-2 & Open-Meteo contexts",
      "Ag Data Commons datasets",
      "User-described crop issues"
    ],
    outputs: [
      "Bilingual text/voice answers",
      "Contextual crop management tips",
      "Weather/EO summaries",
      "Pest/disease guides",
      "Interactive Q&A with local terms",
      "Personalized recommendations",
      "Downloadable guidance reports"
    ],
    ml: [
      "LLM (e.g., LLaMA-3 / GPT-4 fine-tune)",
      "Multilingual ASR",
      "Multimodal Transformer",
      "MLOps for continual learning"
    ],
    integration:
      "Lang pipeline grounds LLM responses in spatial/temporal data and domain KB.",
    useCases: [
      "Hotline/field advisory",
      "Farmer helpdesk chat",
      "Voice-first information access"
    ]
  },

  "Crop Yield & Growth Forecasting": {
    overview:
      "Predicts crop yield and phenology per field by fusing time-series vegetation, weather, soil and crop-type signals.",
    inputs: [
      "NDVI/EVI time series (Sentinel-2, MODIS, Landsat)",
      "Open-Meteo forecasts",
      "Copernicus soil + terrain",
      "Copernicus crop type",
      "EuroCropsML / national yields",
      "LAI / fAPAR / chlorophyll indices",
      "Crop phenology models",
      "User cultivation practices"
    ],
    outputs: [
      "Field-level yield prediction",
      "Growth-stage timelines",
      "Yield deviation alerts",
      "Zone-specific yield maps",
      "Yield-improvement recommendations",
      "Season/farm comparisons"
    ],
    ml: [
      "Multimodal Transformer",
      "TFT + N-BEATS",
      "RL (MuZero) for optimization",
      "GNN for spatial correlation",
      "Bayesian ensembles",
      "MLOps pipeline"
    ],
    integration:
      "Automates data fusion and forecasting; surfaces uncertainty and deviations for action.",
    useCases: [
      "Input planning and contracts",
      "District yield outlooks",
      "Price risk hedging"
    ]
  },

  "Risk & Alert Dashboard": {
    overview:
      "Unifies risks and alerts from all features into interactive maps, charts, and notifications with configurable thresholds.",
    inputs: [
      "Aggregated outputs from Features 1–9",
      "Real-time weather & Sentinel-2 feeds",
      "Copernicus crop/soil maps",
      "USDA Quick Stats & Open Food Facts",
      "User: field conditions, community events, emergencies"
    ],
    outputs: [
      "Pest/disease/water/market/climate risk scores",
      "Interactive dashboards (maps/charts/tables)",
      "Real-time alerts & notifications",
      "Community-reported event overlays",
      "Custom thresholds",
      "Historical trends & projections"
    ],
    ml: [
      "RL (ConnectX) for adaptive scoring",
      "Multimodal fusion",
      "Concept drift / anomaly detection",
      "Real-time MLOps"
    ],
    integration:
      "Streams and aggregates all upstream feature signals into a single operator console.",
    useCases: [
      "Ops command center",
      "Regional early-warning cell",
      "Program monitoring & evaluation"
    ]
  },

  "Soil Nutrient & Fertility Advisor": {
    overview:
      "Analyzes soil, weather, vegetation and farmer inputs to recommend balanced, timed fertilizer programs.",
    inputs: [
      "Copernicus soil type",
      "Farmer soil-test reports",
      "FAO crop nutrient requirements",
      "Open-Meteo weather",
      "Optional NDVI/EVI history",
      "Farmer fertilizer history"
    ],
    outputs: [
      "Soil nutrient maps (N, P, K, microelements)",
      "Fertility stress detection",
      "Dose/timing/method recommendations",
      "Predicted crop response",
      "Deficiency alerts",
      "Temporal nutrient trends"
    ],
    ml: [
      "Multimodal Transformer",
      "RL (MuZero) for fertilization planning",
      "TFT + Neural ODEs (nutrient trends)",
      "GAN/Diffusion (stress visualization)",
      "MLOps automation"
    ],
    integration:
      "Prescription engine aligns crop need, soil status, and weather windows.",
    useCases: [
      "Soil health cards at scale",
      "Retailer recommendation engines",
      "Precision input management"
    ]
  },

  "Crop Variety / Breeding Recommendation": {
    overview:
      "Recommends climate- and soil-suited varieties using genetics, yield history, and local preferences.",
    inputs: [
      "Crop type (user)",
      "Open-Meteo local climate",
      "Copernicus soil type",
      "Historical yield data",
      "BrAPI genetic data",
      "Preferred varieties (user)"
    ],
    outputs: [
      "Variety picks per soil-climate combo",
      "Expected yield comparison",
      "Disease-resistance suitability",
      "Climate-adaptation suitability",
      "Interactive recommendation dashboard"
    ],
    ml: [
      "GNN (genetic + environment)",
      "RL (MuZero) for selection",
      "Multimodal Transformer",
      "MLOps for continuous updating"
    ],
    integration:
      "Scores varieties by local agro-climate and expected performance.",
    useCases: [
      "Seed advisory & distribution",
      "Public breeding targeting",
      "Farmer variety selection"
    ]
  },

  "Farmer Community Knowledge Exchange": {
    overview:
      "Community hub for observations, alerts, and solutions—augmented with EO overlays and weather context.",
    inputs: [
      "Farmer observations (text/images)",
      "Satellite/NDVI overlays",
      "Pest/disease alerts",
      "Weather forecasts",
      "Community comments/alerts"
    ],
    outputs: [
      "Shared observation feeds",
      "Outbreak alerts",
      "Collaborative solution threads",
      "Event maps",
      "Peer crop-management tips",
      "Aggregated local best practices"
    ],
    ml: [
      "Multimodal Transformer",
      "GNN (knowledge flow)",
      "RL (ConnectX) for info routing",
      "Real-time MLOps"
    ],
    integration:
      "Moderates and enriches user posts with geospatial layers and advisories.",
    useCases: [
      "Farmer-to-farmer extension",
      "Rapid local alerting",
      "Community agronomy knowledge base"
    ]
  },

  "Precision Harvest & Logistics Planner": {
    overview:
      "Plans optimal harvest windows and moves resources efficiently using yield/phenology, weather and market signals.",
    inputs: [
      "Predicted growth stages (Feature 9)",
      "Yield forecast",
      "Weather forecast",
      "Farm location",
      "World Bank / Open Food Facts market prices",
      "Preferred labor/transport resources"
    ],
    outputs: [
      "Optimal harvest dates",
      "Labor & resource allocation plans",
      "Transport route suggestions",
      "Predicted vs actual yield comparison",
      "Market-informed prioritization",
      "Harvest-window alerts",
      "Printable schedules"
    ],
    ml: [
      "RL (MuZero / Agent57) for timing/resources",
      "TFT + Informer for harvest timing",
      "Multimodal Transformer",
      "MLOps for automation"
    ],
    integration:
      "Synchronizes phenology, logistics and prices to minimize loss and maximize returns.",
    useCases: [
      "Custom-hiring center ops",
      "FPO/coop harvest orchestration",
      "Contract-farming logistics"
    ]
  },

  "Eco-Impact & Sustainability Analyzer": {
    overview:
      "Quantifies environmental footprint and suggests lower-input, water-smart practices while tracking long-term soil health.",
    inputs: [
      "Pesticide/fertilizer use (self-reported or estimated)",
      "NDVI/LAI",
      "Optional water-use sensors",
      "Soil maps",
      "Climate data",
      "Planned sustainability practices"
    ],
    outputs: [
      "Field/farm eco-footprint",
      "Sustainability score/rating",
      "Chemical/water-reduction recommendations",
      "Long-term soil-health projections",
      "Carbon-footprint estimation",
      "Practice comparisons (conventional vs sustainable)"
    ],
    ml: [
      "Multimodal Transformer",
      "GAN/Diffusion for impact visualization",
      "RL (MuZero) for eco strategies",
      "Continuous MLOps"
    ],
    integration:
      "Maps current practices to footprint and recommends stepwise improvements.",
    useCases: [
      "Sustainability reporting",
      "Certification readiness",
      "Program impact tracking"
    ]
  },

  "Extreme Event Simulation & Adaptation": {
    overview:
      "Simulates floods/droughts/heatwaves and recommends farm-level adaptation and emergency plans with quantified risk.",
    inputs: [
      "Historical climate events",
      "NDVI/EVI",
      "Crop type",
      "Soil type",
      "SPI/SPEI indices",
      "User adaptation/emergency plans"
    ],
    outputs: [
      "Event-impact simulations",
      "Adaptive management strategies",
      "Field-level emergency action plans",
      "Extreme-event risk maps",
      "Yield-loss projections under scenarios",
      "Farm resilience scores",
      "Climate-resilient crop planning"
    ],
    ml: [
      "RL (MuZero / ConnectX)",
      "Multimodal Transformer",
      "TFT + Neural ODEs",
      "Bayesian ensemble for uncertainty",
      "MLOps for automated simulations"
    ],
    integration:
      "Scenario engine perturbs climate variables and computes impacts with uncertainty bounds.",
    useCases: [
      "Contingency planning",
      "Insurance and relief targeting",
      "Climate-resilient design"
    ]
  }
};

export default featureDocs;

// Optional helper if your docs page uses router state like { state: { feature: title } }
export const getFeatureDoc = (title) => featureDocs[title] || null;
