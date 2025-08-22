# 🎸 INFLOW Band - Sanity CMS Setup Guide

This guide will help you set up **Sanity CMS** for the INFLOW band website, giving you a professional admin panel to manage all content.

## 📋 **What You'll Get:**

- ✅ **Professional Admin Panel** - Easy-to-use interface for non-technical users
- ✅ **Media Management** - Upload and manage photos, videos, audio files
- ✅ **Content Types**: Festivals, Band Members, Music Tracks
- ✅ **Rich Text Editing** - Write descriptions with formatting
- ✅ **Real-time Preview** - See changes instantly

---

## 🚀 **Step 1: Create Sanity Account**

1. Go to [sanity.io](https://sanity.io)
2. Click **"Get started for free"**
3. Sign up with Google, GitHub, or email
4. Choose **"Personal"** plan (free)

---

## 🛠 **Step 2: Create Project**

1. In Sanity dashboard, click **"Create new project"**
2. **Project name**: `INFLOW Band Website`
3. **Dataset**: `production`
4. **Schema**: Skip for now
5. Copy your **Project ID** (you'll need this)

---

## ⚙️ **Step 3: Configure Environment**

1. Copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your project details:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```

---

## 🎨 **Step 4: Access Admin Panel**

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Go to: http://localhost:3000/studio

3. Login with your Sanity account

4. You'll see the admin panel with three content types:
   - **🎪 Festivals** - Concert performances and festival appearances
   - **👥 Band Members** - Artist profiles and bios
   - **🎵 Tracks** - Songs and music releases

---

## 📝 **Step 5: Add Your First Content**

### **Add a Band Member:**

1. Click **"Band Member"** → **"Create new"**
2. Fill in:
   - **Name**: Alex Thunder
   - **Slug**: alex-thunder (auto-generated)
   - **Role**: Lead Vocalist & Rhythm Guitar
   - **Biography**: Write a compelling bio
   - **Photo**: Upload a high-quality photo
   - **Social Media**: Add Instagram, Twitter links
   - **Instruments**: Add vocals, guitar, etc.
   - **Joined Year**: 2018

3. Click **"Publish"**

### **Add a Festival Performance:**

1. Click **"Festival"** → **"Create new"**
2. Fill in:
   - **Festival Name**: Rock Fest 2024
   - **Slug**: rock-fest-2024
   - **Date**: Select date
   - **Location**: City, country, venue
   - **Description**: Write about the performance
   - **Photos**: Upload performance photos
   - **Setlist**: Add song names
   - **Status**: Completed/Upcoming

3. Click **"Publish"**

### **Add a Track:**

1. Click **"Track"** → **"Create new"**
2. Fill in:
   - **Title**: Thunder Road
   - **Track ID**: thunder-road
   - **Duration**: 4:32
   - **Cover Art**: Upload album artwork
   - **Audio URL**: Link to audio file
   - **Album**: Electric Nights
   - **Year**: 2024
   - **Genre**: Rock
   - **Description**: Song description

3. Click **"Publish"**

---

## 🌐 **Step 6: Deploy Studio (Optional)**

To share the admin panel with others:

1. Deploy the studio:

   ```bash
   npm run sanity:deploy
   ```

2. Choose a studio hostname (e.g., `inflow-band`)

3. Admin panel will be available at: `https://inflow-band.sanity.studio`

---

## 📸 **Media Management Tips**

- **Photos**: Upload high-res images (1920x1080+)
- **Videos**: Use YouTube/Vimeo URLs for best performance
- **Audio**: Use streaming service URLs or CDN links
- **File names**: Use descriptive names (band-photo-2024.jpg)

---

## 🔧 **Useful Commands**

```bash
# Start Next.js development server
npm run dev

# Access admin panel
# Go to: http://localhost:3000/studio

# Deploy studio to custom URL
npm run sanity:deploy

# Build production version
npm run build
```

---

## 🆘 **Need Help?**

1. **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
2. **Community**: [slack.sanity.io](https://slack.sanity.io)
3. **Support**: Email support@sanity.io

---

## 🎯 **What's Next?**

After adding content in Sanity, it will automatically appear on your website! The admin can:

- ✅ Add new festival performances
- ✅ Update band member information
- ✅ Upload new tracks and albums
- ✅ Manage photos and media
- ✅ Update bios and descriptions

**No coding required!** 🎉
