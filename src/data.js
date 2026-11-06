export const projects = [
  {
    title: "Pricing Hub",
    tag: "Retail Promotional Pricing Platform",
    category: "fullstack",
    year: "2025–2026",
    desc: "Promotional pricing platform for The Children's Place — multi-pivot pricing on AG Grid, a hierarchy cascade from Division to Style-Color, and an automated MPP hand-off pipeline.",
    detail: "Migrated the Next.js application from JavaScript to strict TypeScript and moved the data layer to Prisma with PostgreSQL, with modular, typed API routes. Built the MPP hand-off pipeline, turning published promotions into a CSV upload file and an Excel cancel list, with date ranges, dollar-off promotions and leading-zero-safe IDs. Engineered multi-pivot pricing and the hierarchy cascade (Division → Style-Color) on AG Grid, including pivot override rules, offer extension and Hardmark uploads for future product moves. Integrated Promo Intel suggested promotions with retail price guards and role-based publishing, and wrote Playwright end-to-end tests and the in-app user manual.",
    stack: ["Next.js", "TypeScript", "AG Grid", "Prisma", "PostgreSQL", "Playwright"],
      link: null,
    linkLabel: "Not a public project",
    color: "#8d9eff"
  },
  {
    title: "Daftarpro",
    tag: "Office Operations Suite",
    category: "fullstack",
    year: "2025",
    desc: "Core operational platform covering HR, accounting, employee data, document management, asset tracking, and an automated hiring pipeline.",
    detail: "Developed and optimized core operational modules including HR, accounting, and employee data management. Engineered a secure Document Management System integrating Cloudinary for asset storage and database-linked file retrieval. Designed an Asset Tracking System to monitor hardware assignments and inventory lifecycle. Built a dynamic Hiring Module with automated interview scheduling, real-time candidate notifications, and role-based access control.",
    stack: ["React", "Node.js", "MongoDB", "Cloudinary", "JWT"],
    link: "https://www.daftarpro.com/",
    linkLabel: "Live site",
    color: "#5ee0c0"
  },
  {
    title: "ADHA",
    tag: "Data Analytics Portal",
    category: "fullstack",
    year: "2025–2026",
    desc: "High-performance government data dashboard for the Abu Dhabi Housing Authority — complex visualizations over large datasets with near-instant retrieval.",
    detail: "Architected a high-performance data dashboard for complex visualizations using Recharts (Donut and Line charts). Streamlined data pipeline performance by integrating Databricks with IndexedDB, enabling near-instantaneous frontend data retrieval for large datasets.",
    stack: ["React", "Recharts", "Databricks", "IndexedDB", "Node.js"],
      link: null,
    linkLabel: "Not a public project",
    color: "#f2a65a"
  },
  {
    title: "WEP — SMEDA",
    tag: "Government Platform",
    category: "fullstack",
    year: "2025–2026",
    desc: "SMEDA's women empowerment platform with real-time chat, automated weekly engagement reports, full Urdu localization, and a security overhaul.",
    detail: "Implemented a real-time chat module supporting emoji reactions and nested message replies. Engineered an async cron job utility to compile and deliver automated weekly updates on community post engagement. Architected complete platform localization in Urdu using i18n libraries alongside 100% mobile-responsive layouts. Integrated Google reCAPTCHA and led a comprehensive frontend redesign of the primary landing page.",
    stack: ["React", "Socket.io", "i18n", "Node.js", "reCAPTCHA"],
    link: "https://shecreates.smeda.org/en/",
    linkLabel: "Live site",
    color: "#c084fc"
  },
  {
    title: "WiseVision",
    tag: "E-commerce Platform",
    category: "frontend",
    year: "2026",
    desc: "Full UI/UX build of a 20+ page electronics storefront in Next.js, with optimized image pipelines and a headless Sanity.io CMS for admin-managed products.",
    detail: "Built a complete e-commerce experience from scratch — product listing, filtering, cart, checkout flow — using Next.js App Router and Sanity.io as the backend CMS. Optimized Core Web Vitals to 95+ Lighthouse score with image lazy loading and static generation.",
    stack: ["Next.js", "Sanity.io", "Tailwind CSS", "Vercel"],
    link: "https://wisevision-website.vercel.app/",
    linkLabel: "Live site",
    color: "#5ee0c0"
  },
  {
    title: "Blood Donation Record",
    tag: "Full Stack App",
    category: "fullstack",
    year: "2025",
    desc: "React + Redux CRUD app for managing donor records, backed by ASP.NET Core and SQL Server, with async Redux Thunk calls via Axios.",
    detail: "Designed and built both the frontend and REST API from scratch. Features donor registration, search/filter, history tracking, and admin management with JWT auth. Redux Thunk handles all async state, keeping the UI snappy even with large datasets.",
    stack: ["React", "Redux", "ASP.NET Core", "SQL Server", "Axios"],
    link: "https://github.com/Hashir52422/BloodDonationF",
    linkLabel: "GitHub repo",
    color: "#f2a65a"
  },
  {
    title: "Grilli Restaurant",
    tag: "Landing Page",
    category: "frontend",
    year: "2023",
    desc: "Fully responsive restaurant site in vanilla HTML/CSS/JS — menu showcase, smooth navigation and image sliders, deployed on Netlify.",
    detail: "A pixel-perfect, fully responsive restaurant website featuring animated menu sections, smooth scroll navigation, and custom image sliders — all in vanilla HTML/CSS/JS with zero frameworks. Deployed and live on Netlify with CI from GitHub.",
    stack: ["HTML", "CSS", "JavaScript", "Netlify"],
    link: "https://resturant-grilli.netlify.app/",
    linkLabel: "Live site",
    color: "#8d9eff"
  },
  {
    title: "Country Club ERP",
    tag: "Enterprise Platform",
    category: "fullstack",
    year: "2024–2025",
    desc: "Centralized ERP for club operations — Membership, Restaurant, Sports and Rooms modules, role-based dashboards, JWT-secured ASP.NET Identity.",
    detail: "Led development of a multi-module ERP replacing a legacy system for a large country club. Built four interdependent modules — Membership, Restaurant POS, Sports booking, and Rooms — all sharing a single role-based access layer with ASP.NET Identity and JWT.",
    stack: ["React", "ASP.NET Core", "SQL Server", "JWT", "Entity Framework"],
    link: null,
    linkLabel: "Not a public project",
    color: "#e8e6df"
  }
];

export const skillsFrontend = [
  "React.js & Next.js",
  "TypeScript",
  "AG Grid & data-heavy UIs",
  "Redux, Zustand & TanStack Query",
  "Tailwind CSS",
  "Responsive, accessible UI"
];

export const skillsBackend = [
  "Node.js & Express",
  "MongoDB & Mongoose",
  "PostgreSQL & Prisma",
  "RESTful API design",
  "Redis caching",
  "Playwright end-to-end testing",
  "Docker & CI/CD",
  "Git & GitHub workflows"
];
