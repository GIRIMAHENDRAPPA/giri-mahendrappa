/**
 * All personal content for the portfolio lives here.
 * Edit this file to update your details, skills, projects, education,
 * certifications and resume — no component changes needed.
 *
 * Rules: only add real, verified information. Leave a field null/empty
 * when it isn't available yet; the UI hides or marks it automatically.
 */
import demandcastHourly from "@/assets/demandcast-hourly-profile.webp.asset.json";
import demandcastCorrelation from "@/assets/demandcast-correlation.webp.asset.json";
import demandcastLoss from "@/assets/demandcast-loss.webp.asset.json";
import demandcastForecast from "@/assets/demandcast-forecast.webp.asset.json";

export const profile = {
  name: "Giri Mahendrappa",
  fullName: "Munisetty Giri Mahendrappa",
  initials: "GM",
  title: "AI Engineer & Software Developer",
  titleLong: "AI Engineer and Software Developer",
  rotatingTitles: [
    "AI Engineer",
    "Software Developer",
    "Python Developer",
    "Machine Learning Enthusiast",
  ],
  tagline: "Building intelligent solutions through code, creativity, and technology.",
  summary:
    "Passionate about Artificial Intelligence, Machine Learning, backend development, and solving real-world problems through software.",
  email: "girimahendra7989@gmail.com",
  githubUsername: "GIRIMAHENDRAPPA",
  github: "https://github.com/GIRIMAHENDRAPPA",
  linkedin: "https://www.linkedin.com/in/girimahendrappa",
  about: [
    "I am Giri Mahendrappa, an aspiring AI Engineer and Software Developer passionate about building intelligent applications and practical technology solutions. I enjoy working with Python, exploring Artificial Intelligence and Machine Learning, solving problems through Data Structures and Algorithms, and developing efficient backend applications.",
    "My interests include AI-powered systems, software development, backend engineering, and creating solutions that address real-world challenges. I continuously work on improving my technical knowledge, experimenting with new technologies, and transforming ideas into useful applications.",
    "I believe in continuous learning, practical implementation, and writing solutions that combine intelligent technology with meaningful functionality.",
  ],
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Backend Development",
    "Python Programming",
    "Problem Solving",
    "Software Engineering",
  ],
} as const;

/**
 * Resume: upload your PDF (e.g. to /public/resume.pdf) and set `url` to "/resume.pdf".
 * While `url` is null, the site shows "available on request" instead of a download.
 */
export const resume: { url: string | null; fileName: string } = {
  url: null,
  fileName: "Giri-Mahendrappa-Resume.pdf",
};

/** Proficiency is optional. Leave `level` undefined until you choose a real level. */
export type SkillLevel = "Learning" | "Intermediate" | "Advanced";
export interface Skill {
  name: string;
  level?: SkillLevel;
}
export interface SkillGroup {
  id: string;
  title: string;
  icon: "code" | "layout" | "server" | "database" | "brain" | "wrench" | "users";
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming & Problem Solving",
    icon: "code",
    skills: [
      { name: "Python" },
      { name: "Data Structures and Algorithms (DSA)" },
      { name: "File Handling" },
      { name: "CRUD Operations" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "layout",
    skills: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }],
  },
  { id: "backend", title: "Backend Development", icon: "server", skills: [{ name: "FastAPI" }] },
  { id: "database", title: "Database", icon: "database", skills: [{ name: "MySQL" }, { name: "SQL" }] },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: "brain",
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Machine Learning" },
      { name: "OpenCV" },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    icon: "wrench",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "Visual Studio Code" }],
  },
  {
    id: "soft",
    title: "Soft Skills",
    icon: "users",
    skills: [
      { name: "Communication" },
      { name: "Teamwork" },
      { name: "Problem Solving" },
      { name: "Presentation" },
    ],
  },
];

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  repo: string;
  /** Card cover. null = use the built-in architecture illustration. */
  cover: ProjectImage | null;
  tech: string[];
  overview: string;
  problem: string;
  objectives: string[];
  methodology: { title: string; detail: string }[];
  implementation: { path: string; detail: string }[];
  /** Only results you measured yourself. */
  results?: { heading: string; note: string; metrics: { label: string; value: string }[] };
  /** Genuine images from the repository only. */
  screenshots: ProjectImage[];
  screenshotsNote?: string;
}

