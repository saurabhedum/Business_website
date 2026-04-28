export interface AssessmentQuestion {
  id: string;
  q: string;
  opts: string[];
}

export const DOMAINS = [
  { id: 'd2c', label: 'D2C / E-Commerce' },
  { id: 'edtech', label: 'EdTech' },
  { id: 'health', label: 'Healthcare' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'saas', label: 'SaaS / Tech' },
  { id: 'mfg', label: 'Manufacturing' },
  { id: 'media', label: 'Media / Ent' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'agri', label: 'Agriculture' },
  { id: 'retail', label: 'Retail (Brick & Mortar)' },
  { id: 'enterprise', label: 'Enterprise Services' }
];

export const BASE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "Q1",
    q: "How would you describe your current data infrastructure?",
    opts: [
      "We have no data system — decisions are gut-feel",
      "We collect data but rarely use it strategically",
      "We have dashboards but limited predictive capability",
      "We have real-time analytics and use data systematically"
    ]
  },
  {
    id: "Q2",
    q: "How aware are you of the key technology shifts disrupting your industry in the next 3 years?",
    opts: [
      "Not aware — we're focused on current operations",
      "Somewhat aware but no formal tracking",
      "Actively monitoring but no response strategy",
      "We have a documented technology watch and adaptation plan"
    ]
  },
  {
    id: "Q3",
    q: "How does your team make strategic decisions?",
    opts: [
      "Experience and intuition of senior leadership",
      "Periodic market research, mostly historical",
      "Mix of data, market signals, and leadership instinct",
      "Systematic scenario planning and data-driven forecasting"
    ]
  },
  {
    id: "Q4",
    q: "What is your competitive intelligence capability?",
    opts: [
      "We learn about competitor moves when customers tell us",
      "We track major competitors manually and sporadically",
      "We have a structured process but it's mostly reactive",
      "We run continuous automated competitive monitoring"
    ]
  },
  {
    id: "Q5",
    q: "How would you rate your organization's AI/automation maturity?",
    opts: [
      "No AI tools in use — fully manual processes",
      "Experimenting with basic AI tools (ChatGPT, etc.)",
      "Some automation deployed in isolated workflows",
      "Integrated AI systems across multiple business functions"
    ]
  },
  {
    id: "Q6",
    q: "How far ahead does your strategic planning horizon extend?",
    opts: [
      "We plan quarter to quarter — survival mode",
      "Annual planning cycle only",
      "3-year rolling plan, mostly financial",
      "5+ year strategic vision with scenario-tested milestones"
    ]
  },
  {
    id: "Q7",
    q: "How well do you understand your customers' future needs (not just current)?",
    opts: [
      "We react to complaints — no forward customer insight",
      "Annual surveys and basic NPS measurement",
      "Segmented customer research with trend monitoring",
      "Predictive customer intelligence — we anticipate needs 12–24 months out"
    ]
  },
  {
    id: "Q8",
    q: "What is your organization's biggest foresight blindspot?",
    opts: [
      "Technology disruption to our business model",
      "Regulatory and compliance changes ahead",
      "Competitive threats from non-traditional players",
      "Demographic and behavioral shifts in our customer base"
    ]
  },
  {
    id: "Q9",
    q: "How resilient is your business model to a major industry disruption?",
    opts: [
      "Highly vulnerable — we're dependent on current model",
      "Somewhat fragile — 1 major shift could destabilize us",
      "Moderately resilient — we've thought about diversification",
      "Antifragile — disruption creates opportunities for us"
    ]
  },
  {
    id: "Q10",
    q: "What outcome matters most to you from strategic foresight?",
    opts: [
      "Identifying specific threats before they hit us",
      "Finding new market opportunities before competitors",
      "Building a data-driven culture that reduces guesswork",
      "Creating a long-term strategic advantage that compounds"
    ]
  }
];

