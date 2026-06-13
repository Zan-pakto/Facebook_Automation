# Facebook Bulk Posting Dashboard

A premium, modern SaaS-ready dashboard built using Next.js (App Router), TypeScript, Express.js, and MongoDB. It allows users to connect their Meta/Facebook profile, synchronize all managed pages, and publish text, images, or videos to multiple Facebook Pages simultaneously with a single click.

---

## Tech Stack

* **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide Icons, TanStack Query (React Query)
* **Backend**: Node.js, Express.js, Multer (file upload), Axios (Graph API requests)
* **Database**: MongoDB, Mongoose
* **Security**: AES-256-CBC token encryption, JWT session management, secure CORS headers

---

## Folder Structure

```
fb-bulk-poster/
├── backend/            # Express.js API server
│   ├── config/         # DB connection configs
│   ├── controllers/    # API endpoint controllers (Auth, Pages, Posts)
│   ├── middleware/     # JWT Auth and Multer uploads middleware
│   ├── models/         # Mongoose DB Schemas (User, FacebookPage, PostHistory)
│   ├── routes/         # API endpoint routes
│   └── services/       # Facebook Graph API and Cryptography helpers
└── frontend/           # Next.js App Router client
    ├── public/         # Static assets
    └── src/
        ├── app/        # Pages and layouts (Overview, Composer, Logs, Settings)
        ├── components/ # Custom components (Header, Sidebar, Mock Preview)
        ├── hooks/      # React state hooks
        ├── lib/        # Class merger utilities
        ├── services/   # Axios API backend client
        └── types/      # TypeScript interface definitions
```

---

## Quick Start Setup

### Step 1: Configure the Server (Backend)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up environment credentials in the `.env` file (copied from `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/fb_bulk_poster
   JWT_SECRET=your_jwt_secret
   CRYPTO_SECRET=your_cryptography_secret_key_at_least_32_chars
   
   # Get these from Meta for Developers (see below)
   FB_APP_ID=
   FB_APP_SECRET=
   FB_REDIRECT_URI=http://localhost:5000/api/auth/facebook/callback
   ```
3. Run the development API server:
   ```bash
   npm run dev
   ```

### Step 2: Configure the UI (Frontend)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the local server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## Meta Application Registration Setup

1. Go to the [Meta for Developers Portal](https://developers.facebook.com/) and register.
2. Click **Create App** and select **Other &gt; Business** as the application type.
3. Under **App Settings &gt; Basic**, retrieve your **App ID** and **App Secret** and update your `backend/.env` file.
4. Click **Add Product** and configure **Facebook Login for Business** (or Facebook Login) for **Web**.
5. Add `http://localhost:5000/api/auth/facebook/callback` in the **Valid OAuth Redirect URIs** list under your Login Product settings. Save changes.
6. Restart the backend API server.