export const projects: Project[] = [
  {
    slug: "fraudguard-ai",
    title: "FraudGuard AI",
    subtitle: "Intelligent Credit Card Fraud Detection Framework",
    category: "Machine Learning · FinTech",
    summary:
      "FraudGuard AI is an AI-powered credit card fraud detection project focused on identifying potentially fraudulent transactions through machine learning techniques. The project explores intelligent classification and fraud detection approaches to distinguish suspicious transactions from legitimate financial activities.",
    repo: "https://github.com/GIRIMAHENDRAPPA/Credit-Card-Fraud-Detection",
    cover: null,
    tech: [
      "Python",
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "Logistic Regression",
      "SMOTE",
      "LightGBM",
      "CatBoost",
      "SHAP",
      "pandas",
      "NumPy",
      "FastAPI",
      "React",
      "Tailwind CSS",
    ],
    overview:
      "FraudGuard AI (repository: Credit-Card-Fraud-Detection) is an end-to-end fraud detection project that combines an unsupervised anomaly layer with a supervised stacking ensemble, then turns predicted fraud probabilities into decisions with explainable reason codes. It ships with a FastAPI backend and a React analyst dashboard.",
    problem:
      "Fraudulent card transactions are rare compared to legitimate ones, so a model that simply predicts \"not fraud\" can look accurate while missing the cases that matter. Fraud detection needs to handle heavy class imbalance, unusual behaviour that has never been seen before, and decisions that people can understand.",
    objectives: [
      "Distinguish suspicious transactions from legitimate financial activity.",
      "Handle severe class imbalance without discarding useful data.",
      "Flag anomalous behaviour, including patterns not present in labelled data.",
      "Explain why a transaction was flagged with readable reason codes.",
      "Serve predictions through an API and an interactive dashboard.",
    ],
    methodology: [
      {
        title: "Baseline study",
        detail:
          "Classified 184,807 Kaggle transactions (30 features: V1–V28, Time, Amount) as genuine or fraudulent. Scaled Amount and Time with RobustScaler, handled the 2.66% fraud imbalance with SMOTE, and used a stratified 80/20 split.",
      },
      {
        title: "Model comparison",
        detail: "Compared Logistic Regression, Random Forest and XGBoost; XGBoost was selected.",
      },
      {
        title: "Feature engineering",
        detail:
          "Cyclical sin/cos encoding of hour and day, per-cardholder amount z-scores, rolling 1-hour and 24-hour spend velocities.",
      },
      {
        title: "Spatio-temporal checks",
        detail:
          "Haversine distance and apparent travel speed between transactions to catch \"impossible travel\" card usage.",
      },
      {
        title: "Class imbalance control",
        detail: "Resampling with SMOTE combined with random under-sampling.",
      },
      {
        title: "Anomaly layer",
        detail: "An Isolation Forest scores outlier behaviour and feeds that score into the supervised models.",
      },
      {
        title: "Stacking ensemble",
        detail:
          "XGBoost, LightGBM and CatBoost base learners combined by a regularised Logistic Regression meta-learner.",
      },
      {
        title: "Cost-sensitive decisions",
        detail:
          "A financial cost matrix chooses thresholds that map probabilities to Allow, Step-up challenge or Decline.",
      },
      {
        title: "Explainability",
        detail: "TreeSHAP produces the top contributing reason codes for each flagged transaction.",
      },
      {
        title: "Drift monitoring",
        detail: "Population Stability Index (PSI) tracks shifts in incoming data and raises retraining alerts.",
      },
    ],
    implementation: [
      { path: "src/features/", detail: "Financial and spatio-temporal feature engineering" },
      { path: "src/models/resampling.py", detail: "Class-imbalance resampling" },
      { path: "src/models/anomaly_layer.py", detail: "Isolation Forest anomaly layer" },
      { path: "src/models/base_learners.py", detail: "XGBoost, LightGBM and CatBoost learners" },
      { path: "src/models/stacking_meta.py", detail: "Logistic Regression meta-classifier" },
      { path: "src/models/cost_sensitive.py", detail: "Cost-matrix threshold optimisation" },
      { path: "src/explainability/shap_explainer.py", detail: "TreeSHAP reason codes" },
      { path: "src/monitoring/drift_detector.py", detail: "PSI drift detection" },
      { path: "api/app.py", detail: "FastAPI endpoints: predict, batch predict, drift check, cost matrix" },
      { path: "frontend/", detail: "React + Vite + Tailwind analyst dashboard" },
      { path: "tests/", detail: "Tests for API, features and models" },
    ],
    results: {
      heading: "Selected model: XGBoost",
      note: "Results from my baseline evaluation on the held-out 20% test split.",
      metrics: [
        { label: "Recall", value: "86%" },
        { label: "Precision", value: "0.92" },
        { label: "F1-score", value: "0.89" },
        { label: "ROC-AUC", value: "0.91" },
      ],
    },
    screenshots: [],
    screenshotsNote:
      "The repository doesn't include screenshots yet. The diagram above illustrates the architecture described in the project README.",
  },
  {
    slug: "demandcast-electricity",
    title: "DemandCast",
    subtitle: "LSTM-Based Electricity Consumption Forecasting",
    category: "Deep Learning · Time Series",
    summary:
      "DemandCast forecasts hourly electricity demand on the Indian national power grid, comparing SimpleRNN, LSTM and Stacked LSTM models across multiple lookback windows, with a FastAPI + React dashboard.",
    repo: "https://github.com/GIRIMAHENDRAPPA/DemandCast-Electricity",
    cover: {
      src: demandcastHourly.url,
      alt: "Hourly electricity demand profile chart generated by DemandCast",
      caption: "Hourly demand profile",
    },
    tech: ["Python", "TensorFlow / Keras", "pandas", "NumPy", "FastAPI", "React", "Recharts", "Tailwind CSS"],
    overview:
      "DemandCast is a machine learning and deep learning project that forecasts future electrical energy demand across the Indian national power grid from historical hourly time-series data, and compares recurrent neural network architectures for the task.",
    problem:
      "Electricity demand changes with the time of day, weekdays versus weekends, seasons and renewable generation. Grid planning needs forecasts that capture these non-linear patterns from past observations.",
    objectives: [
      "Predict future hourly electricity demand.",
      "Build on an official public dataset (Mendeley Data, DOI 10.17632/y58jknpgs8.2).",
      "Avoid data leakage with strictly chronological train/validation/test splits.",
      "Compare SimpleRNN, single-layer LSTM and two-layer Stacked LSTM models.",
      "Study how lookback window length affects forecasting.",
    ],
    methodology: [
      {
        title: "Data preparation",
        detail:
          "Chronological 70% / 15% / 15% split with MinMax scaling fitted on training data only.",
      },
      {
        title: "Feature engineering",
        detail:
          "Cyclical hour/day/month encodings, weekend flag, and solar PV and wind generation features.",
      },
      {
        title: "Model comparison",
        detail: "SimpleRNN, single-layer LSTM and Stacked LSTM, univariate and multivariate.",
      },
      {
        title: "Sequence sensitivity",
        detail: "Lookback windows of 6, 12, 24, 48, 72 and 168 hours.",
      },
      {
        title: "Evaluation",
        detail: "MAE, RMSE, MAPE and R², plus loss curves and forecast-versus-actual plots.",
      },
      {
        title: "Dashboard",
        detail: "FastAPI backend with a React + Vite + Tailwind frontend and Recharts visualisations.",
      },
    ],
    implementation: [
      { path: "src/download_dataset.py", detail: "Downloads the Mendeley dataset" },
      { path: "src/preprocess.py", detail: "Cleaning and timestamp parsing" },
      { path: "src/feature_engineering.py", detail: "Cyclical and renewable features" },
      { path: "src/dataset_generator.py", detail: "Sliding-window sequences and chronological split" },
      { path: "src/models.py", detail: "SimpleRNN, LSTM and Stacked LSTM builders" },
      { path: "src/train.py · src/evaluate.py", detail: "Experiment runner and metrics" },
      { path: "api/main.py", detail: "FastAPI REST API" },
      { path: "frontend/", detail: "React dashboard" },
    ],
    screenshots: [
      {
        src: demandcastForecast.url,
        alt: "Stacked LSTM multivariate 24-hour forecast versus actual demand",
        caption: "Stacked LSTM (multivariate, 24h lookback) — forecast vs. actual",
      },
      {
        src: demandcastLoss.url,
        alt: "Training and validation loss curves for the Stacked LSTM model",
        caption: "Stacked LSTM training and validation loss",
      },
      {
        src: demandcastHourly.url,
        alt: "Average hourly electricity demand profile",
        caption: "Hourly demand profile (EDA)",
      },
      {
        src: demandcastCorrelation.url,
        alt: "Feature correlation heatmap",
        caption: "Feature correlation heatmap (EDA)",
      },
    ],
  },
];

