# Space Junkies Uganda: Building East Africa's First Space Community Platform

> "Uganda may not have launched a rocket yet, but we've launched something just as important: interest." 🚀

## The Community

**Space Junkies Uganda (SJU)** was born out of deep love—for space, for Uganda, and for the belief that the cosmos belongs to everyone, including us.

I'm Ronnie Atuhaire, and I've been procrastinating on building our web presence since we started. But this challenge? This was the push I needed.

**The Origin Story:**

Last year, I was approached to serve as a judge for the NASA Space Apps Challenge in Kampala. During that event, I witnessed something powerful: students weren't just interested in space—they were *passionate* about it. Their eyes lit up when talking about black holes, Mars missions, and Uganda's own satellite, PearlAfricaSat-1 (launched in 2022!).

Around the same time, I became the temporary National Coordinator for World Space Week in Uganda. If you're into space, you know October is *the* month. So we went all in.

**Uganda Space Week 2025 (October 8-10)** was our first national celebration of space and astronomy, held at Makerere University. Over three days:
- 🎯 **55+ attendees** (students, engineers, dreamers)
- 🌐 **2 virtual sessions + 1 physical meetup**
- 🎬 **Space movie marathon** (Interstellar, Gravity, Passengers)
- 🔭 **First telescope session** (I pointed it the wrong way at first, but hey, we still made contact with the stars 😂)
- 🚀 **DIY rocket demos**
- 🎲 **Space Bingo Networking**
- 🧠 **Topics**: Quantum Cosmology, Area 51, Cryogenics, Black Holes, Living in Space

During our stargazing session at Kololo Hill, I realized: this wasn't just an event. It was a connection between imagination and science, between curiosity and community.

**Why Uganda?**

We sit on the equator (0.3136°N, 32.5811°E)—one of the best places on Earth for astronomical observations. We have PearlAfricaSat-1 orbiting above us. We have passionate students, amateur astronomers, and engineers who dream big.

What we didn't have was a digital home. A place to coordinate stargazing nights, share telescope observations, organize dark sky expeditions to Lake Mburo, and prove that African space enthusiasts are already here, already building.

**Space Junkies Uganda** is now 135+ members strong—and this platform is our mission control.

*Fun fact: A NASA astronaut's suit costs $12 million (UGX 46 billion). I promise our Space Junkies Uganda T-shirts will be way cheaper. 😅*

## What I Built

A full-stack community platform featuring:

