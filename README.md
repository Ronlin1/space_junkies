# 🚀 Space Junkies Uganda — Website Server

A Node.js/Express server that serves the SJU website and securely
proxies Gemini AI requests so your API key **never touches the browser**.

---

## 📁 Project Structure

```
sju-server/
├── .env              ← YOUR API KEY GOES HERE (never share this)
├── .gitignore        ← keeps .env out of Git
├── server.js         ← Express server + Gemini proxy
├── package.json      ← dependencies
├── README.md
└── public/
    └── index.html    ← the full SJU website
```

---

## ⚡ Quick Start

### 1. Add your Gemini API key

Open `.env` and replace the placeholder:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

↓ becomes ↓

```
GEMINI_API_KEY=AIzaSyABC123yourRealKeyHere
```

Get a free key at: https://aistudio.google.com/apikey

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Start the server

```bash
npm start
```

You'll see:

```
  🚀 SPACE JUNKIES UGANDA SERVER
  ─────────────────────────────────────
  Local:   http://localhost:3000
  Health:  http://localhost:3000/health
  Gemini:  ✓ API key loaded
  ─────────────────────────────────────
```

---

### 4. Open in browser

Go to **http://localhost:3000** — the full site loads with Gemini AI active.

---

## 🔒 How the security works

```
Browser  ──POST /api/chat──▶  server.js  ──▶  Gemini API
  ↑                               ↑
  Sees nothing                Reads key
  about the key               from .env
```

Your `.env` file stays on your machine. The browser only ever talks to your local server at `/api/chat`.

---

## 🛠 Dev mode (auto-restart on file changes)

```bash
npm run dev
```

Requires Node.js 18+.

---

## 🌐 Deploying online (optional)

### Render.com (free)
1. Push this folder to a GitHub repo (**make sure `.gitignore` is working**)
2. Create a new Web Service on render.com
3. Set `GEMINI_API_KEY` in the Environment Variables section
4. Deploy — done

### Netlify / Vercel
Use their serverless functions feature and set the env var in the dashboard.

---

## 📡 API Endpoint

```
POST /api/chat
Content-Type: application/json

{ "message": "What can I see in Kampala tonight?" }

→ { "reply": "🌌 From Kampala tonight..." }
```

---

Built with ❤️ by Space Junkies Uganda // Ronnie Atuhaire
