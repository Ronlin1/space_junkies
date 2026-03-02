# 🚀 Space Junkies Uganda - Quick Start Guide

## ✅ Server is Running!

Your server is now live at: **http://localhost:3000**

---

## 📍 Access Points

### Main Website
**URL**: http://localhost:3000

**Pages Available**:
- **HOME** - Hero, mission, events calendar, blog feed
- **GALLERY** - Photo gallery (with upload placeholders)
- **ARCADE** - Asteroid Hunter game
- **MOVIES** - Space movie collection
- **UG FACTS** - Uganda space facts
- **EVENTS** - Full events page with interactive calendar ✨ NEW!
- **CREW** - Member roster with astronaut avatars
- **SKYWATCH** - Sky observation tools

### Admin Panel
**URL**: http://localhost:3000/admin.html

**Features**:
1. **Gallery Manager** 📸
   - Upload images with captions
   - View all uploaded images
   - Delete images
   
2. **Member Requests** 👥
   - View pending membership applications
   - Approve/reject members
   - See game scores
   
3. **Event Manager** 📅
   - Create new events
   - Set dates, times, locations
   - Add descriptions

---

## 🎮 Key Features

### Events Page (NEW!)
- Interactive calendar with month navigation
- 5 detailed event cards
- Floating space objects animation
- Color-coded event types

### Blog Posts
- Click any blog post → Shows "Under Development" message
- Like buttons work independently

### Game
- Exit button in top-right corner
- HUD with metrics (health, kills, accuracy, etc.)
- Health system (30 points)
- Score 1,000+ to officially join!

### Members Page
- Astronaut emoji avatars (👨‍🚀👩‍🚀🧑‍🚀)
- About section with floating stars
- Join requirement: 1,000 game points

---

## 🔧 Admin Panel Usage

### Upload Gallery Images
1. Go to http://localhost:3000/admin.html
2. Click "GALLERY MANAGER" tab
3. Click the upload area
4. Select images (up to 10, max 10MB each)
5. Add caption (optional)
6. Click "UPLOAD TO GALLERY"

### Manage Member Requests
1. Click "MEMBER REQUESTS" tab
2. View all pending requests
3. Click "✓ APPROVE" or "✕ REJECT"
4. Auto-refreshes every 30 seconds

### Create Events
1. Click "EVENTS" tab
2. Fill in event details
3. Choose event type
4. Click "CREATE EVENT"

---

## 📁 File Structure

```
space_junkies/
├── server.js              # Main server with API endpoints
├── public/
│   ├── index.html         # Main website
│   ├── admin.html         # Admin panel
│   └── uploads/           # Uploaded images (auto-created)
├── package.json
├── .env                   # API keys
├── ADMIN_README.md        # Admin documentation
└── QUICK_START.md         # This file
```

---

## 🔐 Important Notes

### Current Setup (Development)
- ⚠️ In-memory storage (data resets on server restart)
- ⚠️ No authentication (anyone can access admin panel)
- ⚠️ No database (use for testing only)

### Before Production
1. Add authentication to admin panel
2. Set up database (MongoDB/PostgreSQL)
3. Add rate limiting
4. Enable HTTPS
5. Add proper file validation
6. Set up backup system

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Stop all node processes
Get-Process -Name node | Stop-Process -Force

# Restart server
npm start
```

### Images Not Uploading
- Check `/public/uploads/` folder exists
- Verify file size < 10MB
- Check file format (JPG, PNG, GIF)

### Events Page Empty
- Clear browser cache
- Hard refresh (Ctrl + Shift + R)
- Check browser console for errors

---

## 🚀 Next Steps

1. ✅ Test the Events page
2. ✅ Upload some gallery images via admin panel
3. ✅ Test member request flow
4. ✅ Create a few events
5. ✅ Play the game and test the exit button
6. ✅ Click blog posts to see "under development" message

---

## 📞 Support

For issues or questions:
- Check browser console (F12)
- Check server logs in terminal
- Review ADMIN_README.md for API details

---

**Built with ❤️ for Space Junkies Uganda**
**Founder: Ronnie Atuhaire**