export const DOMAIN_OVERRIDES: Record<string, Record<string, AssessmentQuestion>> = {
  "d2c": {
    "Q2": {
      id: "Q2",
      q: "How are you preparing for the shift towards hyper-personalized, AI-driven shopping experiences?",
      opts: [
        "We aren't — we rely on standard e-commerce templates",
        "We use basic recommendation engines (e.g., 'Customers also bought')",
        "We are testing dynamic pricing and personalized email flows",
        "We have a fully predictive engine anticipating customer needs before they search"
      ]
    },
    "Q7": {
      id: "Q7",
      q: "How do you track shifting consumer trends and viral product cycles?",
      opts: [
        "We react when sales drop or competitors launch",
        "We manually monitor social media and industry reports",
        "We use social listening tools to track brand sentiment",
        "We use predictive analytics on social/search data to identify trends before they peak"
      ]
    }
  },
  "fintech": {
    "Q2": {
      id: "Q2",
      q: "How are you adapting to decentralized finance (DeFi) and embedded finance trends?",
      opts: [
        "We consider them fads and are ignoring them",
        "We are monitoring them but have no active projects",
        "We have R&D projects exploring integration",
        "They are core components of our 3-year strategic roadmap"
      ]
    },
    "Q8": {
      id: "Q8",
      q: "How do you anticipate regulatory changes and compliance requirements?",
      opts: [
        "We react when new laws are passed",
        "We rely on external legal counsel for updates",
        "We have an internal compliance team monitoring proposals",
        "We use regulatory technology (RegTech) to predict and automate compliance shifts"
      ]
    }
  },
  "health": {
    "Q2": {
      id: "Q2",
      q: "How prepared are you for the integration of wearable data and predictive diagnostics?",
      opts: [
        "Not prepared — we rely entirely on clinical encounters",
        "We are exploring pilot programs with specific devices",
        "We integrate some patient-generated data into our EHR",
        "We have a comprehensive strategy for continuous, predictive patient monitoring"
      ]
    },
    "Q7": {
      id: "Q7",
      q: "How do you anticipate shifts in patient expectations regarding digital care delivery?",
      opts: [
        "We assume patients prefer traditional in-person care",
        "We offer basic telehealth but no proactive digital engagement",
        "We survey patients on their digital preferences annually",
        "We continuously analyze patient journey data to optimize our digital front door"
      ]
    }
  }
};

export const getQuestionsForDomain = (domainId: string): AssessmentQuestion[] => {
  const overrides = DOMAIN_OVERRIDES[domainId] || {};
  return BASE_QUESTIONS.map(q => overrides[q.id] || q);
};

export const calculateScore = (answers: Record<number, number>): number => {
  const totalQuestions = Object.keys(answers).length;
  if (totalQuestions === 0) return 0;
  
  let score = 0;
  Object.values(answers).forEach(val => {
    score += (val / 3) * 10; // Max 10 points per question
  });
  
  return score; // Max 100
};

export const getTier = (score: number) => {
  if (score < 25) return { name: "Reactive", color: "text-red-400", desc: "Operating in survival mode. Highly vulnerable to disruption." };
  if (score < 50) return { name: "Aware", color: "text-yellow-400", desc: "Recognizes the need for foresight but lacks systematic execution." };
  if (score < 75) return { name: "Proactive", color: "text-blue-400", desc: "Solid data foundation and actively planning for multiple futures." };
  return { name: "Foresight-Led", color: "text-emerald-400", desc: "Industry leader. Uses foresight to actively shape the market." };
};

export const generateReport = (domainId: string, score: number) => {
  const tier = getTier(score);
  
  const reports: Record<string, string> = {
    "d2c": "In the D2C space, customer acquisition costs are rising while loyalty is dropping. Your score indicates a need to move beyond basic retargeting. The next frontier is predictive commerce—anticipating what the customer needs before they search for it. Focus on unifying your customer data platform (CDP) and implementing AI-driven cohort analysis to identify your most profitable long-term segments.",
    "fintech": "FinTech is facing a dual threat: rapid technological commoditization and shifting regulatory landscapes. Your assessment suggests you need stronger weak-signal detection for regulatory changes and a more robust scenario planning matrix for macroeconomic shifts. Prioritize building an automated competitive intelligence radar to track feature parity across emerging neobanks and embedded finance players.",
    "health": "Healthcare is shifting from reactive treatment to predictive prevention. Your score highlights a gap in leveraging patient-generated health data (wearables, remote monitoring). To reach the 'Foresight-Led' tier, you must implement predictive scoring models to identify high-risk patients before acute episodes occur, and utilize scenario planning to navigate the complex transition to value-based care.",
    "default": `Your organization is currently operating at the '${tier.name}' level. To build true strategic resilience, you must transition from historical reporting to predictive intelligence. We recommend implementing a Horizon Scanning System to detect weak signals in your industry, and utilizing Scenario Planning to stress-test your current business model against potential disruptions.`
  };

  return reports[domainId] || reports["default"];
};
