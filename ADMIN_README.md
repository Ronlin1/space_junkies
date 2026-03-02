# 🚀 Space Junkies Uganda - Admin Panel

## Access the Admin Panel

Navigate to: **http://localhost:3000/admin.html**

## Features

### 1. 📸 Gallery Manager
- Upload multiple images at once
- Add captions to images
- View all uploaded images
- Delete images
- Images are stored in `/public/uploads/`

### 2. 👥 Member Requests
- View all pending membership requests
- See applicant details (name, email, phone, game score)
- Approve or reject members
- Requests refresh automatically every 30 seconds

### 3. 📅 Event Manager
- Create new events
- Set date, time, location
- Add descriptions
- Choose event type (Stargazing, Workshop, Expedition, Online)

## API Endpoints

### Gallery
- `POST /api/admin/gallery/upload` - Upload images
- `GET /api/admin/gallery` - Get all images
- `DELETE /api/admin/gallery/:id` - Delete image

### Members
- `POST /api/members/join` - Submit membership request (public)
- `GET /api/admin/members/requests` - Get pending requests
- `POST /api/admin/members/approve/:id` - Approve member
- `POST /api/admin/members/reject/:id` - Reject member

### Events
- `POST /api/admin/events` - Create event
- `GET /api/events` - Get all events (public)

## Notes

- Currently using in-memory storage (data resets on server restart)
- For production, replace with a database (MongoDB, PostgreSQL, etc.)
- Add authentication/authorization before deploying
- Images are limited to 10MB each
- Maximum 10 images per upload

## Security Recommendations

Before deploying to production:
1. Add authentication (JWT, sessions, etc.)
2. Add admin user management
3. Use a proper database
4. Add rate limiting
5. Validate and sanitize all inputs
6. Add HTTPS
7. Set up proper file upload validation
