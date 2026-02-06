import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types

# --- SIMPLEST KEY LOADING ---
# We check the environment directly. No complicated pathing.
api_key = os.getenv("GOOGLE_API_KEY", "").strip()

if not api_key:
    # If the environment variable is empty, we check if it's literally hardcoded below
    # (Only use this as a last resort for your local testing!)
    api_key = "" # You can paste your key here temporarily if export fails

if not api_key:
    print("❌ ERROR: GOOGLE_API_KEY is not set.")
    print("👉 FIX: Run 'export GOOGLE_API_KEY=your_key' then run this script again.")
    exit(1)

print(f"✅ ORACLE ONLINE: Authenticated with key starting: {api_key[:8]}...")

# --- APP INITIALIZATION ---
client = genai.Client(api_key=api_key)
app = FastAPI(title="Sentinel-X Oracle")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        
        # Calling Gemini 2.0 Flash
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                "Analyze this logistics imagery for risk score (0-100), bottlenecks, and mitigation. Return JSON.",
                types.Part.from_bytes(data=image_bytes, mime_type=file.content_type)
            ],
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        return response.parsed

    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)