export interface EducationEntry {
  qualification: string;
  institution: string;
  specialization?: string;
  duration?: string;
  status?: string;
  score?: string;
}

export const education: EducationEntry[] = [
  {
    qualification: "Master of Technology (M.Tech)",
    institution: "Lovely Professional University",
    specialization: "Computer Science & Engineering — Artificial Intelligence & Machine Learning",
    duration: "2026 – 2028",
    status: "Pursuing",
  },
  {
    qualification: "Bachelor of Technology (B.Tech)",
    institution: "Santhiram Engineering College",
    specialization: "Electronics and Communication Engineering",
    duration: "2023 – 2026",
    status: "Completed",
    score: "CGPA 8.17 / 10",
  },
];

export interface TrainingEntry {
  role: string;
  organization: string;
  duration: string;
  points: string[];
}

export const training: TrainingEntry[] = [
  {
    role: "Quality Operator",
    organization: "Aavishkaran Pvt. Ltd.",
    duration: "2022 – 2023",
    points: [
      "Inspected PCBs and electronic assemblies to ensure quality and accuracy.",
      "Tested communication equipment to verify functionality and compliance with quality standards.",
      "Assisted in identifying defects and maintaining quality standards during equipment inspection.",
    ],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  verifyUrl?: string;
  /** Image or PDF of the certificate */
  fileUrl?: string;
}

/** Add only real certifications. The section shows a clean empty state while this is empty. */
export const certifications: Certification[] = [
  { title: "Python Web Development Virtual Internship", issuer: "EduSkills" },
  { title: "Fundamentals of AI", issuer: "NPTEL · IIT Guwahati" },
  { title: "Introduction to Machine Learning", issuer: "NPTEL · IIT Madras" },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
