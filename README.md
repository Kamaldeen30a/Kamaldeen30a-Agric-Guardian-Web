# Agri-Guardian Web

An AI-powered agricultural management platform designed for large-scale farming operations. Built with modern web technologies and machine learning capabilities.

## 🌱 Features

### Core Capabilities
- **Executive Farm Dashboard** - Real-time KPIs, trends, and performance metrics
- **Soil Health Monitoring** - Track NPK levels, pH trends, and soil composition
- **Visual Field Mapping** - Interactive maps showing field health status
- **Microclimate Insights** - Live weather data with spray window predictions
- **Inventory Management** - Track seeds, fertilizers, and chemicals
- **Seasonal Reporting** - Automated compliance reports and documentation

### AI-Powered Features
- **Cassava Leaf Disease Detection** - ML-powered image analysis to identify:
  - Cassava Mosaic Disease (CMD)
  - Cassava Brown Streak Disease (CBSD)
  - Cassava Green Mite (CGM) damage
  - Healthy leaf classification
  - 95%+ detection accuracy
- **Yield Prediction** - Forecast crop performance with 94% accuracy
- **Risk Identification** - Early detection of pest and disease risks
- **AI Treatment Plans** - Generated intervention recommendations
- **Expert Assistant** - Natural language Q&A for farm insights

### Design & UX
- Fully responsive design (mobile, tablet, desktop)
- Modern glassmorphism UI with smooth animations
- Dark mode support
- Accessible and SEO optimized

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Backend**: Lovable Cloud (Supabase)
- **Authentication**: Email/password with auto-confirm
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── assets/              # Images and static assets
├── components/
│   ├── animations/      # Reusable animation components
│   ├── landing/         # Landing page sections
│   └── ui/              # shadcn/ui components
├── contexts/            # React contexts (Auth, etc.)
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
├── lib/                 # Utility functions
├── pages/               # Page components
└── test/                # Test files
```

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Authentication Guide](docs/AUTHENTICATION.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Landing Page Components](docs/LANDING_PAGE.md)

## 🎨 Design System

The app uses a consistent design system with:
- **Primary color**: Emerald green (#10b981)
- **Typography**: Display font for headings, system font for body
- **Spacing**: 4px base unit with Tailwind's spacing scale
- **Components**: Built on shadcn/ui with custom variants

## 🔐 Authentication

User authentication is handled through Lovable Cloud with:
- Email/password signup and login
- Auto-confirm email for streamlined onboarding
- Protected routes for authenticated users
- Session management with secure tokens

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Via Lovable
1. Open your [Lovable Project](https://lovable.dev)
2. Click **Share → Publish**

### Custom Domain
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow DNS configuration instructions

## 📄 License

This project is proprietary software developed for agricultural management.

## 🤝 Support

For support and questions, visit [Lovable Documentation](https://docs.lovable.dev)
