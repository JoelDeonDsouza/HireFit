import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { prompt, model } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const aiModel = genAI.getGenerativeModel({
      model: model || 'gemini-2.0-flash-exp',
    });
    const result = await aiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });
    if (!result.response) {
      return res.status(400).json({
        error: 'Content was blocked by safety filters',
      });
    }
    const responseText = result.response.text();
    if (!responseText) {
      return res.status(500).json({
        error: 'Empty response from AI model',
      });
    }
    res.json({
      text: responseText,
      model: model || 'gemini-2.0-flash-exp',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI API Error:', error);

    if (error.message?.includes('API key')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    if (error.message?.includes('quota')) {
      return res.status(429).json({ error: 'API quota exceeded' });
    }
    res.status(500).json({
      error: 'Failed to generate AI response',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
      }),
    });
  }
}
