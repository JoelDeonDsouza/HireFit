import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3.8-flash';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt, model } = (req.body ?? {}) as { prompt?: string; model?: string };
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const modelName = model || DEFAULT_MODEL;
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: { maxOutputTokens: 4096 },
    });

    const responseText = response.text;
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

    if (message.includes('API key')) return res.status(401).json({ error: 'Invalid API key' });
    if (
      message.includes('quota') ||
      message.includes('429') ||
      message.includes('RESOURCE_EXHAUSTED')
    ) {
      return res.status(429).json({ error: 'API quota exceeded' });
    }
    if (message.includes('404')) return res.status(502).json({ error: 'Model unavailable' });

    return res.status(500).json({ error: 'Failed to generate AI response' });
  }
}
