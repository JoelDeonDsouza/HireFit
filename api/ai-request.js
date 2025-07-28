import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { prompt, model } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    // Initialize Google AI //
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const aiModel = genAI.getGenerativeModel({ model: model || 'gemini-2.0-flash-001' });
    // Generate content //
    const result = await aiModel.generateContent(prompt);
    const responseText = result.response.text();
    res.json({ text: responseText });
  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
}
