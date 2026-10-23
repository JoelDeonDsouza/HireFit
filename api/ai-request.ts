import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIRequestBody {
  prompt?: string;
  model?: string;
}

const DEFAULT_MODEL = 'gemini-1.5-pro';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { prompt, model } = (req.body ?? {}) as AIRequestBody;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const modelName = model || DEFAULT_MODEL;
    const genAI = new GoogleGenerativeAI(apiKey);
    const aiModel = genAI.getGenerativeModel({ model: modelName });

    const result = await aiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    if (!result.response) {
      return res.status(400).json({ error: 'Content was blocked by safety filters' });
    }

    const responseText = result.response.text();
    if (!responseText) {
      return res.status(500).json({ error: 'Empty response from AI model' });
    }

    return res.json({
      text: responseText,
      model: modelName,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('AI API Error:', error);
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes('API key')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    if (message.includes('quota')) {
      return res.status(429).json({ error: 'API quota exceeded' });
    }

    return res.status(500).json({
      error: 'Failed to generate AI response',
      ...(process.env.NODE_ENV === 'development' && { details: message }),
    });
  }
}
