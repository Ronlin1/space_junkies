<div align="center">

# 🚀 Space Junkies Uganda

### *We're Already Gone.*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-spacejunkies--production.up.railway.app-FF4500?style=for-the-badge)](https://spacejunkies-production.up.railway.app/)
[![Node.js](https://img.shields.io/badge/Node.js-24.13.1-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-3.1_Pro-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**East Africa's premier space enthusiast community platform** — Built for stargazers, astronomers, and dreamers in Uganda 🇺🇬

[🎮 Play Game](#-features) • [📸 Gallery](#-features) • [🤖 AI Chat](#-features) • [📅 Events](#-features) • [🛠️ Admin Panel](#-admin-panel)

</div>

---

## 🌌 About

**Space Junkies Uganda (SJU)** is a community of 135+ space enthusiasts—students, engineers, amateur astronomers, and cosmic dreamers—united by the belief that space belongs to everyone, including us.

Founded in January 2025 by **Ronnie Atuhaire** after organizing Uganda's first **Uganda Space Week** (October 2025) at Makerere University. Born from a NASA Space Apps Challenge judging experience and a deep love for the cosmos.

> *"Uganda may not have launched a rocket yet, but we've launched something just as important: interest."* 🚀

**Why Uganda?**
- 📍 Located on the equator (0.3136°N, 32.5811°E) — perfect for astronomical observations
- 🛰️ Home to **PearlAfricaSat-1**, Uganda's first satellite (launched 2022)
- 🔭 Growing community of passionate space enthusiasts
- 🌍 Proving that African space exploration starts with curiosity, not budgets

---

## ✨ Features

### 🎮 **Asteroid Hunter Game**
Defend Kampala from asteroids! Browser-based arcade game with:
- Health system (30 HP)
- Real-time HUD (score, kills, accuracy, FPS)
- Keyboard & mobile controls
- High score tracking

### 🖼️ **Dynamic Gallery**
- Upload photos from space events
- Smooth lightbox slider with keyboard navigation
- Auto-replaces placeholders
- Persistent storage

### 🤖 **Cosmos AI Chatbot**
- Powered by Google Gemini 3.1 Pro
- Uganda-specific space knowledge
- Knows about PearlAfricaSat-1!
- Secure server-side API proxy

### 📅 **Interactive Events Calendar**
- Track stargazing nights at Kololo Hill
- Telescope workshops at Innovation Village
- Dark sky expeditions to Lake Mburo
- Month navigation with event highlights

### 🎬 **Space Movie Library**
Curated collection of space documentaries and films

### 👥 **Crew Roster**
Meet community members with astronaut avatars

### 🌌 **Skywatch**
Real-time ISS tracking and celestial object visibility

---

## 🛠️ Admin Panel

Access at `/admin.html` for:

### 📸 Gallery Manager
- Upload multiple images
- Add captions
- Delete images
- Auto-sync with main site

### 👥 Member Requests
- Review applications
- Approve/reject members
- View game scores (1,000 points required!)

### 📅 Event Creator
- Schedule events
- Set date, time, location
- Categorize (Stargazing, Workshop, Expedition, Online)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### 1️⃣ Clone & Install
```bash
git clone <your-repo-url>
cd space_junkies
npm install
```

### 2️⃣ Configure Environment
Create `.env` file:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 3️⃣ Start Server
```bash
npm start
```

Server runs at **http://localhost:3000**

### 4️⃣ Development Mode (auto-restart)
```bash
npm run dev
```

---

## 📁 Project Structure

```
space_junkies/
├── 📄 server.js              # Express server + Gemini AI proxy
├── 📁 public/
│   ├── 🌐 index.html         # Single-page app (all pages)
│   ├── 🔧 admin.html         # Admin panel
│   ├── 🖼️ favicon.jpg        # Site icon
│   └── 📁 uploads/           # User-uploaded images
├── 💾 gallery-data.json      # Gallery storage
├── 💾 members-data.json      # Member requests
├── 💾 events-data.json       # Events storage
├── 🔐 .env                   # API keys (not in git)
├── 📦 package.json           # Dependencies
└── 📚 docs/                  # Documentation
    ├── ADMIN_README.md
    └── QUICK_START.md
```

---

## 🎨 Tech Stack

| Category | Technology |
|----------|-----------|
| **Backend** | Node.js 24.13.1 + Express 4.21.2 |
| **AI** | Google Gemini 3.1 Pro Preview |
| **File Uploads** | Multer 1.4.5-lts.2 |
| **Storage** | JSON files (no database) |
| **Frontend** | Vanilla JavaScript (ES6+) |
| **Styling** | Pure CSS3 (Grid, Flexbox, Animations) |
| **Game** | HTML5 Canvas API |
| **Fonts** | Orbitron, Share Tech Mono, Rajdhani |

---

## 🔒 Security

- ✅ API keys stored in `.env` (never exposed to browser)
- ✅ Server-side Gemini proxy
- ✅ `.gitignore` protects sensitive files
- ✅ File upload validation (10MB limit)
- ✅ Persistent storage with JSON files

---

## 📡 API Endpoints

### Chat with Cosmos AI
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What can I see in Kampala tonight?"
}

Response:
{
  "reply": "🌌 From Kampala tonight, you can observe..."
}
```

### Gallery Management
```http
POST /api/admin/gallery/upload    # Upload images
GET  /api/gallery                  # Get all images
DELETE /api/admin/gallery/:id      # Delete image
```

### Member Requests
```http
POST /api/members/join                    # Submit request
GET  /api/admin/members/requests          # Get pending
POST /api/admin/members/approve/:id       # Approve
POST /api/admin/members/reject/:id        # Reject
```

### Events
```http
POST /api/admin/events    # Create event
GET  /api/events          # Get all events
```

---

## 🌐 Deployment

### Railway (Current)
✅ **Live at:** https://spacejunkies-production.up.railway.app/

1. Connect GitHub repo
2. Set `GEMINI_API_KEY` in environment variables
3. Deploy automatically on push

### Other Platforms

**Render.com:**
```bash
# Set environment variable in dashboard
GEMINI_API_KEY=your_key_here
```

**Vercel/Netlify:**
Use serverless functions + environment variables

---

## 🎯 Roadmap

- [ ] Authentication for admin panel
- [ ] Database migration (MongoDB/PostgreSQL)
- [ ] Image optimization (resize, compress)
- [ ] Member join form on main site
- [ ] Full blog post system
- [ ] WhatsApp group integration
- [ ] Email notifications
- [ ] Space Junkies Uganda merch store

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation.

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **IEEE Uganda** - Core members and partners
- **Makerere University** - Hosting Uganda Space Week 2025
- **NASA Space Apps Challenge** - Inspiring the journey
- **World Space Week** - Supporting the mission
- **All 135+ Space Junkies** - You are the real stars 🌠

---

## 📞 Connect

- 🌐 **Website:** [spacejunkies-production.up.railway.app](https://spacejunkies-production.up.railway.app/)
- 💼 **LinkedIn:** [Ronnie Atuhaire](https://www.linkedin.com/in/ronnie-atuhaire/)
- 📧 **Email:** [Contact via website]
- 🎮 **Play the Game:** [Asteroid Hunter](https://spacejunkies-production.up.railway.app/)

---

<div align="center">

### 🚀 Built with ❤️ for Space Junkies Uganda

**Founded by Ronnie Atuhaire • January 2025**

*"The next frontier of discovery starts right here in Uganda."* 🇺🇬

[![Star this repo](https://img.shields.io/github/stars/yourusername/space_junkies?style=social)](https://github.com/yourusername/space_junkies)

</div>
