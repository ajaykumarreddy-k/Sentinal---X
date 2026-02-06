import { IntelItem } from "../types";

// Helper to generate dynamic mock data so the feed feels alive even offline/rate-limited
const generateMockIntel = (): IntelItem[] => {
  const titles = [
    'Suez Canal Congestion', 'Typhoon Phanfone', 'Port of LA Labor Strike',
    'Panama Locks Maintenance', 'Rotterdam Automated Terminal', 'Strait of Malacca Piracy Alert',
    'North Sea Wind Farm Logistics', 'Shenzhen Port Drone Activity'
  ];
  const types: ('logistics' | 'geopolitical' | 'weather')[] = ['logistics', 'geopolitical', 'weather'];

  return Array.from({ length: 2 }).map(() => ({
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' UTC',
    title: titles[Math.floor(Math.random() * titles.length)],
    riskScore: Math.floor(Math.random() * 40) + 50, // 50-90
    reasoning: 'AI simulations indicate potential variance in flow rate. Mitigation protocols recommended.',
    type: types[Math.floor(Math.random() * types.length)],
  }));
};

export const getGeminiApiKey = (): string | null => {
  return localStorage.getItem('ORACLE_KEY');
};

const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = 'gemini-2.0-flash';

// Generic function to call Gemini API
const callGeminiAPI = async (prompt: string): Promise<string> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("API Key not found. Please add your Gemini API key.");
  }

  const response = await fetch(
    `${GEMINI_API_BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("API quota exceeded. Please try again later.");
    }
    if (response.status === 400 || response.status === 401 || response.status === 403) {
      throw new Error("Invalid API key. Please check your key in settings.");
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
};

export const fetchLiveIntelligence = async (): Promise<IntelItem[]> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.warn("API Key not found. Switching to Simulation Mode.");
    return generateMockIntel();
  }

  try {
    const prompt = `
      You are an advanced supply chain oracle. Generate 2 high-priority intelligence alerts.
      Format strictly as a JSON array of objects with keys: id, timestamp (UTC), title, riskScore (0-100), reasoning (concise, max 15 words), type ('logistics', 'geopolitical', 'weather').
      Focus on critical global shipping choke points.
      Do not wrap in markdown.
    `;

    const response = await fetch(
      `${GEMINI_API_BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("Gemini Quota Exceeded. Switching to Simulation Mode.");
        return generateMockIntel();
      }
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Cleanup: Remove markdown code blocks if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Fallback: Try to find array brackets
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    if (startIndex !== -1 && endIndex !== -1) {
      text = text.substring(startIndex, endIndex + 1);
    }

    if (!text) return generateMockIntel();

    const parsedData = JSON.parse(text);
    return Array.isArray(parsedData) ? parsedData : generateMockIntel();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return generateMockIntel();
  }
};

export const analyzeUploadedImage = async (base64Data: string): Promise<string> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.warn("API Key not found. Using cached analysis.");
    return "SIMULATION: CONTAINER_ID_8832 DETECTED. SEALS INTACT. RISK: LOW.";
  }

  try {
    const prompt = "Analyze this supply chain image. Identify objects, container numbers, or potential risks. Provide a telegraphic, military-style report.";

    const response = await fetch(
      `${GEMINI_API_BASE_URL}/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ inlineData: { mimeType: 'image/jpeg', data: base64Data.split(',')[1] } }] },
            { parts: [{ text: prompt }] }
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("Gemini Quota Exceeded. Using cached analysis.");
        return "SIMULATION: CONTAINER_ID_8832 DETECTED. SEALS INTACT. RISK: LOW.";
      }
      throw new Error(`Gemini Vision API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis failed.";
  } catch (error: any) {
    console.error("Gemini Vision Error:", error);
    return "Error analyzing image. Please check API key.";
  }
};

// ============= ACTION HUB FUNCTIONS =============

export interface ActionResult {
  success: boolean;
  title: string;
  content: string;
  timestamp: string;
}

/**
 * Generate mitigation protocols for supply chain risks
 */
