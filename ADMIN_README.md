# 🚀 SPACE JUNKIES UGANDA — Admin Panel Guide

## Quick Start

1. **Start the server:**
   ```bash
   npm start
   ```
   Server runs on http://localhost:3000

2. **Access Admin Panel:**
   Navigate to http://localhost:3000/admin.html

3. **Main Website:**
   Navigate to http://localhost:3000

---

## Gallery Upload Workflow

### How It Works:
1. Go to http://localhost:3000/admin.html
2. Click "GALLERY MANAGER" tab (default)
3. Click the upload area or drag images
4. Add an optional caption (e.g., "Milky Way from Lake Mburo - March 2026")
5. Click "UPLOAD TO GALLERY"
6. Images are saved to `/public/uploads/` folder
7. Data persists in `gallery-data.json`
8. **Main site automatically displays uploaded images** - they replace placeholders one at a time

### What Happens:
- ✅ Images upload to `/public/uploads/`
- ✅ Data saves to `gallery-data.json` (persists across restarts)
- ✅ Admin panel shows all uploaded images with delete buttons
- ✅ Main site fetches images via `/api/gallery` endpoint
- ✅ Placeholders are replaced with real images in order
- ✅ Remaining slots stay as placeholders

### Testing:
1. Upload 1-3 images via admin panel
2. Go to main site: http://localhost:3000
3. Click "GALLERY" in navbar
4. First placeholders should now show your uploaded images
5. Refresh page - images persist (loaded from gallery-data.json)

---

## Member Requests

### How It Works:
1. Users submit join requests (future feature - form not yet added to main site)
2. Admin sees pending requests in "MEMBER REQUESTS" tab
3. Each request shows: Name, Email, Phone, Game Score, Timestamp
4. Admin can APPROVE or REJECT
5. Data persists in `members-data.json`

### API Endpoint:
```javascript
POST /api/members/join
Body: { name, email, phone, gameScore }
```

---

## Events Manager

### How It Works:
1. Go to "EVENTS" tab in admin panel
2. Fill in event details:
   - Title (e.g., "Kololo Hill Stargazing Night")
   - Date
   - Time
   - Location (e.g., "Kololo Hill, Kampala")
   - Description
   - Type (Stargazing, Workshop, Expedition, Online)
3. Click "CREATE EVENT"
4. Data persists in `events-data.json`

### API Endpoint:
```javascript
GET /api/events
Returns: { events: [...] }
```

---

## Data Persistence

All data is stored in JSON files and persists across server restarts:

- **gallery-data.json** - Uploaded images
- **members-data.json** - Member join requests
- **events-data.json** - Created events

### File Structure:
```json
// gallery-data.json
[
  {
    "id": "1234567890-abc123",
    "url": "/uploads/1234567890-987654321.jpg",
    "caption": "Milky Way from Lake Mburo",
    "filename": "1234567890-987654321.jpg",
    "uploadedAt": "2026-03-02T10:30:00.000Z"
  }
]
```

---

## Troubleshooting

### Port Already in Use:
```bash
taskkill /F /IM node.exe
npm start
```

### Images Not Showing on Main Site:
1. Check `gallery-data.json` has data
2. Check `/public/uploads/` folder has images
3. Open browser console (F12) and check for errors
4. Verify `/api/gallery` returns data: http://localhost:3000/api/gallery

### Upload Fails:
1. Check file size (max 10MB per image)
2. Check file format (JPG, PNG, GIF)
3. Check server console for errors

---

## API Endpoints Summary

### Gallery:
- `POST /api/admin/gallery/upload` - Upload images (multipart/form-data)
- `GET /api/admin/gallery` - Get all images (admin)
- `GET /api/gallery` - Get all images (public, for main site)
- `DELETE /api/admin/gallery/:id` - Delete image

### Members:
- `POST /api/members/join` - Submit join request
- `GET /api/admin/members/requests` - Get pending requests
- `POST /api/admin/members/approve/:id` - Approve member
- `POST /api/admin/members/reject/:id` - Reject member

### Events:
- `POST /api/admin/events` - Create event
- `GET /api/events` - Get all events

---

## Security Notes

⚠️ **IMPORTANT**: This admin panel has NO authentication. In production:
1. Add login system (username/password)
2. Use JWT tokens or sessions
3. Add HTTPS
4. Validate file uploads (check MIME types, scan for malware)
5. Add rate limiting
6. Use environment variables for sensitive data

---

## Next Steps

1. ✅ Gallery upload with persistence - DONE
2. ✅ Images replace placeholders on main site - DONE
3. ⏳ Add member join form to main site
4. ⏳ Display events on main site events page
5. ⏳ Add authentication to admin panel
6. ⏳ Add image optimization (resize, compress)
7. ⏳ Add pagination for large galleries

---

**Built with ❤️ for Space Junkies Uganda**
**Founded by Ronnie Atuhaire • January 2025**
