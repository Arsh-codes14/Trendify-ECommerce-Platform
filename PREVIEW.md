# MERN-Ecommerce Preview Guide (Local)

## Ports
- Backend API: **http://localhost:4000** (Express)
- Frontend store: **http://localhost:5173** (Vite)
- Admin dashboard: **http://localhost:5174** (Vite)

## 1) Install dependencies
Run from each folder:

```bat
cd backend
npm install

cd ..\frontend
npm install

cd ..\admin
npm install
```

## 2) Configure environment variables (required)
Backend requires a valid `backend/.env`.

Create/edit `backend/.env` with at least:

```env
MONGODB_URI="mongodb://..."  # must start with mongodb:// or mongodb+srv://
JWT_SECRET="..."
ADMIN_EMAIL="support@yourbrand.com"
ADMIN_PASSWORD="YourBrand@123"

# Cloudinary (only needed for image uploads)
CLOUDINARY_API_KEY="..."
CLOUDINARY_SECRET_KEY="..."
CLOUDINARY_CLOUD_NAME="..."
```

Also ensure you have:
- `frontend/.env` and/or `admin/.env` with:
```env
VITE_BACKEND_URL="http://localhost:4000"
```

## 3) Start services
### Backend
```bat
cd backend
npm run server
```

### Frontend
```bat
cd ..\frontend
npm run dev
```

### Admin
```bat
cd ..\admin
npm run dev
```

## Notes
- If MongoDB URI is missing/invalid, backend crashes with:
  - `MongoParseError: Invalid scheme... expected "mongodb://" or "mongodb+srv://"`
- After backend is healthy, refresh the frontend/admin pages.

