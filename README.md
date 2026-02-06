<div align="center">

# 🛡️ SENTINEL-X ORACLE

### *AI-Powered Autonomous Supply Chain Intelligence Platform*

<img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>

<br/>
<br/>

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=3000&pause=1000&color=00F0FF&center=true&vCenter=true&width=600&lines=Real-time+Supply+Chain+Intelligence;Powered+by+Google+Gemini+AI;Autonomous+Risk+Mitigation;Military-Grade+Analytics" alt="Typing SVG" />

<br/>

**🏆 Built for Hackathon Excellence**

[Features](#-features) •
[Demo](#-demo) •
[Installation](#-installation) •
[Architecture](#-architecture) •
[API Reference](#-api-reference) •
[Contributing](#-contributing)

---

</div>

## 🎯 Problem Statement

Global supply chains face **$4.2 trillion in annual disruptions** from:
- 🌊 Weather events & natural disasters
- ⚓ Port congestion & shipping delays  
- 🌍 Geopolitical conflicts & trade restrictions
- 📦 Container shortages & logistics failures

**Sentinel-X Oracle** solves this with **AI-first intelligence** that predicts, prevents, and mitigates supply chain risks in real-time.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🧠 AI Oracle Intelligence
- **Real-time threat detection** using Gemini AI
- **Risk scoring** (0-100) for all global events
- **Predictive analytics** for emerging disruptions
- **Automated alert generation** with reasoning

</td>
<td width="50%">

### 🗺️ Global Risk Mapping
- **4+ active monitoring nodes** worldwide
- **Critical alert visualization**
- **Hotspot identification** across shipping lanes
- **Interactive threat tracking**

</td>
</tr>
<tr>
<td width="50%">

### 🔬 Vision Lab
- **Multimodal image analysis** with Gemini Vision
- **Container inspection** & damage detection
- **Document scanning** (manifests, BOL)
- **Drag-and-drop** satellite image processing

</td>
<td width="50%">

### ⚡ Action Hub (AI-Powered)
- **Draft Mitigation** - Auto-generate protocols
- **Reroute GPS** - AI-optimized shipping routes
- **Executive Summary** - C-suite briefing reports
- **One-click** copy & download

</td>
</tr>
</table>

---

## 🎬 Demo

<div align="center">

### BYOK (Bring Your Own Key) Flow
*Secure API key management with real-time validation*

```
┌─────────────────────────────────────────────────────────────┐
│                  SENTINEL-X ORACLE ACCESS                    │
│                                                              │
│     🔐 Bring Your Own Google Gemini API Key                 │
│                                                              │
│     ┌──────────────────────────────────────────────┐        │
│     │ AIza••••••••••••••••••••                     │        │
│     └──────────────────────────────────────────────┘        │
│                                                              │
│              [ 🚀 Authorize ]    [ Clear Key ]               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard Overview
```
┌────────────────────────────────────────────────────────────────────┐
│  ● SENTINEL-X              🟢 GEMINI-3 PRO: ONLINE  [Change Key]   │
├───────────────────────────────────┬────────────────────────────────┤
│                                   │       ORACLE FEED              │
│        VISION LAB                 │   ┌──────────────────────┐     │
│   ┌─────────────────────┐        │   │ 🔴 RISK: 88          │     │
│   │                     │         │   │ Rotterdam Terminal   │     │
│   │  📤 Drop Manifest   │         │   └──────────────────────┘     │
│   │  / Satellite Data   │         │   ┌──────────────────────┐     │
│   │                     │         │   │ 🟡 RISK: 52          │     │
│   └─────────────────────┘         │   │ Panama Locks         │     │
│                                   │   └──────────────────────┘     │
├───────────────────────────────────┴────────────────────────────────┤
│                      GLOBAL RISK MAP                               │
│          ●                    🔴                    ●              │
│    NODES: 4 ACTIVE                         CRITICAL ALERT          │
├────────────────────────────────────────────────────────────────────┤
│  ⚡ ACTION HUB                         POWERED BY GEMINI AI        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │
│  │ 📧 DRAFT     │ │ 🧭 REROUTE   │ │ 📄 EXECUTIVE │                │
│  │ MITIGATION   │ │ GPS          │ │ SUMMARY      │                │
│  └──────────────┘ └──────────────┘ └──────────────┘                │
└────────────────────────────────────────────────────────────────────┘
```

</div>

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/apikey))

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/sentinel-x.git
cd sentinel-x

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Setup (Optional)

```bash
# Create .env.local for backend features
echo "GEMINI_API_KEY=your_api_key_here" > .env.local
```

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Frontend
        A[React + TypeScript] --> B[Vite Build]
        B --> C[TailwindCSS + Framer Motion]
    end
    
    subgraph AI Layer
        D[Google Gemini API] --> E[geminiService.ts]
        E --> F[Intelligence Generation]
        E --> G[Image Analysis]
        E --> H[Report Generation]
    end
    
    subgraph Components
        I[KeyGate] --> J[BYOK Auth]
        K[OracleFeed] --> L[Live Intelligence]
        M[VisionLab] --> N[Image Processing]
        O[ActionHub] --> P[AI Actions]
        Q[GlobalMap] --> R[Risk Visualization]
    end
    
    Frontend --> AI Layer
    AI Layer --> Components
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + TypeScript | UI Framework |
| **Styling** | TailwindCSS + Framer Motion | Cyberpunk Aesthetics |
| **Build** | Vite 6 | Fast Development |
| **AI** | Google Gemini 2.0 Flash | Intelligence Engine |
| **Testing** | Vitest + React Testing Library | Quality Assurance |
| **Backend** | FastAPI (Python) | Image Processing API |

---

## 📁 Project Structure

```
sentinel-x/
├── 📂 components/
│   ├── ActionHub.tsx      # AI-powered actions with modals
│   ├── GlobalMap.tsx      # Risk visualization map
│   ├── KeyGate.tsx        # BYOK authentication
│   ├── OracleFeed.tsx     # Live intelligence stream
│   ├── ThoughtTicker.tsx  # System logs display
│   ├── VisionLab.tsx      # Image analysis interface
│   ├── PixelBlast.tsx     # Interactive background
│   └── SpotlightCard.tsx  # Hover effect cards
├── 📂 services/
│   └── geminiService.ts   # All Gemini API integrations
├── 📂 tests/
│   ├── geminiService.test.ts
│   ├── KeyGate.test.tsx
│   └── utils.test.ts
├── 📂 Backend/
│   └── main.py            # FastAPI server
├── App.tsx                # Main application
├── index.css              # Theme & animations
└── types.ts               # TypeScript interfaces
```

---

## 🔌 API Reference

### Gemini Service Functions

```typescript
// Fetch real-time intelligence alerts
const alerts = await fetchLiveIntelligence();

// Analyze uploaded images
const analysis = await analyzeUploadedImage(base64Data);

// Generate mitigation protocols
const protocols = await generateMitigationProtocols();

// Optimize shipping routes
const routes = await generateRouteOptimization();

// Generate executive summary
const summary = await generateExecutiveSummary();
```

### Response Types

```typescript
interface IntelItem {
  id: string;
  timestamp: string;
  title: string;
  riskScore: number;      // 0-100
  reasoning: string;
  type: 'logistics' | 'geopolitical' | 'weather';
}

interface ActionResult {
  success: boolean;
  title: string;
  content: string;        // AI-generated report
  timestamp: string;
}
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test -- --coverage
```

### Test Coverage

| File | Tests | Status |
|------|-------|--------|
| geminiService.ts | 8 | ✅ Pass |
| KeyGate.tsx | 7 | ✅ Pass |
| utils.ts | 8 | ✅ Pass |
| **Total** | **23** | **✅ All Pass** |

---

## 🎨 Design Philosophy

<div align="center">

### *"Cyberpunk Intelligence Meets Enterprise Reliability"*

</div>

- **🌙 Dark Theme** - Easy on the eyes for extended monitoring
- **💎 Glassmorphism** - Modern depth with backdrop blur
- **⚡ Neon Accents** - Cyan, Yellow, Red for alert levels
- **🎬 Smooth Animations** - GSAP + Framer Motion
- **📱 Responsive** - Works on all devices

---

## 🔒 Security

- **BYOK Model** - Your API key never leaves your browser
- **LocalStorage** - Keys stored client-side only
- **TLS 1.3** - All API calls encrypted
- **No Backend Storage** - Zero data retention

---

## 🤝 Contributing

```bash
# Fork the repo
# Create feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m 'Add amazing feature'

# Push to branch
git push origin feature/amazing-feature

# Open Pull Request
```

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

<div align="center">

### Built with ❤️ for the Hackathon

<img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react" />
<img src="https://img.shields.io/badge/Powered%20by-Gemini%20AI-8E75B2?style=flat-square&logo=google" />
<img src="https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css" />

**⭐ Star this repo if you found it helpful!**

</div>
# Sentinal---X
