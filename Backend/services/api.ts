// services/api.ts
export const analyzeLogistics = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  // This points to your running FastAPI server
  const response = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error('Sentinel-X Oracle is unreachable.');
  
  return response.json(); 
  // Returns: { risk_score: number, analysis: string, plan: string }
};