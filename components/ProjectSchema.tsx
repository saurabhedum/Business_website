import React, { useState } from "react";
import { motion } from "motion/react";
import { HeroMotionBackground } from './ui/HeroMotionBackground';

const SVC: Record<string, any> = {
  "web-app": {
    name: "Web App",
    dom: "Client",
    dc: "dc",
    desc: "Primary client-facing interface built in Next.js. Serves the TriMatrix Pro dashboard, campaign management, and reporting views for clients and agency staff.",
    resp: [
      "Campaign creation & monitoring",
      "Client onboarding flows",
      "Analytics dashboards",
      "Content approval workflows",
      "Billing & subscription management",
    ],
    tech: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "TailwindCSS",
      "React Query / Zustand",
      "Vercel (hosting)",
    ],
    apis: [
      "REST → API Gateway",
      "WebSocket (real-time updates)",
      "Server-sent events (notifications)",
    ],
    deps: ["API Gateway", "CDN / WAF"],
  },
  "mobile-app": {
    name: "Mobile App",
    dom: "Client",
    dc: "dc",
    desc: "React Native app so clients and team members can monitor campaigns, approve content, and receive push notifications on any device.",
    resp: [
      "Campaign status monitoring",
      "Content approval on mobile",
      "Push notification receipt",
      "Quick social post preview",
      "Report summaries",
    ],
    tech: [
      "React Native (Expo)",
      "TypeScript",
      "React Navigation",
      "Firebase Cloud Messaging",
      "App Store + Play Store",
    ],
    apis: [
      "REST → API Gateway",
      "FCM for push",
      "Deep links from notifications",
    ],
    deps: ["API Gateway", "Notification Service"],
  },
  "admin-portal": {
    name: "Admin Portal",
    dom: "Client",
    dc: "dc",
    desc: "Internal portal for trismart.tech staff to manage all client accounts, team assignments, system configs, and platform health monitoring.",
    resp: [
      "Client account management",
      "Team & role management",
      "System configuration",
      "Subscription overrides",
      "Audit logs & compliance",
    ],
    tech: [
      "Next.js (internal route)",
      "RBAC middleware",
      "Recharts (ops dashboards)",
      "Custom admin UI",
    ],
    apis: ["Admin REST routes (JWT-protected)", "Internal DB access for ops"],
    deps: ["Auth & Identity", "Client & CRM", "Billing"],
  },
  "api-gateway": {
    name: "API Gateway",
    dom: "Edge",
    dc: "de",
    desc: "Single entry point for all API traffic. Handles SSL termination, JWT verification, rate limiting, routing to downstream microservices, and request/response logging.",
    resp: [
      "SSL/TLS termination",
      "JWT auth verification",
      "Rate limiting per client/IP",
      "Request routing & load balancing",
      "Request/response audit logging",
      "CORS enforcement",
      "API versioning (v1, v2)",
    ],
    tech: [
      "Kong Gateway / AWS API Gateway",
      "Node.js (custom middleware)",
      "Redis (rate limit counters)",
      "Prometheus metrics",
    ],
    apis: [
      "POST /auth/* → Auth Service",
      "GET /api/campaigns/* → Campaign Mgmt",
      "GET /api/analytics/* → Analytics Engine",
      "POST /api/content/* → AI Content Studio",
    ],
    deps: ["Auth & Identity (token verify)", "Redis (rate limiting)"],
  },
  cdn: {
    name: "CDN / WAF",
    dom: "Edge",
    dc: "de",
    desc: "Cloudflare-backed content delivery network for serving static assets globally with low latency, combined with WAF rules to block malicious traffic before it reaches origin.",
    resp: [
      "Static asset serving (JS, CSS, images)",
      "DDoS mitigation",
      "WAF rule enforcement",
      "Bot protection",
      "Geographic routing / geo-blocking",
    ],
    tech: ["Cloudflare CDN", "Cloudflare WAF", "S3 / R2 as origin"],
    apis: ["Edge cache rules", "Cache purge API (on deploy)"],
    deps: ["S3 / R2 (origin for assets)"],
  },
  auth: {
    name: "Auth & Identity Service",
    dom: "Core",
    dc: "dco",
    desc: "Handles all authentication and authorization. Issues JWTs, manages refresh tokens, supports OAuth 2.0 social login, and enforces role-based access control across every service.",
    resp: [
      "User registration & login",
      "JWT issuance & refresh",
      "OAuth 2.0 (Google, LinkedIn)",
      "Role & permission management",
      "MFA enforcement",
      "Session management",
      "Audit trail for auth events",
    ],
    tech: [
      "Node.js / Fastify",
      "PostgreSQL (users & roles)",
      "Redis (session store, token blacklist)",
      "bcrypt (password hashing)",
      "Passport.js / custom JWT",
    ],
    apis: [
      "POST /auth/login",
      "POST /auth/refresh",
      "POST /auth/logout",
      "GET /auth/me",
      "POST /auth/oauth/google",
    ],
    deps: ["PostgreSQL", "Redis"],
  },
  "client-crm": {
    name: "Client & CRM Service",
    dom: "Core",
    dc: "dco",
    desc: "Source of truth for all client accounts, contacts, and leads. Manages the relationship data that flows through project management, campaigns, and billing.",
    resp: [
      "Client profile management",
      "Contact & lead tracking",
      "Onboarding workflow",
      "Account tier & plan data",
      "Client communication history",
      "Client portal access control",
    ],
    tech: [
      "Node.js / Express",
      "PostgreSQL (clients, contacts)",
      "Redis (client cache)",
      "Nodemailer (welcome emails)",
    ],
    apis: [
      "GET /clients/:id",
      "POST /clients",
      "PUT /clients/:id/contacts",
      "GET /clients/:id/projects",
    ],
    deps: ["Auth & Identity", "PostgreSQL", "Notification Service"],
  },
  "project-mgmt": {
    name: "Project Management Service",
    dom: "Core",
    dc: "dco",
    desc: "Manages the full lifecycle of agency deliverables — from brief creation to task assignment, milestone tracking, and delivery approvals.",
    resp: [
      "Project & brief management",
      "Task assignment & tracking",
      "Milestone & deadline management",
      "Team workload visibility",
      "File attachment linking",
      "Status change notifications",
    ],
    tech: [
      "Node.js / NestJS",
      "PostgreSQL (projects, tasks)",
      "MongoDB (rich briefs)",
      "Event bus (RabbitMQ)",
    ],
    apis: [
      "POST /projects",
      "GET /projects/:id/tasks",
      "PUT /tasks/:id/status",
      "POST /projects/:id/milestones",
    ],
    deps: [
      "Auth & Identity",
      "Client & CRM",
      "PostgreSQL",
      "MongoDB",
      "Notification Service",
    ],
  },
  campaign: {
    name: "Campaign Management Service",
    dom: "Core",
    dc: "dco",
    desc: "Core service managing digital marketing campaigns — creation, scheduling, monitoring, and performance reporting across all platforms for every client.",
    resp: [
      "Campaign creation & configuration",
      "Ad set & audience management",
      "Multi-platform scheduling",
      "KPI & performance tracking",
      "Campaign budget management",
      "A/B testing configuration",
    ],
    tech: [
      "Node.js / NestJS",
      "PostgreSQL (campaigns, budgets)",
      "BullMQ (scheduling)",
      "Integration Hub (platform APIs)",
    ],
    apis: [
      "POST /campaigns",
      "GET /campaigns/:id/stats",
      "PUT /campaigns/:id/pause",
      "POST /campaigns/:id/ab-test",
    ],
    deps: [
      "Auth & Identity",
      "Integration Hub",
      "Analytics Engine",
      "Queue & Workers",
      "PostgreSQL",
    ],
  },
  billing: {
    name: "Billing & Subscription",
    dom: "Core",
    dc: "dco",
    desc: "Manages all billing, subscription plans, invoicing, and Stripe payment processing. Enforces plan-level feature limits and usage metering across the platform.",
    resp: [
      "Subscription plan management",
      "Stripe payment processing",
      "Invoice generation & delivery",
      "Usage metering & overage billing",
      "Plan upgrade/downgrade flows",
      "Stripe webhook handling",
    ],
    tech: [
      "Node.js / Express",
      "Stripe SDK",
      "PostgreSQL (subscriptions, invoices)",
      "PDF generation (invoices)",
    ],
    apis: [
      "POST /billing/subscribe",
      "GET /billing/invoices",
      "POST /billing/webhook (Stripe)",
      "GET /billing/usage",
    ],
    deps: [
      "Auth & Identity",
      "Client & CRM",
      "PostgreSQL",
      "Notification Service",
    ],
  },
  "ai-studio": {
    name: "AI Content Studio",
    dom: "AI & Intel",
    dc: "dai",
    desc: "Powers AI-driven content creation — generating ad copy, social captions, blog articles, email templates, and creative briefs using Claude and GPT-4o. Includes brand voice customisation and human approval flows.",
    resp: [
      "AI content generation (copy, captions)",
      "Brand voice customisation per client",
      "Content template management",
      "Multi-format output (post, email, blog)",
      "Human-in-the-loop approval flow",
      "Version history & side-by-side comparison",
    ],
    tech: [
      "Python / FastAPI",
      "Anthropic Claude API",
      "OpenAI GPT-4o",
      "LangChain orchestration",
      "MongoDB (content versions)",
      "Redis (generation cache)",
    ],
    apis: [
      "POST /content/generate",
      "POST /content/refine",
      "GET /content/:id/versions",
      "POST /content/approve",
    ],
    deps: [
      "Anthropic Claude API",
      "OpenAI API",
      "MongoDB",
      "Redis",
      "Media & Files",
      "Queue & Workers",
    ],
  },
  "social-engine": {
    name: "Social Media Engine",
    dom: "AI & Intel",
    dc: "dai",
    desc: "Orchestrates scheduling, publishing, and monitoring across all social platforms — Instagram, LinkedIn, X, Facebook, and TikTok — with retry logic and platform API abstraction.",
    resp: [
      "Multi-platform post scheduling",
      "Auto-publish & retry logic",
      "Platform API abstraction layer",
      "Post performance polling",
      "Hashtag & audience targeting",
      "Social account management",
    ],
    tech: [
      "Node.js / NestJS",
      "BullMQ (scheduled jobs)",
      "Meta / LinkedIn / X SDKs",
      "Redis (job queue)",
      "PostgreSQL (publish history)",
    ],
    apis: [
      "POST /social/schedule",
      "DELETE /social/:postId",
      "GET /social/accounts",
      "POST /social/publish-now",
    ],
    deps: [
      "Integration Hub",
      "Queue & Workers",
      "Campaign Mgmt",
      "PostgreSQL",
      "Redis",
    ],
  },
  analytics: {
    name: "Analytics Engine",
    dom: "AI & Intel",
    dc: "dai",
    desc: "Aggregates and processes performance data from all campaigns and social platforms to deliver cross-channel insights, scheduled reports, and AI-powered recommendations.",
    resp: [
      "Cross-platform metric aggregation",
      "Custom report generation",
      "PDF/CSV export",
      "Real-time dashboard data feeds",
      "AI insight & recommendation engine",
      "Historical trend analysis",
    ],
    tech: [
      "Python / FastAPI",
      "Elasticsearch (analytics store)",
      "Redis (real-time metrics cache)",
      "Pandas / NumPy",
      "ReportLab (PDF exports)",
    ],
    apis: [
      "GET /analytics/overview",
      "GET /analytics/campaigns/:id",
      "POST /analytics/report/export",
      "GET /analytics/insights",
    ],
    deps: [
      "Elasticsearch",
      "Redis",
      "Campaign Mgmt",
      "Social Media Engine",
      "S3 / R2 (exports)",
    ],
  },
  notification: {
    name: "Notification Service",
    dom: "Platform",
    dc: "dp",
    desc: "Centralised service for all outbound communications — email, SMS, push, and in-app alerts — triggered by events from any other service via the message queue.",
    resp: [
      "Email delivery (transactional)",
      "SMS notifications",
      "Push notifications (iOS / Android)",
      "In-app notification feed",
      "Notification preferences management",
      "Delivery status tracking & retry",
    ],
    tech: [
      "Node.js / Express",
      "SendGrid (email)",
      "Twilio (SMS)",
      "Firebase Cloud Messaging",
      "PostgreSQL (notification log)",
      "RabbitMQ (event consumer)",
    ],
    apis: [
      "POST /notify/email",
      "POST /notify/sms",
      "POST /notify/push",
      "GET /notifications/:userId",
    ],
    deps: [
      "SendGrid API",
      "Twilio API",
      "Firebase FCM",
      "PostgreSQL",
      "Queue & Workers",
    ],
  },
  media: {
    name: "Media & Files Service",
    dom: "Platform",
    dc: "dp",
    desc: "Handles all file uploads, storage, CDN delivery, and media transformations — resize, compress, thumbnail generation — for creative assets across the platform.",
    resp: [
      "Secure file upload (S3 presigned URLs)",
      "Image resize & compression",
      "Video thumbnail extraction",
      "CDN URL generation",
      "Asset versioning",
      "Virus scanning on upload",
    ],
    tech: [
      "Node.js / Express",
      "AWS S3 / Cloudflare R2",
      "Sharp (image processing)",
      "FFmpeg (video thumbnails)",
      "Redis (presign cache)",
    ],
    apis: [
      "POST /media/upload-url (presigned)",
      "DELETE /media/:fileId",
      "POST /media/transform",
      "GET /media/:fileId/info",
    ],
    deps: ["S3 / R2", "Redis", "CDN / WAF"],
  },
  integration: {
    name: "Integration Hub",
    dom: "Platform",
    dc: "dp",
    desc: "Central adapter layer connecting trismart.tech to all third-party APIs — social platforms, CRMs, and ad networks. Manages OAuth tokens, rate limits, and webhook routing.",
    resp: [
      "Social API adapters (Meta, LinkedIn, X, TikTok)",
      "CRM integrations (HubSpot, Salesforce)",
      "Ad network connections (Google Ads, Meta Ads)",
      "Webhook receiver & dispatcher",
      "OAuth token management for integrations",
      "Per-platform rate limit handling",
    ],
    tech: [
      "Node.js / Fastify",
      "Platform SDKs",
      "PostgreSQL (OAuth tokens, configs)",
      "Redis (token cache)",
      "Queue & Workers (retry logic)",
    ],
    apis: [
      "POST /integrations/connect/:platform",
      "GET /integrations/status",
      "POST /integrations/webhook/:platform",
      "DELETE /integrations/:id",
    ],
    deps: [
      "PostgreSQL",
      "Redis",
      "Queue & Workers",
      "External social & ad APIs",
    ],
  },
  queue: {
    name: "Queue & Workers",
    dom: "Platform",
    dc: "dp",
    desc: "Manages all background job processing, scheduled cron tasks, and event-driven workflows — from social publishing to AI generation jobs and report exports.",
    resp: [
      "Background job processing",
      "Scheduled cron jobs",
      "Dead-letter queue handling",
      "Job priority & rate limiting",
      "Worker health monitoring",
      "Retry with exponential backoff",
    ],
    tech: [
      "BullMQ (job queues)",
      "Redis (queue backing store)",
      "Node.js workers",
      "Kubernetes CronJob",
      "Prometheus (queue metrics)",
    ],
    apis: [
      "Internal only — event-driven",
      "POST /jobs (internal service calls)",
      "GET /jobs/:id/status",
    ],
    deps: ["Redis", "All event-producing services"],
  },
  postgres: {
    name: "PostgreSQL",
    dom: "Data",
    dc: "dd",
    desc: "Primary relational database for all structured transactional data — users, clients, campaigns, billing records, and audit logs. Single source of truth for relational entities.",
    resp: [
      "User & auth data",
      "Client & CRM records",
      "Campaign & ad set data",
      "Billing & subscription records",
      "Audit & compliance logs",
      "Project & task data",
    ],
    tech: [
      "PostgreSQL 15+",
      "PgBouncer (connection pooling)",
      "Read replicas for analytics",
      "Automated daily backups",
      "Row-level security (RLS)",
    ],
    apis: ["Internal — service ORMs (Prisma, TypeORM)"],
    deps: [],
  },
  redis: {
    name: "Redis",
    dom: "Data",
    dc: "dd",
    desc: "In-memory data store used for caching, session storage, rate limit counters, real-time metrics, and as the backing store for BullMQ job queues across the platform.",
    resp: [
      "Session & JWT cache",
      "Rate limit counters",
      "Queue job storage (BullMQ)",
      "Real-time dashboard caching",
      "API response caching",
      "Token blacklisting",
    ],
    tech: [
      "Redis 7.x",
      "Redis Cluster (HA)",
      "Redis Streams for events",
      "Upstash (serverless option)",
    ],
    apis: ["Internal — ioredis / @upstash/redis client"],
    deps: [],
  },
  mongodb: {
    name: "MongoDB",
    dom: "Data",
    dc: "dd",
    desc: "Document store for flexible, schema-evolving data — AI-generated content versions, rich project briefs, and deeply nested content structures that don't fit a relational model.",
    resp: [
      "AI content drafts & versions",
      "Project brief documents",
      "Template library storage",
      "Content approval history",
      "Dynamic form / survey data",
    ],
    tech: [
      "MongoDB 6+",
      "Atlas (managed)",
      "Mongoose ODM",
      "Atlas Search (full-text)",
      "Aggregation pipelines",
    ],
    apis: ["Internal — AI Studio & Project Mgmt services"],
    deps: [],
  },
  s3: {
    name: "S3 / R2 Object Store",
    dom: "Data",
    dc: "dd",
    desc: "Binary object storage for all media files, creative assets, exported reports, database backups, and static build artifacts delivered via CDN.",
    resp: [
      "Creative asset storage (images, video)",
      "Exported reports (PDF, CSV)",
      "Database backup storage",
      "Static build artifacts",
      "Signed URL generation for secure access",
    ],
    tech: [
      "AWS S3 / Cloudflare R2",
      "S3 lifecycle policies",
      "Versioning enabled",
      "Server-side encryption (AES-256)",
    ],
    apis: ["S3 SDK (presigned PUT/GET)", "Accessed via Media & Files Service"],
    deps: [],
  },
  elastic: {
    name: "Elasticsearch",
    dom: "Data",
    dc: "dd",
    desc: "Search and analytics engine storing aggregated campaign metrics, application logs, and full-text search indexes for content and client data.",
    resp: [
      "Campaign performance metrics storage",
      "Full-text content search",
      "Application log aggregation",
      "Real-time analytics queries",
      "Anomaly detection indexing",
    ],
    tech: [
      "Elasticsearch 8.x",
      "Kibana (internal monitoring)",
      "Logstash / Fluentd (log pipeline)",
      "Elastic APM",
    ],
    apis: ["Internal — Analytics Engine & log pipeline"],
    deps: [],
  },
};

