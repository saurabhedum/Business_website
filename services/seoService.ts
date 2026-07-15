import { db, handleFirestoreError, OperationType } from '../src/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface SEOMetrics {
  lastUpdated: string;
  sourceGoogleTrendsIN: boolean;
  sourceGoogleTrendsUS: boolean;
  sourceDevTo: boolean;
  totalKeywordsActive: number;
  activeTrends: string[];
}

export interface SEOConfig {
  fixedKeywords: string[];
  customDescription: string;
  enableGoogleTrendsIN: boolean;
  enableGoogleTrendsUS: boolean;
  enableDevTo: boolean;
  lastSyncedAt?: any;
}

const DEFAULT_FIXED_KEYWORDS = [
  'Intelligent Automation', 'Robotic Process Automation', 'RPA India', 
  'AI for Business India', 'Digital Transformation Services', 
  'Enterprise Workflow Automation', 'Machine Learning Solutions', 
  'Business Process Management', 'Cognitive Automation', 
  'Hyperautomation India', 'Smart Enterprise Systems', 
  'Industrial IoT Solutions', 'AI-Driven Analytics', 
  'Automated Compliance Reporting', 'Strategic Automation Consulting', 
  'Revenue Enhancement AI', 'Profitomics', 
  'System Modeling & Simulation', 'Digital Twin Technology', 
  'Cloud Infrastructure Automation'
];

const DEFAULT_DESCRIPTION = 'Trismart provides cutting-edge intelligent automation solutions, integrating state of art technology and crossdomain functional systems to boost your revenue and to transform your enterprise operations.';

export class SEOService {
  private static instance: SEOService;
  private currentTrends: string[] = [];
  private metrics: SEOMetrics = {
    lastUpdated: new Date().toISOString(),
    sourceGoogleTrendsIN: false,
    sourceGoogleTrendsUS: false,
    sourceDevTo: false,
    totalKeywordsActive: DEFAULT_FIXED_KEYWORDS.length,
    activeTrends: []
  };

  private constructor() {}

  public static getInstance(): SEOService {
    if (!SEOService.instance) {
      SEOService.instance = new SEOService();
    }
    return SEOService.instance;
  }

  /**
   * Fetch Google Trends via RSS-to-JSON Proxy
   * Highly secure, resilient, and doesn't trigger CORS issues
   */
  private async fetchGoogleTrends(geo: 'IN' | 'US'): Promise<string[]> {
    try {
      const feedUrl = encodeURIComponent(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`);
      const apiEndpoint = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`;
      
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error(`HTTP error fetching google trends for ${geo}`);
      
      const data = await response.json();
      if (data && data.items && Array.isArray(data.items)) {
        // Extract titles / keywords from RSS feed items
        const keywords = data.items
          .map((item: any) => item.title)
          .filter((title: string) => title && title.length > 2)
          .slice(0, 15); // Top 15 trends
        
        return keywords;
      }
      return [];
    } catch (err) {
      console.warn(`[SEO Service] Google Trends fetch failed for ${geo}:`, err);
      return [];
    }
  }

  /**
   * Fetch Dev.to trending topics / articles in Automation, AI, and Tech
   * Helps capture highly genuine industry-specific trends in real time
   */
  private async fetchDevToTrends(): Promise<string[]> {
    try {
      // Dev.to search for popular articles on AI and Automation
      const response = await fetch('https://dev.to/api/articles?tag=automation&per_page=8');
      if (!response.ok) throw new Error('HTTP error fetching Dev.to trends');
      
      const articles = await response.json();
      if (Array.isArray(articles)) {
        const keywordsSet = new Set<string>();
        articles.forEach((art: any) => {
          if (art.tags && Array.isArray(art.tags)) {
            art.tags.forEach((tag: string) => {
              if (tag && tag.length > 2) {
                // Capitalize and format nicely
                const formatted = tag
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                keywordsSet.add(formatted);
              }
            });
          }
          if (art.title) {
            // Pick up strong keywords from titles (e.g. AI, GPT, Cloud)
            const matches = art.title.match(/\b(AI|LLM|RPA|No-Code|Cloud|Agentic|Ecosystem|Robot|Bot|Automation|SaaS|API)\b/gi);
            if (matches) {
              matches.forEach((m: string) => keywordsSet.add(m.toUpperCase()));
            }
          }
        });
        return Array.from(keywordsSet).slice(0, 15);
      }
      return [];
    } catch (err) {
      console.warn('[SEO Service] Dev.to Trends fetch failed:', err);
      return [];
    }
  }

  /**
   * Load current custom configuration or fallback to defaults
   */
  public async getSEOConfig(): Promise<SEOConfig> {
    const configPath = 'settings/seo_config';
    try {
      const configRef = doc(db, 'settings', 'seo_config');
      const docSnap = await getDoc(configRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          fixedKeywords: data.fixedKeywords || DEFAULT_FIXED_KEYWORDS,
          customDescription: data.customDescription || DEFAULT_DESCRIPTION,
          enableGoogleTrendsIN: data.enableGoogleTrendsIN !== false,
          enableGoogleTrendsUS: data.enableGoogleTrendsUS !== false,
          enableDevTo: data.enableDevTo !== false,
          lastSyncedAt: data.lastSyncedAt || null
        };
      }
    } catch (err) {
      console.error('[SEO Service] Error loading Firestore configuration:', err);
      handleFirestoreError(err, OperationType.GET, configPath);
    }

    return {
      fixedKeywords: DEFAULT_FIXED_KEYWORDS,
      customDescription: DEFAULT_DESCRIPTION,
      enableGoogleTrendsIN: true,
      enableGoogleTrendsUS: true,
      enableDevTo: true
    };
  }

