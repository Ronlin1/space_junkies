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
const multer = require('multer');
const fs = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// Persistent storage files
const GALLERY_FILE = path.join(__dirname, 'gallery-data.json');
const MEMBERS_FILE = path.join(__dirname, 'members-data.json');
const EVENTS_FILE = path.join(__dirname, 'events-data.json');

// Load data from files
function loadData(file, defaultData = []) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
  }
  return defaultData;
}

// Save data to files
function saveData(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error saving ${file}:`, err);
  }
}

// Initialize data
let galleryImages = loadData(GALLERY_FILE, []);
let memberRequests = loadData(MEMBERS_FILE, []);
let events = loadData(EVENTS_FILE, []);

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

// ══════════════════════════════════════════════════
// ADMIN API ENDPOINTS
// ══════════════════════════════════════════════════

// Gallery Upload
app.post('/api/admin/gallery/upload', upload.array('images', 10), (req, res) => {
  try {
    console.log('[Gallery Upload] Received request');
    console.log('[Gallery Upload] Files:', req.files ? req.files.length : 0);
    console.log('[Gallery Upload] Caption:', req.body.caption);
    
    if (!req.files || req.files.length === 0) {
      console.log('[Gallery Upload] No files received');
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const caption = req.body.caption || '';
    const uploadedImages = req.files.map(file => ({
      id: Date.now() + '-' + Math.random().toString(36).substring(2, 11),
      url: `/uploads/${file.filename}`,
      caption,
      filename: file.filename,
      uploadedAt: new Date().toISOString()
    }));
    
    galleryImages.push(...uploadedImages);
    saveData(GALLERY_FILE, galleryImages);
    
    console.log('[Gallery Upload] Success! Uploaded:', uploadedImages.length, 'images');
    console.log('[Gallery Upload] Total images now:', galleryImages.length);
    
    res.json({ success: true, images: uploadedImages });
  } catch (err) {
    console.error('[Gallery Upload Error]', err);
    res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
});

// Get Gallery Images (Admin)
app.get('/api/admin/gallery', (req, res) => {
  res.json({ images: galleryImages });
});

// Get Gallery Images (Public - for main site)
app.get('/api/gallery', (req, res) => {
  res.json({ images: galleryImages });
});

// Delete Gallery Image
app.delete('/api/admin/gallery/:id', (req, res) => {
  const { id } = req.params;
  const imageIndex = galleryImages.findIndex(img => img.id === id);
  
  if (imageIndex === -1) {
    return res.status(404).json({ error: 'Image not found' });
  }
  
  const image = galleryImages[imageIndex];
  const filePath = path.join(__dirname, 'public', image.url);
  
  // Delete file from filesystem
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  
  galleryImages.splice(imageIndex, 1);
  saveData(GALLERY_FILE, galleryImages);
  res.json({ success: true });
});

// Member Request Submission
app.post('/api/members/join', (req, res) => {
  const { name, email, phone, gameScore } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const request = {
    id: Date.now() + '-' + Math.random().toString(36).substring(2, 11),
    name,
    email,
    phone: phone || 'N/A',
    gameScore: gameScore || 0,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  memberRequests.push(request);
  saveData(MEMBERS_FILE, memberRequests);
  res.json({ success: true, message: 'Request submitted! We\'ll contact you soon.' });
});

// Get Member Requests
app.get('/api/admin/members/requests', (req, res) => {
  const pending = memberRequests.filter(req => req.status === 'pending');
  res.json({ requests: pending });
});

// Approve Member
app.post('/api/admin/members/approve/:id', (req, res) => {
  const request = memberRequests.find(r => r.id === req.params.id);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  request.status = 'approved';
  request.approvedAt = new Date().toISOString();
  
  saveData(MEMBERS_FILE, memberRequests);
  
  // Here you would typically:
  // - Send welcome email
  // - Add to WhatsApp group
  // - Update member count
  
  res.json({ success: true, message: 'Member approved' });
});

// Reject Member
app.post('/api/admin/members/reject/:id', (req, res) => {
  const request = memberRequests.find(r => r.id === req.params.id);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }
  
  request.status = 'rejected';
  request.rejectedAt = new Date().toISOString();
  
  saveData(MEMBERS_FILE, memberRequests);
  
  res.json({ success: true, message: 'Request rejected' });
});

// Create Event
app.post('/api/admin/events', (req, res) => {
  const { title, date, time, location, description, type } = req.body;
  
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' });
  }
  
  const event = {
    id: Date.now() + '-' + Math.random().toString(36).substring(2, 11),
    title,
    date,
    time: time || '00:00',
    location: location || 'TBA',
    description: description || '',
    type: type || 'stargazing',
    createdAt: new Date().toISOString()
  };
  
  events.push(event);
  saveData(EVENTS_FILE, events);
  res.json({ success: true, event });
});

// Get Events
app.get('/api/events', (req, res) => {
  res.json({ events });
});

// ══════════════════════════════════════════════════

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
