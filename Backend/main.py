from fastapi import FastAPI, File, UploadFile, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
# from .services.gemini_service import GeminiService

app = FastAPI()

# Assuming GeminiService is initialized here
# gemini_service = GeminiService()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Sentinel-X Oracle Backend is running!"}

@app.post("/analyze")
async def analyze_image_endpoint(
    file: UploadFile = File(...), 
    x_api_key: Optional[str] = Header(None)
):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="X-API-Key header is missing")
    
    # TODO: Validate the x_api_key against the Google Gemini API or a secure vault
    # For now, we'll just check if it exists.
    
    # image_data = await file.read()
    # analysis_result = await gemini_service.analyze_image(image_data)
    
    # Placeholder response
    analysis_result = {"analysis_result": f"Analysis of {file.filename} successful."}

    return analysis_result
