// ================================================
// SPACE JUNKIES UGANDA — Server
// ================================================
// Loads GEMINI_API_KEY from .env and proxies
// requests to Gemini so the key never hits the browser.
// ================================================

require('dotenv').config();
const express = require('express');
const path    = require('path');
const { GoogleGenAI } = require('@google/genai');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // serves index.html + assets

// ── Health check ──────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status : 'online',
    project: 'Space Junkies Uganda',
    gemini : process.env.GEMINI_API_KEY ? 'configured ✓' : 'NOT SET — add key to .env',
    time   : new Date().toISOString()
  });
});

// ── Gemini proxy ──────────────────────────────
// POST /api/chat
// Body: { message: "user message string" }
// Returns: { reply: "AI response string" }
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'message field is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.status(503).json({
      error: 'Gemini API key not configured. Edit .env and set GEMINI_API_KEY.'
    });
  }

  const SYSTEM_PROMPT = `You are Cosmos, the AI assistant for Space Junkies Uganda (SJU) — East Africa's premier space enthusiast community. Founded in January 2025 by Ronnie Atuhaire in Kampala, Uganda. The community has 135 members and is open to everyone for free. Key facts: Uganda sits on the equator at 0.3136°N 32.5811°E — one of the best places on Earth for astronomy. Uganda Space Week 2025 was a landmark event organised by SJU. The community runs stargazing nights at Kololo Hill, telescope workshops at Innovation Village Ntinda, dark sky expeditions to Lake Mburo and Bwindi, and online lectures. Keep responses concise (2-4 sentences), enthusiastic, and space-themed. Use relevant emojis. Always tie answers back to Uganda or the SJU community where relevant.`;

  try {
    // Initialize Google GenAI with API key
    const ai = new GoogleGenAI({ apiKey });

    // Generate content using the new SDK format
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: `${SYSTEM_PROMPT}\n\nUser: ${message.trim()}`,
    });

    const reply = response.text;

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from Gemini.' });
    }

    return res.json({ reply });

  } catch (err) {
    console.error('[Gemini Error]', err);
    
    // Handle specific error types
    if (err.message && (err.message.includes('API key') || err.message.includes('authentication') || err.message.includes('401') || err.message.includes('403'))) {
      return res.status(403).json({ error: 'Invalid Gemini API key. Check your .env file.' });
    }
    
    return res.status(500).json({ error: `Gemini error: ${err.message || 'Unknown error'}` });
  }
});

// ── Catch-all: serve index.html for SPA routing ─
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ─────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  🚀 SPACE JUNKIES UGANDA SERVER');
  console.log('  ─────────────────────────────────────');
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Health:  http://localhost:${PORT}/health`);
  console.log(`  Gemini:  ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '✓ API key loaded' : '✗ NOT SET — edit .env'}`);
  console.log('  ─────────────────────────────────────');
  console.log('');
});
