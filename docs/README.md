# Agri-Guardian Web

**The Enterprise Command Center for Modern Agriculture**

Agri-Guardian Web is a real-time, AI-powered farm management platform designed for large-scale agricultural operations. It provides farm owners with comprehensive visibility into their entire operation — from soil health and inventory to predictive crop intelligence.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Design System](#design-system)
- [Animation System](#animation-system)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

Agri-Guardian Web serves as the desktop control hub for mobile field scouting teams. It aggregates field data, provides AI-powered insights, and enables data-driven decision making for enterprise-scale farm operations.

### Key Value Propositions

- **Real-time Monitoring**: Live KPIs, trends, and performance metrics
- **AI-Powered Insights**: Predictive analytics with 94% yield prediction accuracy
- **Enterprise Scale**: Built for thousands of hectares across multiple fields
- **Offline-First**: Works seamlessly online and offline
- **Secure**: Role-based data isolation with enterprise-grade security

## Features

### Core Modules

1. **Executive Farm Dashboard**
   - Real-time KPIs and performance metrics
   - Trend analysis and historical comparisons
   - Unified view across all operations

2. **Soil Health Monitoring**
   - NPK levels tracking
   - pH trend analysis
   - Soil composition over time

3. **Visual Field Mapping**
   - Interactive field maps
   - Health status visualization
   - Problem area identification

4. **AI Crop Intelligence**
   - Yield forecasting (94% accuracy)
   - Risk identification (91% accuracy)
   - Treatment recommendations (89% accuracy)
   - Natural language expert assistant

5. **Microclimate Insights**
   - Live weather data
   - Spray window predictions
   - Irrigation scheduling

6. **Inventory Management**
   - Seeds, fertilizers, chemicals tracking
   - Usage forecasts
   - Reorder alerts

7. **Photo-Based Evidence**
   - Geo-tagged field photos
   - Compliance documentation
   - Historical records

8. **Seasonal Reporting**
   - Automated compliance reports
   - Seasonal summaries
   - Export-ready documentation

## Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Backend & Auth |
| React Router | Routing |
| React Query | Data Fetching |
| Lucide React | Icons |
| shadcn/ui | UI Components |

## Project Structure

```
src/
├── assets/                 # Static assets (images, etc.)
├── components/
│   ├── animations/         # Reusable animation components
│   │   ├── index.ts
│   │   ├── ParallaxSection.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── StaggerContainer.tsx
│   ├── landing/            # Landing page sections
│   │   ├── AIIntelligence.tsx
│   │   ├── DesignedForScale.tsx
│   │   ├── Features.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Navbar.tsx
│   │   └── TechnologyTrust.tsx
│   └── ui/                 # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── hooks/                  # Custom React hooks
├── integrations/
│   └── supabase/          # Supabase client & types
├── lib/                    # Utility functions
├── pages/                  # Page components
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── NotFound.tsx
├── App.tsx                 # Main app component
├── App.css                 # Global styles
├── index.css               # Tailwind & design tokens
└── main.tsx                # App entry point

docs/                       # Documentation
├── README.md               # This file
├── ARCHITECTURE.md         # Architecture details
├── LANDING_PAGE.md         # Landing page implementation
├── DESIGN_SYSTEM.md        # Design system documentation
└── AUTHENTICATION.md       # Auth implementation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

The project uses Lovable Cloud (Supabase) for backend services. Environment variables are automatically configured:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key

## Authentication

The app uses Supabase Auth with the following features:

- Email/Password authentication
- Google OAuth integration
- Session persistence
- Protected routes

See [AUTHENTICATION.md](./AUTHENTICATION.md) for detailed implementation.

## Design System

The app uses a custom design system built on Tailwind CSS with:

- Semantic color tokens
- Custom typography (font-display)
- Glassmorphism effects
- Gradient utilities
- Animation utilities

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

## Animation System

Built with Framer Motion, featuring:

- Scroll reveal animations
- Staggered card appearances
- Parallax effects
- Hover interactions
- Page transitions

See [LANDING_PAGE.md](./LANDING_PAGE.md) for implementation details.

## Deployment

The app is deployed via Lovable's built-in deployment system:

1. Click "Publish" in the Lovable editor
2. Choose subdomain or connect custom domain
3. Click "Update" to deploy changes

### Production URL

Once published, the app will be available at:
- `https://<project-name>.lovable.app`
- Or your custom domain

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit for review

## License

Copyright © 2024 Agri-Guardian Web. All rights reserved.

## Contact

- Twitter/X: [@IssaKamaldeen7](https://x.com/IssaKamaldeen7)
- LinkedIn: [Issa Kamaldeen](https://www.linkedin.com/in/issa-kamaldeen)
- GitHub: [Kamaldeen30a](https://github.com/Kamaldeen30a/)
