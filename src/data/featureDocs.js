export const featureDocs = {
  "Solar Panel Health & Efficiency Monitoring": {
    overview: `This module continuously evaluates the performance of solar panels by combining remote sensing imagery and IoT sensor streams. 
It identifies panel degradation, detects hotspot issues, and estimates the efficiency loss due to dust, temperature, or structural misalignment. 
The system uses hybrid AI models to provide both real-time and long-term performance monitoring through interactive dashboards.`,
    inputs: [
      "Sentinel-2 / Landsat imagery for surface and spectral analysis",
      "IoT sensor streams (voltage, current, temperature, irradiance)",
      "PVGIS solar irradiance datasets for baseline performance estimation",
      "Open-Meteo weather data for temperature and humidity context"
    ],
    outputs: [
      "Thermal and efficiency heatmaps",
      "Predicted daily output and degradation metrics",
      "Fault detection and performance alerts",
      "Downloadable GeoJSON or CSV performance summaries"
    ],
    ml: [
      "Vision Transformer (ViT) for spatial pattern detection",
      "Temporal Fusion Transformer for multi-time forecasting",
      "Unsupervised Anomaly Detection for fault classification"
    ],
    integration: `This system fuses IoT and satellite data layers through a transformer-based pipeline. 
It validates energy output patterns against expected irradiance and identifies inefficiencies through temporal and spatial correlation.`,
    useCases: [
      "Smart solar farm operation with automated fault detection",
      "Predictive maintenance scheduling for utility-scale solar arrays",
      "Visual efficiency monitoring for large photovoltaic plants"
    ]
  },

  "Solar & Wind Power Generation Forecast": {
    overview: `The forecast module predicts near-term and week-ahead energy generation potential using weather forecasts and historical renewable data. 
It correlates local irradiance and wind speed conditions with generation behavior to improve planning and reduce grid imbalance.`,
    inputs: [
      "Open-Meteo weather forecasts (temperature, wind speed, irradiance)",
      "NREL and OpenEI renewable generation datasets",
      "PVGIS and Global Wind Atlas for site-level resource data",
      "Terrain and topographical elevation datasets"
    ],
    outputs: [
      "7-day ahead generation forecast with confidence intervals",
      "Peak production hour identification",
      "Animated regional forecast maps",
      "Detailed CSV time-series and daily summaries"
    ],
    ml: [
      "Temporal Fusion Transformer (TFT) for time-series energy forecasting",
      "Graph Neural Networks (GNNs) for spatial pattern learning"
    ],
    integration: `This feature integrates weather APIs, terrain models, and historical energy datasets to forecast both solar and wind generation. 
The AI model learns spatial correlations between nearby regions using GNN layers, improving accuracy during fluctuating climate conditions.`,
    useCases: [
      "Predicting renewable power availability for grid scheduling",
      "Supporting short-term dispatch planning and energy trading",
      "Enabling demand-supply balancing for hybrid renewable plants"
    ]
  },

  "EV Charging Demand Prediction": {
    overview: `This AI-driven system predicts EV charging demand across regions using urban mobility, weather, and road data. 
It generates dynamic heatmaps and identifies high-load stations in advance to prevent network congestion.`,
    inputs: [
      "EV registration and regional mobility datasets (open or synthetic)",
      "Open Charge Map API for charging station metadata",
      "OpenStreetMap road and route network data",
      "Open-Meteo weather patterns influencing EV usage"
    ],
    outputs: [
      "Regional EV charging demand heatmaps",
      "Peak usage prediction per charging station",
      "What-if scenario simulations (e.g., adding new stations)",
      "Text summaries and TTS alerts for overload warnings"
    ],
    ml: [
      "LSTM for temporal demand forecasting",
      "Graph Transformer for spatial EV load correlation",
      "Multimodal Fusion model integrating road, EV, and weather data"
    ],
    integration: `The backend combines EV charging logs, weather impact, and traffic patterns. 
It identifies underutilized or overloaded stations and simulates how network changes affect energy demand.`,
    useCases: [
      "Urban charging infrastructure planning",
      "Predicting peak demand for grid load balancing",
      "Smart city EV usage analytics and station optimization"
    ]
  },

  "Grid & Microgrid Optimization Advisor": {
    overview: `The Grid Advisor optimizes energy distribution between renewable sources, EV loads, and storage systems. 
It dynamically adjusts dispatch strategies using reinforcement learning to reduce grid stress and operational cost.`,
    inputs: [
      "Real-time generation data from solar and wind assets",
      "Grid topology and power flow configurations",
      "EV charging demand and regional consumption logs",
      "Market pricing data for cost-sensitive optimization"
    ],
    outputs: [
      "Load balancing and distribution recommendations",
      "Battery storage and dispatch scheduling",
      "Grid stress index and fault prediction reports",
      "Scenario simulations for peak load reduction"
    ],
    ml: [
      "Reinforcement Learning (RL) for optimization under constraints",
      "Multimodal Transformer for multi-source contextual decisions"
    ],
    integration: `Uses energy input data and network topology to simulate grid flow under different operational modes. 
RL-based agents continuously improve dispatch strategy for minimizing energy losses and maximizing reliability.`,
    useCases: [
      "Real-time energy flow optimization in smart grids",
      "Dynamic scheduling of distributed microgrids",
      "Renewable generation integration with EV storage networks"
    ]
  },

  "Energy Market & Policy Impact Simulator": {
    overview: `Simulates how energy policies, tariffs, and subsidies affect renewable adoption and pricing trends. 
Combining historical market datasets and predictive models, it provides long-term projections under different policy conditions.`,
    inputs: [
      "IRENA / OpenEI energy market data",
      "ERA5 reanalysis weather data for climate dependency",
      "Policy datasets from World Bank, IEA, IMF",
      "Economic indicators and renewable capacity records"
    ],
    outputs: [
      "Regional policy impact heatmaps",
      "Renewable adoption trend projections",
      "Pricing curves under policy variations",
      "Interactive scenario dashboards and textual summaries"
    ],
    ml: [
      "RAG-based LLMs for policy analysis",
      "Temporal Transformer for time-series market forecasting"
    ],
    integration: `Merges market and policy datasets with predictive transformers to simulate the impact of new regulations or incentives. 
It generates dashboards and textual narratives explaining each outcome.`,
    useCases: [
      "Assessing subsidy-driven adoption rates",
      "Forecasting energy pricing impacts of policies",
      "Comparing international energy transition outcomes"
    ]
  },

  "Climate & Renewable Anomaly Detector": {
    overview: `Detects abnormal energy patterns caused by environmental or mechanical factors. 
By comparing expected vs. actual renewable performance, it identifies underperforming assets and climate-driven disruptions.`,
    inputs: [
      "ERA5 / Open-Meteo weather time series",
      "Sentinel-2 satellite imagery",
      "Grid and plant-level energy output data",
      "Disaster datasets (NOAA Storm Events, NASA FIRMS)"
    ],
    outputs: [
      "Anomaly detection maps and severity scales",
      "Temporal deviation and recovery plots",
      "Regional impact summaries with cause classification",
      "Automated SMS/TTS alert notifications"
    ],
    ml: [
      "Temporal GNN for event correlation",
      "Anomaly Detection Transformer for deviation scoring"
    ],
    integration: `Correlates weather, grid, and imagery data to compute deviation patterns. 
Identifies whether anomalies stem from environmental, technical, or demand-side issues.`,
    useCases: [
      "Fault localization in renewable plants",
      "Climate-linked outage prediction",
      "Proactive disaster risk management"
    ]
  },

  "Knowledge Graph of Energy Events": {
    overview: `Constructs an interconnected knowledge graph linking research papers, policy updates, and grid events. 
It visualizes relationships between entities to reveal energy transition trends and influences.`,
    inputs: [
      "arXiv and government research APIs",
      "Policy databases and event archives",
      "Grid failure and energy trade datasets",
      "Wikidata / DBpedia semantic relationships"
    ],
    outputs: [
      "Interactive energy knowledge graph visualization",
      "Node-level analytics and importance ranking",
      "Event propagation timeline",
      "Semantic summaries and cluster insights"
    ],
    ml: [
      "Graph Embedding Models for node representation",
      "LLM + RAG for document-level summarization"
    ],
    integration: `Extracts entities from documents using NLP, embeds them in a graph, and connects related energy topics. 
The resulting graph provides dynamic exploration for policy, research, and event links.`,
    useCases: [
      "Energy policy intelligence gathering",
      "Academic research analysis and clustering",
      "Knowledge-driven risk and innovation tracking"
    ]
  },

  "Multilingual Energy Assistant": {
    overview: `A conversational AI assistant that supports both English and Bangla queries. 
It responds with analytical explanations, visual maps, or TTS outputs for renewable energy insights.`,
    inputs: [
      "User queries (English/Bangla)",
      "GeoJSON files or map coordinates",
      "Energy data from OpenEI / IRENA",
      "Weather or imagery data (optional visual context)"
    ],
    outputs: [
      "Multilingual text answers",
      "Annotated energy and weather maps",
      "Graphical charts and explanations",
      "Audio TTS response in preferred language"
    ],
    ml: [
      "Large Language Model (LLM)",
      "Vision-Language Model (VLM)",
      "LangChain Agent Pipeline"
    ],
    integration: `Integrates natural language understanding and energy databases for bilingual Q&A and map-annotated responses.`,
    useCases: [
      "Interactive renewable energy chatbot",
      "Voice-based information assistant for field users",
      "Energy Q&A platform for public awareness"
    ]
  },

  "EV Fleet & Charging Station Optimization": {
    overview: `Optimizes EV fleet routes and charging schedules using real-time traffic and generation data. 
It predicts optimal charging points and minimizes energy cost while ensuring fleet utilization efficiency.`,
    inputs: [
      "Fleet operational datasets (routes, battery levels, schedules)",
      "Open Charge Map API for real-time station metadata",
      "OpenStreetMap routing and distance data",
      "Real-time renewable generation and grid load data"
    ],
    outputs: [
      "Optimized fleet routing maps",
      "Charging schedule and cost forecast tables",
      "Utilization heatmaps and comparative charts",
      "Scenario simulations for route/fleet scaling"
    ],
    ml: ["Reinforcement Learning", "Temporal GNN for fleet-state transitions"],
    integration: `Combines spatial routing optimization with renewable supply forecasting to maximize efficiency.`,
    useCases: [
      "Fleet management optimization",
      "Charging infrastructure planning",
      "EV cost reduction strategy development"
    ]
  },

  "Risk & Alert Dashboard": {
    overview: `Aggregates analytics and alerts from all other EnergyVerse features into a unified visualization dashboard. 
The system provides real-time monitoring, risk scoring, and predictive summaries for operators.`,
    inputs: [
      "Aggregated data streams from all EnergyVerse modules",
      "Live satellite and weather feeds (Sentinel, ERA5, Open-Meteo)",
      "Grid, EV, and market signals from OpenEI / IRENA APIs"
    ],
    outputs: [
      "Multi-source interactive dashboard",
      "Real-time alerts (grid stress, anomalies, EV peaks)",
      "Daily/weekly risk summaries with trend analysis",
      "Downloadable PDF or CSV reports"
    ],
    ml: ["LLM-based summarizer", "Dashboard Agent with anomaly clustering"],
    integration: `All AI outputs are fused into a visual intelligence layer with continuous updates and alert notifications.`,
    useCases: [
      "Energy risk monitoring center",
      "Grid operator decision dashboards",
      "Automated event-driven alert systems"
    ]
  },

  "Battery / Storage Health Monitoring": {
    overview: `Monitors energy storage systems and EV battery health to estimate degradation, capacity, and safety indicators. 
It predicts remaining useful life (RUL) and provides early fault warnings.`,
    inputs: [
      "Battery IoT logs (voltage, current, SOC, temperature)",
      "Historical charge-discharge datasets",
      "PV or renewable storage integration data"
    ],
    outputs: [
      "Daily SOC and SOH predictions",
      "RUL estimation and degradation rate curve",
      "Charge/discharge efficiency analysis",
      "Anomaly or fault alerts"
    ],
    ml: ["Time-series regression models", "Predictive Maintenance AI"],
    integration: `Collects IoT and operational logs to predict health and lifecycle of distributed batteries.`,
    useCases: [
      "Smart grid battery management",
      "Battery replacement cost optimization",
      "Preventive maintenance in EV fleets"
    ]
  },

  "Solar & Wind Asset Predictive Maintenance": {
    overview: `Predicts potential failures in turbines and panels using environmental and sensor data. 
Combines vibration, acoustic, and temperature data with satellite images to assess wear patterns.`,
    inputs: [
      "IoT sensor data (vibration, temperature, acoustic signatures)",
      "Satellite imagery for surface condition checks",
      "PVGIS and Global Wind Atlas irradiance data",
      "Maintenance history logs"
    ],
    outputs: [
      "Asset failure probability index",
      "Maintenance schedule optimization",
      "Component degradation trend visualization",
      "Geo-mapped high-risk cluster detection"
    ],
    ml: ["Predictive Maintenance CNNs", "Anomaly Detection models"],
    integration: `Merges physical sensor analytics with visual inspection AI to preemptively schedule maintenance.`,
    useCases: [
      "Turbine failure prediction",
      "Solar asset lifetime management",
      "O&M cost optimization for renewable infrastructure"
    ]
  },

  "Renewable Curtailment Analysis & Flexibility": {
    overview: `Analyzes overproduction and energy curtailment events to optimize load flexibility and reduce waste. 
Provides actionable recommendations to shift loads or store excess renewable generation.`,
    inputs: [
      "Historical generation vs. demand data (NREL / OpenEI)",
      "Open-Meteo forecasts for renewable variability",
      "Grid load profiles and flexible consumer data"
    ],
    outputs: [
      "Expected curtailment and energy waste analysis",
      "Load shifting or battery dispatch suggestions",
      "Scenario-based curtailment reduction simulations"
    ],
    ml: ["Optimization Models", "Forecasting Transformers"],
    integration: `Combines historical and forecasted data to detect curtailment risk and propose flexible energy scheduling.`,
    useCases: [
      "Curtailment minimization planning",
      "Load redistribution for renewables",
      "Peak shaving strategy design"
    ]
  },

  "EV Driver Behavior & Incentive Analytics": {
    overview: `Analyzes EV driver charging behavior to design incentive schemes that promote off-peak usage and load balance. 
Models how drivers react to price changes and policy incentives.`,
    inputs: [
      "EV charging session datasets",
      "Open Charge Map and OSM traffic data",
      "Open-Meteo weather data (temperature, rain)",
      "Incentive policy configurations"
    ],
    outputs: [
      "Temporal usage patterns and station utilization",
      "Demand-shift predictions under new incentives",
      "Optimal reward/incentive recommendations"
    ],
    ml: ["Behavioral Modeling", "Reinforcement Learning"],
    integration: `Uses temporal behavioral data to simulate how incentives alter charging demand curves.`,
    useCases: [
      "EV policy testing and behavioral simulation",
      "Dynamic pricing optimization",
      "Customer engagement program design"
    ]
  },

  "DER Integration & Microgrid Simulation": {
    overview: `Simulates the contribution and coordination of distributed energy resources (DERs) like rooftop solar, batteries, and EV storage. 
Tests how microgrids perform under varying generation and consumption conditions.`,
    inputs: [
      "DER datasets (PV, battery, EV storage)",
      "Microgrid topology and control parameters",
      "Weather and generation datasets for simulation"
    ],
    outputs: [
      "Microgrid balance and dispatch simulation charts",
      "Energy cost and efficiency metrics",
      "Scenario-based optimization outcomes"
    ],
    ml: ["Microgrid Simulation Models", "Optimization Algorithms"],
    integration: `Models the combined behavior of DER components for efficient and resilient microgrid operation.`,
    useCases: [
      "DER planning and integration",
      "Smart neighborhood or campus microgrid testing",
      "Renewable energy coordination studies"
    ]
  },

  "Renewable Energy CO₂ Impact Dashboard": {
    overview: `Quantifies the CO₂ emissions avoided through renewable energy usage and policy adoption. 
Visualizes the contribution of renewables to sustainability goals over time.`,
    inputs: [
      "Renewable generation datasets (solar, wind, EV)",
      "Grid emission factors from IRENA / OpenEI",
      "Weather and seasonal context data"
    ],
    outputs: [
      "CO₂ emission reduction dashboards",
      "Regional sustainability scorecards",
      "Policy comparison visualizations"
    ],
    ml: ["Emission Estimation Models", "Scenario Analysis Transformers"],
    integration: `Converts renewable generation into quantified CO₂ reduction metrics and compares against baseline fossil fuel data.`,
    useCases: [
      "Corporate sustainability reporting",
      "Carbon footprint monitoring",
      "National emission reduction tracking"
    ]
  },

  "Real-Time Fault / Anomaly Explanation": {
    overview: `Provides explainable insights for detected faults or anomalies across solar, wind, grid, and EV systems. 
It identifies the root cause of faults using multimodal correlation across data streams.`,
    inputs: [
      "IoT sensor logs from grid, solar, or EV assets",
      "Satellite imagery from Sentinel for context verification",
      "Weather datasets for external factor correlation",
      "Grid operational datasets"
    ],
    outputs: [
      "Fault location and severity maps",
      "Cause explanation and confidence level",
      "Impact forecasting and mitigation advice",
      "Auto-generated notification summaries"
    ],
    ml: ["Explainable AI (XAI)", "Multimodal Causal Transformer"],
    integration: `Fuses multimodal signals (IoT, imagery, climate) to explain fault causes and predict possible cascading failures.`,
    useCases: [
      "Real-time alert and diagnostics systems",
      "Root-cause analysis for renewable disruptions",
      "Maintenance prioritization based on severity"
    ]
  }
};