**For Members:**
- 🎮 **Asteroid Hunter Game** - Defend Kampala from asteroids! Browser-based arcade game with health system, HUD metrics, and high scores. (Because if we're going to space, we need to practice defending Earth first.)
- 🖼️ **Dynamic Gallery** - Upload and view photos from Uganda Space Week 2025 and community events with a smooth lightbox slider
- 📅 **Interactive Events Calendar** - Track stargazing nights, telescope workshops, and dark sky expeditions
- 🤖 **Cosmos AI Chatbot** - Gemini-powered assistant with Uganda-specific space knowledge (knows about PearlAfricaSat-1!)
- 🎬 **Space Movie Library** - Curated collection of space documentaries and films
- 👥 **Crew Roster** - Meet the community members with astronaut avatars
- 🌌 **Skywatch** - Real-time ISS tracking and celestial object visibility

**For Admins:**
- 📸 **Gallery Manager** - Upload images that automatically replace placeholders on the main site
- 👥 **Member Request System** - Review and approve new members (1,000 game points required—gotta earn your spot!)
- 📅 **Event Creator** - Schedule and manage community events
- 💾 **Persistent Storage** - All data saved to JSON files, survives server restarts

**Design Philosophy:**
Cyberpunk-meets-cosmos aesthetic with neon orange (#FF4500), cyan (#00FFD1), and deep space blacks. Terminal-style fonts (Orbitron, Share Tech Mono), scanline overlays, aurora effects, and floating particles create an immersive "space command center" vibe. Think Blade Runner meets the ISS.

## Demo

🚀 **Live Features:**
- Navigate between pages with smooth transitions
- Play the Asteroid Hunter game (← → to move, SPACE to fire)
- Click gallery images to open the lightbox slider
- Chat with Cosmos AI about Uganda's space potential
- Browse the interactive events calendar
- Upload images via admin panel at `/admin.html`

**Key Interactions:**
1. Gallery uploads replace placeholders one-by-one in real-time
2. Blog posts show "Under Development" popup (auto-fades after 5s)
3. Game HUD displays health, score, kills, accuracy, FPS
4. Lightbox supports keyboard navigation (← → arrows, Esc to close)
5. Events calendar highlights event days with orange glow

## Code

**Architecture:**

```
space_junkies/
├── server.js              # Express server + Gemini AI proxy
├── public/
│   ├── index.html         # Single-page app (all pages in one file)
│   ├── admin.html         # Admin panel
│   ├── favicon.jpg        # Site icon
│   └── uploads/           # User-uploaded gallery images
├── gallery-data.json      # Persistent gallery storage
├── members-data.json      # Member requests storage
├── events-data.json       # Events storage
├── .env                   # GEMINI_API_KEY
└── package.json           # Dependencies
```

**Tech Stack:**
- **Backend:** Node.js + Express
- **AI:** Google Gemini 3.1 Pro Preview via `@google/genai` SDK
- **File Uploads:** Multer (10MB limit, auto-creates `/uploads/`)
- **Storage:** JSON files (no database needed for MVP)
- **Frontend:** Vanilla JavaScript (no frameworks!)
- **Styling:** Pure CSS with custom animations

**Key Features Implementation:**

1. **Gallery System:**
```javascript
// Server: Upload endpoint
app.post('/api/admin/gallery/upload', upload.array('images', 10), (req, res) => {
  const uploadedImages = req.files.map(file => ({
    id: Date.now() + '-' + Math.random().toString(36).substring(2, 11),
    url: `/uploads/${file.filename}`,
    caption: req.body.caption || '',
    uploadedAt: new Date().toISOString()
  }));
  galleryImages.push(...uploadedImages);
  saveData(GALLERY_FILE, galleryImages);
  res.json({ success: true, images: uploadedImages });
});

// Client: Load and display
async function loadGalleryImages(){
  const res = await fetch('/api/gallery');
  const data = await res.json();
  data.images.forEach((img, index) => {
    placeholders[index].innerHTML = `
      <img src="${img.url}" alt="${img.caption}">
      <div class="gal-overlay">
        <div class="gal-label">${img.caption}</div>
      </div>
    `;
    placeholders[index].onclick = () => openLightbox(index);
  });
}
```

2. **Lightbox Slider:**
```javascript
function openLightbox(index){
  currentLightboxIndex = index;
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function changeLightboxImage(direction){
  currentLightboxIndex += direction;
  if(currentLightboxIndex < 0) currentLightboxIndex = galleryImagesData.length - 1;
  if(currentLightboxIndex >= galleryImagesData.length) currentLightboxIndex = 0;
  updateLightboxImage();
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  if(!document.getElementById('lightbox').classList.contains('active')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowLeft') changeLightboxImage(-1);
  if(e.key === 'ArrowRight') changeLightboxImage(1);
});
```

3. **Gemini AI Integration:**
```javascript
const { GoogleGenAI } = require('@google/genai');

app.post('/api/chat', async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `${SYSTEM_PROMPT}\n\nUser: ${req.body.message}`
  });
  res.json({ reply: response.text });
});
```

4. **Asteroid Game:**
- Canvas-based rendering with `requestAnimationFrame`
- Collision detection using distance formula
- Health system (30 HP, -1 per asteroid that passes)
- Random collision mechanic (10% chance when near player)
- HUD with real-time metrics (health bar, score, accuracy, FPS)

## How I Built It

**The Journey:**

I started ideating with **Claude Code Opus**, exploring the concept of a space community platform for Uganda. The vision was clear: create something that felt like a NASA mission control center but accessible to everyone.

Moved to **Manus** to prototype the UI/UX, experimenting with the cyberpunk aesthetic—neon colors, terminal fonts, scanline effects. The design language emerged: "What if Blade Runner met the ISS?"

Finally settled with **Kiro** and **Copilot CLI** for the heavy lifting. Kiro's autonomous coding capabilities were perfect for scaffolding the entire single-page app structure, implementing the game logic, and building the admin panel. Copilot CLI accelerated the API integrations and helped debug the trickier parts (like fixing the duplicate `id="events"` issue that broke navigation).

**Development Highlights:**

1. **Single-Page Architecture** - All pages in one HTML file, JavaScript handles routing. Keeps deployment simple and load times instant.

2. **No Database** - JSON files for persistence. For a community of 135 members, this is perfect. Simple, version-controllable, no setup required.

3. **Gemini Integration** - Switched from fetch-based API to the official `@google/genai` SDK. Much cleaner error handling and automatic retries.

4. **Gallery Upload Flow** - The trickiest part was ensuring uploads persist AND display on the main site. Solution: Server saves to JSON + filesystem, client fetches on page load and replaces placeholders sequentially.

5. **Lightbox Slider** - Built from scratch with CSS animations and keyboard support. No libraries needed. Smooth zoom-in effect using `cubic-bezier(.34,1.56,.64,1)` for that satisfying bounce.

6. **Game Development** - Canvas API for rendering, collision detection math, health system, HUD overlay. The exit button was crucial—players needed an escape hatch without losing progress.

7. **Events Page Fix** - Duplicate IDs (`id="events"` on both home section and events page) broke navigation. Changed home section to `id="home-events"`, added missing CSS for calendar and event cards.

8. **Favicon** - Simple but important. Added `<link rel="icon" type="image/jpeg" href="/favicon.jpg">` to complete the professional look.

**Challenges Overcome:**

- **Port conflicts** - Multiple node processes blocking port 3000. Solution: `taskkill /F /IM node.exe` before starting.
- **Catch-all route placement** - Had `app.get('*', ...)` BEFORE API endpoints, intercepting all requests. Moved to end of file.
- **Multer directory creation** - Ensured `uploads/` folder auto-creates with `fs.mkdirSync(uploadDir, { recursive: true })`.
- **Lightbox image loading** - Stored gallery data globally so lightbox can access all images, not just visible ones.

**Technologies:**
- Node.js 24.13.1
- Express 4.21.2
- @google/genai 1.43.0
- Multer 1.4.5-lts.2
- Vanilla JavaScript (ES6+)
- CSS3 (Grid, Flexbox, Animations)
- HTML5 Canvas (for game)

**Deployment Ready:**
- Environment variables via `.env`
- Persistent storage with JSON files
- Static file serving via Express
- Admin panel at `/admin.html`
- Health check endpoint at `/health`

**What's Next:**
- Authentication for admin panel
- Database migration (MongoDB/PostgreSQL)
- Image optimization (resize, compress)
- Member join form on main site
- Full blog post system (currently shows "Under Development" popup)
- WhatsApp group integration
- Email notifications for approved members
- Space Junkies Uganda merch store (those T-shirts I promised!)

---

**The Real Mission:**

This platform isn't just about code. It's about proving that space exploration starts with curiosity, not budgets. It's about showing that a kid in Kampala can look up at the same stars as a kid in Cape Canaveral and dream just as big.

During Uganda Space Week, I operated a telescope for the first time. I pointed it the wrong way initially, but when we finally locked onto Jupiter, seeing those Galilean moons with my own eyes—that moment changed everything. That's what this platform is for: creating those moments for others.

We may not have $12 million spacesuits, but we have something better: a community that believes the next frontier of discovery starts right here in Uganda. 🇺🇬

**Built with ❤️ for Space Junkies Uganda**
**Founded by Ronnie Atuhaire • January 2025**
**We're already gone. 🚀**

---

*Special thanks to all IEEE core members, our amazing partners, and every space enthusiast who made Uganda Space Week possible. You are the real stars. 🌠*