  /**
   * Save configuration back to Firestore
   */
  public async saveSEOConfig(config: SEOConfig): Promise<void> {
    const configPath = 'settings/seo_config';
    try {
      const configRef = doc(db, 'settings', 'seo_config');
      await setDoc(configRef, {
        ...config,
        lastSyncedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error('[SEO Service] Error saving configuration to Firestore:', err);
      handleFirestoreError(err, OperationType.WRITE, configPath);
    }
  }

  /**
   * Main Dynamic Optimizer Pipeline
   * Fetches, merges, and updates all DOM meta tags in real-time
   */
  public async runRealtimeSEOUpdate(): Promise<SEOMetrics> {
    const config = await this.getSEOConfig();
    
    let googleIN: string[] = [];
    let googleUS: string[] = [];
    let devTo: string[] = [];

    // Run parallel fetch of real-time sources
    const fetches = [];
    if (config.enableGoogleTrendsIN) {
      fetches.push(this.fetchGoogleTrends('IN').then(res => googleIN = res));
    }
    if (config.enableGoogleTrendsUS) {
      fetches.push(this.fetchGoogleTrends('US').then(res => googleUS = res));
    }
    if (config.enableDevTo) {
      fetches.push(this.fetchDevToTrends().then(res => devTo = res));
    }

    await Promise.allSettled(fetches);

    // Merge and filter trends
    const uniqueTrendsSet = new Set<string>();
    [...googleIN, ...googleUS, ...devTo].forEach(item => {
      // Clean keyword
      const cleaned = item.trim().replace(/[^\w\s-]/g, '');
      if (cleaned.length > 2 && cleaned.length < 50) {
        uniqueTrendsSet.add(cleaned);
      }
    });

    const activeTrends = Array.from(uniqueTrendsSet).slice(0, 30);
    this.currentTrends = activeTrends;

    // Build the finalized list of keywords
    const combinedKeywords = [...config.fixedKeywords, ...activeTrends];
    const uniqueCombinedKeywords = Array.from(new Set(combinedKeywords));

    // Update Meta DOM tags
    this.updateDOMMetaTags(uniqueCombinedKeywords, config.customDescription, activeTrends);

    // Prepare updated metrics
    this.metrics = {
      lastUpdated: new Date().toISOString(),
      sourceGoogleTrendsIN: googleIN.length > 0,
      sourceGoogleTrendsUS: googleUS.length > 0,
      sourceDevTo: devTo.length > 0,
      totalKeywordsActive: uniqueCombinedKeywords.length,
      activeTrends: activeTrends
    };

    // Store in LocalStorage for persistence across loads
    try {
      localStorage.setItem('trismart_active_seo_trends', JSON.stringify(this.metrics));
    } catch (e) {
      console.warn('[SEO Service] LocalStorage write failed:', e);
    }

    return this.metrics;
  }

  /**
   * Read active trends from Cache or LocalStorage
   */
  public getCachedMetrics(): SEOMetrics {
    try {
      const cached = localStorage.getItem('trismart_active_seo_trends');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // fallback
    }
    return this.metrics;
  }

  /**
   * Helper to write values straight to the meta headers
   */
  private updateDOMMetaTags(keywords: string[], baseDescription: string, topTrends: string[]) {
    try {
      // 1. Update Meta Keywords
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', keywords.join(', '));

      // 2. Update Description with live trending accents
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.setAttribute('name', 'description');
        document.head.appendChild(descriptionMeta);
      }
      const trendAccent = topTrends.length > 0 
        ? ` Leading intelligent automation with fresh integrations including ${topTrends.slice(0, 3).join(', ')}.`
        : '';
      const finalDescription = `${baseDescription}${trendAccent}`;
      descriptionMeta.setAttribute('content', finalDescription);

      // 3. Update OG Metadata
      const ogKeywords = document.querySelector('meta[property="og:keywords"]');
      if (ogKeywords) {
        ogKeywords.setAttribute('content', keywords.join(', '));
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', finalDescription);
      }

      const twitterDesc = document.querySelector('meta[property="twitter:description"]');
      if (twitterDesc) {
        twitterDesc.setAttribute('content', finalDescription);
      }

      // 4. Update JSON-LD structured data block
      const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
      jsonLdScripts.forEach(script => {
        try {
          const content = script.textContent;
          if (content && content.includes('"@type": "Organization"')) {
            const parsed = JSON.parse(content);
            parsed.description = finalDescription;
            // Add a dynamic search key suggestion list!
            parsed.knowsAbout = keywords.slice(0, 10);
            script.textContent = JSON.stringify(parsed, null, 2);
          }
        } catch (jsonErr) {
          // ignore parsing error
        }
      });

      console.log(`[SEO Engine] Succeeded: Loaded ${keywords.length} keywords into real-time search meta index.`);
    } catch (err) {
      console.error('[SEO Engine] Failed updating meta tags:', err);
    }
  }
}
