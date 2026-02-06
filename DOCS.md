# 📚 Sentinel-X Oracle - Complete Documentation

> **Version:** 1.0.0  
> **Last Updated:** February 2026  
> **Status:** Production Ready ✅

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Getting Started](#-getting-started)
3. [Feature Walkthrough](#-feature-walkthrough)
4. [API Integration](#-api-integration)
5. [Error Handling](#-error-handling)
6. [Troubleshooting](#-troubleshooting)
7. [Component Reference](#-component-reference)
8. [Testing Guide](#-testing-guide)
9. [Deployment](#-deployment)

---

## 🎯 Overview

Sentinel-X Oracle is an **AI-first supply chain intelligence platform** that leverages Google Gemini's multimodal capabilities to provide real-time threat detection, risk analysis, and automated mitigation recommendations.

### Key Capabilities

| Feature | Description | AI Model |
|---------|-------------|----------|
| Live Intelligence | Real-time supply chain alerts | Gemini 2.0 Flash |
| Vision Analysis | Image & document processing | Gemini Vision |
| Route Optimization | Smart shipping pathways | Gemini 2.0 Flash |
| Risk Mitigation | Auto-generated protocols | Gemini 2.0 Flash |
| Executive Reports | C-suite briefings | Gemini 2.0 Flash |

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
- Node.js 18+
- npm 9+ or yarn
- Modern browser (Chrome, Firefox, Edge)

# Optional (for backend)
- Python 3.10+
- FastAPI
```

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/yourusername/sentinel-x.git

# 2. Navigate to project
cd sentinel-x

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### First-Time Setup

1. **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. **Create Project**: Click "Create API Key"
3. **Copy Key**: Key starts with `AIza...`
4. **Enter in App**: Paste in Sentinel-X KeyGate modal

---

## 🔍 Feature Walkthrough

### 1. KeyGate - BYOK Authentication

The KeyGate component handles secure API key management using the **Bring Your Own Key** (BYOK) model.

#### Flow
```
┌─────────────────────────────────────────────────────────────┐
│                      KEYGATE FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   User Opens App                                            │
│         │                                                   │
│         ▼                                                   │
│   ┌─────────────┐                                          │
│   │ Check       │──── Key Exists ────► Dashboard           │
│   │ localStorage│                                          │
│   └─────────────┘                                          │
│         │                                                   │
│         │ No Key                                            │
│         ▼                                                   │
│   ┌─────────────┐                                          │
│   │ Show        │                                          │
│   │ KeyGate     │                                          │
│   │ Modal       │                                          │
│   └─────────────┘                                          │
│         │                                                   │
│   User Enters Key                                           │
│         │                                                   │
│         ▼                                                   │
│   ┌─────────────┐     ┌─────────────┐                      │
│   │ Validate    │────►│ API Call    │                      │
│   │ Format      │     │ to Gemini   │                      │
│   │ (AIza...)   │     └─────────────┘                      │
│   └─────────────┘            │                             │
│                              │                              │
│              ┌───────────────┼───────────────┐             │
│              ▼               ▼               ▼             │
│         ┌────────┐     ┌────────┐     ┌────────┐          │
│         │ 200 OK │     │ 401    │     │ 429    │          │
│         │ Valid  │     │ Invalid│     │ Quota  │          │
│         └────────┘     └────────┘     └────────┘          │
│              │               │               │             │
│              ▼               ▼               │             │
│         Dashboard       Show Error      Still Valid       │
│                                              │             │
│                                              ▼             │
│                                          Dashboard         │
└─────────────────────────────────────────────────────────────┘
```

#### Key Features
- **Format Validation**: Keys must start with `AIza`
- **API Validation**: Real-time verification with Gemini
- **Session Management**: Change Key & Logout buttons
- **Instructions**: Built-in guide with Google AI Studio link

---

### 2. Oracle Feed - Live Intelligence

Real-time supply chain intelligence powered by Gemini AI.

#### How It Works
```typescript
// Every refresh, Gemini generates fresh intelligence
const alerts = await fetchLiveIntelligence();

// Returns array of IntelItem objects
[
  {
    id: "abc123",
    timestamp: "14:30 UTC",
    title: "Suez Canal Congestion",
    riskScore: 85,
    reasoning: "Heavy vessel traffic detected. 12-hour delays expected.",
    type: "logistics"
  }
]
```

#### Risk Score Colors
| Score | Color | Meaning |
|-------|-------|---------|
| 0-39 | 🟢 Green | Low Risk |
| 40-69 | 🟡 Yellow | Moderate Risk |
| 70-100 | 🔴 Red | High/Critical Risk |

---

### 3. Vision Lab - Image Analysis

Multimodal analysis using Gemini Vision.

#### Supported Formats
- **Images**: JPG, PNG, TIFF
- **Documents**: Manifests, Bills of Lading
- **Satellite**: Aerial supply chain imagery

#### Usage
1. Drag & drop image into Vision Lab
2. Wait for Gemini analysis (2-5 seconds)
3. View military-style intelligence report

#### Example Output
```
CONTAINER_ID_8832 DETECTED
SEALS: INTACT
DAMAGE: NONE VISIBLE
CARGO TYPE: ELECTRONICS
ORIGIN: SHENZHEN PORT
RISK ASSESSMENT: LOW
RECOMMENDATION: CLEAR FOR TRANSIT
```

---

### 4. Action Hub - AI Functions

Three AI-powered buttons for automated report generation.

#### Draft Mitigation
Generates comprehensive risk mitigation protocols.

**Output Includes:**
- Executive Overview
- Priority Threats (Top 3)
- Specific Mitigation Steps
- Contingency Plans
- Resource Allocation
- Implementation Timeline

#### Reroute GPS
AI-optimized shipping route recommendations.

**Output Includes:**
- Current Route Analysis
- Risk Assessment per Lane
- Alternative Pathways
- Time & Cost Savings
- GPS Waypoints
- Fuel Optimization

#### Executive Summary
C-suite ready briefing document.

**Output Includes:**
- Global Health Score
- Critical Alerts (Top 5)
- Financial Impact Analysis
- Operational Status
- Strategic Recommendations
- Escalation Procedures

---

### 5. Global Risk Map

Visual representation of worldwide supply chain risks.

#### Features
- **4 Active Nodes**: Monitoring major shipping hubs
- **Critical Alerts**: Pulsing red indicators
- **Interactive**: Hover for details

---

### 6. System Logs (Thought Ticker)

Real-time terminal-style system status updates.

```
> DETECTING ANOMALY: VESSEL_QUEUE_DENSITY > 85% ...
> OPTIMIZING REROUTE PATHWAYS [ARCTIC_ROUTE_B] ...
> SYSTEM OPTIMAL. WAITING FOR INPUT ...
> INITIALIZING GEMINI-3 PRO ORACLE ...
```

---

## 🔌 API Integration

### Base Configuration

```typescript
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = 'gemini-2.0-flash';
```

### Available Functions

```typescript
// services/geminiService.ts

// Get API key from localStorage
export const getGeminiApiKey = (): string | null

// Fetch live intelligence alerts
export const fetchLiveIntelligence = async (): Promise<IntelItem[]>

// Analyze uploaded images
export const analyzeUploadedImage = async (base64Data: string): Promise<string>

// Generate mitigation protocols
export const generateMitigationProtocols = async (): Promise<ActionResult>

// Optimize shipping routes
export const generateRouteOptimization = async (): Promise<ActionResult>

// Generate executive summary
export const generateExecutiveSummary = async (): Promise<ActionResult>
```

### Response Interfaces

```typescript
interface IntelItem {
  id: string;
  timestamp: string;
  title: string;
  riskScore: number;        // 0-100
  reasoning: string;        // Max 15 words
  type: 'logistics' | 'geopolitical' | 'weather';
}

interface ActionResult {
  success: boolean;
  title: string;
  content: string;          // Full AI-generated report
  timestamp: string;        // ISO timestamp
}
```

---

## ⚠️ Error Handling

### Error Types & Solutions

#### 1. Invalid API Key Format
```
Error: "Invalid key format. Key must start with 'AIza'."
```
**Solution**: Ensure your key starts with `AIza` (case-sensitive)

---

#### 2. Invalid/Expired API Key
```
Error: "Invalid API key. Please check your key and try again."
```
**Causes**:
- Key was deleted from Google Cloud
- Key is restricted to different APIs
- Billing not enabled on project

**Solution**: 
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Create new API key
3. Ensure "Gemini API" is enabled

---

#### 3. Quota Exceeded (429)
```
Error: "API quota exceeded. Please try again later."
```
**Causes**:
- Free tier limit reached (60 requests/minute)
- Daily quota exhausted

**Solution**:
- Wait 60 seconds and retry
- Upgrade to paid tier for higher limits
- App automatically falls back to simulation mode

---

#### 4. Network Error
```
Error: "Network error. Please check your connection."
```
**Causes**:
- No internet connection
- Firewall blocking Google APIs
- CORS issues (in development)

**Solution**:
1. Check internet connection
2. Verify `generativelanguage.googleapis.com` is accessible
3. Try different network

---

#### 5. Empty Response
```
Error: "No response generated."
```
**Causes**:
- Gemini safety filters triggered
- Malformed request

**Solution**: Try again or modify input content

---

### Error Handling Best Practices

```typescript
try {
  const result = await generateExecutiveSummary();
  if (result.success) {
    // Handle success
  } else {
    // Handle known error
    console.error(result.content);
  }
} catch (error) {
  // Handle unexpected error
  console.error("Unexpected error:", error);
}
```

---

## 🔧 Troubleshooting

### Common Issues

#### App Shows KeyGate Even After Entering Key
**Cause**: Key validation failed silently
**Fix**: 
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Check if `ORACLE_KEY` exists
4. Try clearing and re-entering

#### Dashboard Not Loading New Intelligence
**Cause**: API rate limiting or network issues
**Fix**:
1. Check Network tab for failed requests
2. Verify API key is still valid
3. Wait 60 seconds if rate limited

#### Image Analysis Not Working
**Cause**: Image format or size issues
**Fix**:
1. Use JPG/PNG formats only
2. Keep images under 20MB
3. Ensure image is base64 encoded correctly

#### Action Hub Buttons Show Error
**Cause**: Invalid or expired API key
**Fix**:
1. Click "Change Key" in header
2. Enter fresh API key
3. Verify key at [Google AI Studio](https://aistudio.google.com/apikey)

---

## 🧩 Component Reference

| Component | File | Purpose |
|-----------|------|---------|
| `KeyGate` | `components/KeyGate.tsx` | API key authentication modal |
| `OracleFeed` | `components/OracleFeed.tsx` | Live intelligence display |
| `VisionLab` | `components/VisionLab.tsx` | Image upload & analysis |
| `ActionHub` | `components/ActionHub.tsx` | AI action buttons + modal |
| `GlobalMap` | `components/GlobalMap.tsx` | Risk visualization map |
| `ThoughtTicker` | `components/ThoughtTicker.tsx` | System logs terminal |
| `SpotlightCard` | `components/SpotlightCard.tsx` | Hover effect container |
| `PixelBlast` | `components/PixelBlast.tsx` | Interactive background |

---

## 🧪 Testing Guide

### Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-runs on changes)
npm run test:watch

# With coverage
npm test -- --coverage
```

### Test Structure

```
tests/
├── geminiService.test.ts   # API service tests
├── KeyGate.test.tsx        # BYOK component tests
└── utils.test.ts           # Utility function tests
```

### Test Coverage

| Area | Tests | Coverage |
|------|-------|----------|
| API Service | 8 | ~90% |
| KeyGate UI | 7 | ~85% |
| Utilities | 8 | ~95% |

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory with optimized assets

### Deployment Options

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review error messages in browser console
3. Search existing GitHub issues
4. Open new issue with reproduction steps

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Google Gemini AI**

</div>
