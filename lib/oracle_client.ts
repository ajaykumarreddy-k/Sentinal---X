import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const analyzeImage = async (imageData: Blob) => {
  const apiKey = localStorage.getItem('ORACLE_KEY');
  if (!apiKey) {
    throw new Error('API Key not found in localStorage');
  }

  const formData = new FormData();
  formData.append('file', imageData);

  try {
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-Key': apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};