export const ProjectSchema = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeSvc = activeId ? SVC[activeId] : null;

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  const getCardClass = (id: string, dc: string) => {
    const base =
      "flex-1 min-w-0 p-2 md:p-3 rounded-md border-[0.5px] cursor-pointer transition-all duration-150 select-none";
    const isActive =
      activeId === id
        ? "border-[1.5px] opacity-100"
        : "opacity-80 hover:opacity-100";

    let colorClass = "";
    switch (dc) {
      case "dc":
        colorClass = "bg-[#042C53] border-[#85B7EB] text-[#B5D4F4]";
        break;
      case "de":
        colorClass = "bg-[#2C2C2A] border-[#B4B2A9] text-[#D3D1C7]";
        break;
      case "dco":
        colorClass = "bg-[#04342C] border-[#5DCAA5] text-[#9FE1CB]";
        break;
      case "dai":
        colorClass = "bg-[#26215C] border-[#AFA9EC] text-[#CECBF6]";
        break;
      case "dp":
        colorClass = "bg-[#412402] border-[#EF9F27] text-[#FAC775]";
        break;
      case "dd":
        colorClass = "bg-[#4A1B0C] border-[#F0997B] text-[#F5C4B3]";
        break;
    }

    return `${base} ${isActive} ${colorClass}`;
  };

  const getBadgeClass = (dc: string) => {
    let colorClass = "";
    switch (dc) {
      case "dc":
        colorClass = "bg-[#042C53] border-[#85B7EB] text-[#B5D4F4]";
        break;
      case "de":
        colorClass = "bg-[#2C2C2A] border-[#B4B2A9] text-[#D3D1C7]";
        break;
      case "dco":
        colorClass = "bg-[#04342C] border-[#5DCAA5] text-[#9FE1CB]";
        break;
      case "dai":
        colorClass = "bg-[#26215C] border-[#AFA9EC] text-[#CECBF6]";
        break;
      case "dp":
        colorClass = "bg-[#412402] border-[#EF9F27] text-[#FAC775]";
        break;
      case "dd":
        colorClass = "bg-[#4A1B0C] border-[#F0997B] text-[#F5C4B3]";
        break;
    }
    return `text-[10px] font-medium px-2.5 py-0.5 rounded-md border-[0.5px] ${colorClass}`;
  };

  return (
    <div className="py-8 px-4 md:px-8 font-sans bg-[#0B0F19] text-white min-h-screen relative overflow-hidden">
      <HeroMotionBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Project Schema</h1>

        <div className="flex gap-4 flex-wrap mb-6 text-xs text-gray-400">
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[#378ADD]"></span>
            Client
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[#888780]"></span>
            Edge
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[#1D9E75]"></span>
            Core services
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[#7F77DD]"></span>
            AI & intelligence
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[#BA7517]"></span>
            Platform
          </span>
          <span className="flex items-center">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2 bg-[#D85A30]"></span>
            Data
          </span>
        </div>

        {/* Layers */}
        <div className="space-y-1">
          {/* Client Layer */}
          <div className="flex items-stretch gap-2 mb-1">
            <div className="text-[10px] text-gray-400 text-right w-16 shrink-0 pt-2.5 leading-tight">
              Clients
            </div>
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-x-auto pb-2">
              <div
                className={getCardClass("web-app", "dc")}
                onClick={() => handleSelect("web-app")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Web App
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Next.js / React
                </p>
              </div>
              <div
                className={getCardClass("mobile-app", "dc")}
                onClick={() => handleSelect("mobile-app")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Mobile App
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  React Native
                </p>
              </div>
              <div
                className={getCardClass("admin-portal", "dc")}
                onClick={() => handleSelect("admin-portal")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Admin Portal
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Internal ops
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-500 text-sm my-0.5 ml-[68px]">
            ↓
          </div>

          {/* Edge Layer */}
          <div className="flex items-stretch gap-2 mb-1">
            <div className="text-[10px] text-gray-400 text-right w-16 shrink-0 pt-2.5 leading-tight">
              Edge
            </div>
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-x-auto pb-2">
              <div
                className={`${getCardClass("api-gateway", "de")} flex-[2]`}
                onClick={() => handleSelect("api-gateway")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  API Gateway
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Auth · Rate limit · Routing · SSL
                </p>
              </div>
              <div
                className={getCardClass("cdn", "de")}
                onClick={() => handleSelect("cdn")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  CDN / WAF
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Assets · DDoS
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-500 text-sm my-0.5 ml-[68px]">
            ↓
          </div>

          {/* Core Layer */}
          <div className="flex items-stretch gap-2 mb-1">
            <div className="text-[10px] text-gray-400 text-right w-16 shrink-0 pt-2.5 leading-tight">
              Core
            </div>
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-x-auto pb-2">
              <div
                className={getCardClass("auth", "dco")}
                onClick={() => handleSelect("auth")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Auth & Identity
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  JWT · OAuth 2.0
                </p>
              </div>
              <div
                className={getCardClass("client-crm", "dco")}
                onClick={() => handleSelect("client-crm")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Client & CRM
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Clients · Leads
                </p>
              </div>
              <div
                className={getCardClass("project-mgmt", "dco")}
                onClick={() => handleSelect("project-mgmt")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Project Mgmt
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Tasks · Milestones
                </p>
              </div>
              <div
                className={getCardClass("campaign", "dco")}
                onClick={() => handleSelect("campaign")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Campaign Mgmt
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Campaigns · Ads
                </p>
              </div>
              <div
                className={getCardClass("billing", "dco")}
                onClick={() => handleSelect("billing")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Billing
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Stripe · Invoices
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-500 text-sm my-0.5 ml-[68px]">
            ↓
          </div>

          {/* AI & Intel Layer */}
          <div className="flex items-stretch gap-2 mb-1">
            <div className="text-[10px] text-gray-400 text-right w-16 shrink-0 pt-2.5 leading-tight">
              AI & Intel
            </div>
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-x-auto pb-2">
              <div
                className={getCardClass("ai-studio", "dai")}
                onClick={() => handleSelect("ai-studio")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  AI Content Studio
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Claude · GPT-4o
                </p>
              </div>
              <div
                className={getCardClass("social-engine", "dai")}
                onClick={() => handleSelect("social-engine")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Social Media Engine
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Multi-platform auto
                </p>
              </div>
              <div
                className={getCardClass("analytics", "dai")}
                onClick={() => handleSelect("analytics")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Analytics Engine
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Reports · Insights
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-500 text-sm my-0.5 ml-[68px]">
            ↓
          </div>

          {/* Platform Layer */}
          <div className="flex items-stretch gap-2 mb-1">
            <div className="text-[10px] text-gray-400 text-right w-16 shrink-0 pt-2.5 leading-tight">
              Platform
            </div>
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-x-auto pb-2">
              <div
                className={getCardClass("notification", "dp")}
                onClick={() => handleSelect("notification")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Notification
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Email · SMS · Push
                </p>
              </div>
              <div
                className={getCardClass("media", "dp")}
                onClick={() => handleSelect("media")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Media & Files
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Upload · Transform
                </p>
              </div>
              <div
                className={getCardClass("integration", "dp")}
                onClick={() => handleSelect("integration")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Integration Hub
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Social APIs · CRMs
                </p>
              </div>
              <div
                className={getCardClass("queue", "dp")}
                onClick={() => handleSelect("queue")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Queue & Workers
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  BullMQ · Cron
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-gray-500 text-sm my-0.5 ml-[68px]">
            ↓
          </div>

          {/* Data Layer */}
          <div className="flex items-stretch gap-2 mb-1">
            <div className="text-[10px] text-gray-400 text-right w-16 shrink-0 pt-2.5 leading-tight">
              Data
            </div>
            <div className="flex gap-1.5 flex-1 flex-nowrap overflow-x-auto pb-2">
              <div
                className={getCardClass("postgres", "dd")}
                onClick={() => handleSelect("postgres")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  PostgreSQL
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Primary DB
                </p>
              </div>
              <div
                className={getCardClass("redis", "dd")}
                onClick={() => handleSelect("redis")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Redis
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Cache · Sessions
                </p>
              </div>
              <div
                className={getCardClass("mongodb", "dd")}
                onClick={() => handleSelect("mongodb")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  MongoDB
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Content · Docs
                </p>
              </div>
              <div
                className={getCardClass("s3", "dd")}
                onClick={() => handleSelect("s3")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  S3 / R2
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Media · Backups
                </p>
              </div>
              <div
                className={getCardClass("elastic", "dd")}
                onClick={() => handleSelect("elastic")}
              >
                <p className="text-[11px] font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Elasticsearch
                </p>
                <p className="text-[10px] opacity-65 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  Search · Logs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="mt-6 border-t-[0.5px] border-gray-800 pt-6">
          {!activeSvc ? (
            <div className="text-xs text-gray-500 text-center py-8">
              Click any service above to explore its responsibilities, tech
              stack, APIs, and dependencies
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeId}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={getBadgeClass(activeSvc.dc)}>
                  {activeSvc.dom}
                </span>
                <span className="text-[15px] font-medium text-white">
                  {activeSvc.name}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                {activeSvc.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-[#111827] rounded-md p-3">
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Responsibilities
                  </p>
                  <ul className="list-none space-y-1.5">
                    {activeSvc.resp.length ? (
                      activeSvc.resp.map((r: string, i: number) => (
                        <li
                          key={i}
                          className="text-[11px] text-gray-400 border-b-[0.5px] border-gray-800 pb-1.5 last:border-0"
                        >
                          {r}
                        </li>
                      ))
                    ) : (
                      <li className="text-[11px] text-gray-400">
                        No dependencies
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-[#111827] rounded-md p-3">
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Tech stack
                  </p>
                  <ul className="list-none space-y-1.5">
                    {activeSvc.tech.length ? (
                      activeSvc.tech.map((r: string, i: number) => (
                        <li
                          key={i}
                          className="text-[11px] text-gray-400 border-b-[0.5px] border-gray-800 pb-1.5 last:border-0"
                        >
                          {r}
                        </li>
                      ))
                    ) : (
                      <li className="text-[11px] text-gray-400">
                        No dependencies
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-[#111827] rounded-md p-3">
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Key APIs
                  </p>
                  <ul className="list-none space-y-1.5">
                    {activeSvc.apis.length ? (
                      activeSvc.apis.map((r: string, i: number) => (
                        <li
                          key={i}
                          className="text-[11px] text-gray-400 border-b-[0.5px] border-gray-800 pb-1.5 last:border-0"
                        >
                          {r}
                        </li>
                      ))
                    ) : (
                      <li className="text-[11px] text-gray-400">
                        No dependencies
                      </li>
                    )}
                  </ul>
                </div>
                <div className="bg-[#111827] rounded-md p-3">
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Depends on
                  </p>
                  <ul className="list-none space-y-1.5">
                    {activeSvc.deps.length ? (
                      activeSvc.deps.map((r: string, i: number) => (
                        <li
                          key={i}
                          className="text-[11px] text-gray-400 border-b-[0.5px] border-gray-800 pb-1.5 last:border-0"
                        >
                          {r}
                        </li>
                      ))
                    ) : (
                      <li className="text-[11px] text-gray-400">
                        No dependencies
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