export const generateMitigationProtocols = async (): Promise<ActionResult> => {
  const timestamp = new Date().toISOString();

  try {
    const prompt = `You are a supply chain risk mitigation expert. Generate a comprehensive mitigation protocol document.

Include the following sections:
1. EXECUTIVE OVERVIEW - Brief summary of current global supply chain risk landscape
2. PRIORITY THREATS - List top 3 critical threats with risk scores (1-100)
3. MITIGATION PROTOCOLS - For each threat, provide specific actionable mitigation steps
4. CONTINGENCY PLANS - Backup procedures if primary mitigations fail
5. RESOURCE ALLOCATION - Recommended personnel and budget priorities
6. TIMELINE - Implementation schedule with milestones

Format the response in a professional military/intelligence briefing style.
Use clear headers and bullet points. Be specific and actionable.`;

    const content = await callGeminiAPI(prompt);

    return {
      success: true,
      title: "MITIGATION PROTOCOLS",
      content,
      timestamp,
    };
  } catch (error: any) {
    return {
      success: false,
      title: "MITIGATION PROTOCOLS",
      content: `Error: ${error.message}`,
      timestamp,
    };
  }
};

/**
 * Generate optimized shipping route recommendations
 */
export const generateRouteOptimization = async (): Promise<ActionResult> => {
  const timestamp = new Date().toISOString();

  try {
    const prompt = `You are a global logistics and GPS routing optimization expert. Generate a comprehensive route optimization report.

Current scenario: Analyze major shipping lanes and recommend optimized pathways.

Include the following sections:
1. CURRENT ROUTE ANALYSIS - Overview of primary shipping lanes (Suez, Panama, Malacca, Cape of Good Hope)
2. RISK ASSESSMENT - Current disruptions, weather patterns, geopolitical factors affecting each route
3. OPTIMIZED PATHWAYS - Recommended alternative routes with:
   - Estimated time savings
   - Cost impact
   - Risk reduction percentage
4. REAL-TIME ADJUSTMENTS - Dynamic rerouting recommendations based on current conditions
5. FUEL OPTIMIZATION - Fuel-efficient routing suggestions
6. RECOMMENDED ACTIONS - Specific GPS waypoint adjustments for active vessels

Format as a professional navigation/logistics briefing.
Include specific coordinates where relevant. Use nautical terminology.`;

    const content = await callGeminiAPI(prompt);

    return {
      success: true,
      title: "ROUTE OPTIMIZATION",
      content,
      timestamp,
    };
  } catch (error: any) {
    return {
      success: false,
      title: "ROUTE OPTIMIZATION",
      content: `Error: ${error.message}`,
      timestamp,
    };
  }
};

/**
 * Generate executive summary report
 */
export const generateExecutiveSummary = async (): Promise<ActionResult> => {
  const timestamp = new Date().toISOString();
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  try {
    const prompt = `You are a senior supply chain intelligence analyst preparing a C-suite executive briefing.

Generate a comprehensive EXECUTIVE SUMMARY REPORT for: ${formattedDate}

Include the following sections:
1. SITUATION OVERVIEW
   - Global supply chain health score (0-100)
   - Key metrics and KPIs
   - 24-hour trend analysis

2. CRITICAL ALERTS
   - Top 5 actionable intelligence items
   - Each with severity rating (CRITICAL/HIGH/MEDIUM/LOW)
   - Immediate recommended actions

3. FINANCIAL IMPACT ANALYSIS
   - Estimated cost implications of current disruptions
   - Revenue at risk
   - Insurance considerations

4. OPERATIONAL STATUS
   - Fleet status summary
   - Port operation metrics
   - Inventory flow rates

5. STRATEGIC RECOMMENDATIONS
   - Short-term actions (24-48 hours)
   - Medium-term adjustments (1-2 weeks)
   - Long-term strategy considerations

6. APPENDIX
   - Key contacts
   - Escalation procedures
   - Reference data

Format this as a professional PDF-ready executive report.
Use clear formatting, headers, and executive-friendly language.
Include specific numbers and percentages where relevant.`;

    const content = await callGeminiAPI(prompt);

    return {
      success: true,
      title: "EXECUTIVE SUMMARY",
      content,
      timestamp,
    };
  } catch (error: any) {
    return {
      success: false,
      title: "EXECUTIVE SUMMARY",
      content: `Error: ${error.message}`,
      timestamp,
    };
  }
};