# UPSIFS Deployment Guide

This guide will help you deploy the UPSIFS University Management System to production using **Vercel** (frontend) and **Render** (backend).

## 📋 Prerequisites

- GitHub account with the UPSIFS repository
- Vercel account ([vercel.com](https://vercel.com))
- Render account ([render.com](https://render.com))
- Git installed locally

## 🚀 Deployment Overview

- **Frontend (React + Vite)**: Deployed to Vercel
- **Backend (Node.js + Express)**: Deployed to Render
- **Database**: SQLite (persistent storage on Render)

## Step 1: Deploy Backend to Render

### 1.1 Push your code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Create a new Web Service on Render

1. Go to [render.com](https://render.com) and log in
2. Click **New** → **Web Service**
3. Connect your GitHub account and select the UPSIFS repository
4. Configure the service:

   - **Name**: `upsifs-backend`
   - **Region**: Oregon (or nearest to your users)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

5. **Environment Variables** (click "Advanced" to add these):

   | Key | Value | Description |
   |-----|-------|-------------|
   | `PORT` | `5000` | Server port |
   | `NODE_ENV` | `production` | Environment |
   | `DB_PATH` | `/opt/render/project/data/upsifs.db` | Database path |
   | `JWT_SECRET` | Generate a secure random string (min 32 chars) | JWT signing key |
   | `CORS_ORIGIN` | Your Vercel frontend URL (e.g., `https://upsifs.vercel.app`) | CORS allowed origin |

6. **Disk Storage** (Important for SQLite persistence):

   - Click **Advanced** → **Add Disk**
   - **Name**: `data`
   - **Mount Path**: `/opt/render/project/data`
   - **Size**: `1 GB`

7. Click **Create Web Service**

### 1.3 Initialize the Database

After the backend is deployed and running:

1. Go to your Render service dashboard
2. Click **Logs** to see if the database was initialized
3. If sample data is needed, you can trigger it manually:
   - Go to **Shell** tab in your Render service
   - Run: `cd backend && npm run init-db`

4. Save your backend URL (e.g., `https://upsifs-backend.onrender.com`)

## Step 2: Deploy Frontend to Vercel

### 2.1 Create a new project on Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New** → **Project**
3. Import the UPSIFS repository from GitHub
4. Configure the project:

   - **Framework Preset**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:

   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL with `/api` suffix
   - Example: `https://upsifs-backend.onrender.com/api`

6. Click **Deploy**

### 2.2 Configure Custom Domain (Optional)

1. Go to your Vercel project **Settings** → **Domains**
2. Add your custom domain (e.g., `upsifs.yourdomain.com`)
3. Follow Vercel's DNS configuration instructions

## Step 3: Update CORS on Backend

After deploying the frontend, update the CORS_ORIGIN environment variable on Render:

1. Go to your Render service dashboard
2. Click **Environment**
3. Update `CORS_ORIGIN` to your actual Vercel URL
4. The service will automatically restart

## Step 4: Verify the Deployment

### 4.1 Check Backend Health

Visit your backend health endpoint:
```
https://upsifs-backend.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "UPSIFS API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

### 4.2 Test Frontend

1. Visit your Vercel URL
2. Try logging in with sample credentials:
   - **Email**: `aryan.sharma@upsifs.ac.in`
   - **Password**: `password123`
   - **Role**: Student

3. Navigate through different sections to ensure everything works

## 🔧 Troubleshooting

### Backend Issues

**Database not persisting?**
- Ensure you've added a disk in Render with mount path `/opt/render/project/data`
- Check that `DB_PATH` environment variable is set correctly

**CORS errors?**
- Verify `CORS_ORIGIN` matches your exact Vercel URL (no trailing slashes)
- Check browser console for specific error messages

**Server not starting?**
- Check Render logs for errors
- Ensure all dependencies are installed correctly
- Verify `PORT` environment variable is set to `5000`

### Frontend Issues

**API calls failing?**
- Verify `VITE_API_URL` is set correctly in Vercel environment variables
- Check that backend URL includes `/api` suffix
- Test backend health endpoint directly in browser

**SPA routing not working?**
- Ensure `vercel.json` is in the root directory
- Check that the `rewrites` rule is present
- Clear browser cache and try again

**Build failing?**
- Check Vercel build logs
- Ensure all frontend dependencies are in `frontend/package.json`
- Verify TypeScript compilation is successful

## 📊 Monitoring & Logs

### Render (Backend)
- Go to your service dashboard → **Logs** tab
- Real-time logs are available
- Historical logs can be viewed for up to 7 days (free tier)

### Vercel (Frontend)
- Go to your project → **Deployments** tab
- Click on a deployment to view build logs
- Runtime logs can be viewed in the **Logs** tab

## 🔄 Updating the Application

### Backend Updates
1. Push changes to GitHub
2. Render automatically detects and redeploys
3. Monitor logs to ensure smooth deployment

### Frontend Updates
1. Push changes to GitHub
2. Vercel automatically triggers a new deployment
3. Preview deployments are created for PRs

## 📝 Sample Data for Testing

After deployment, the database will be initialized with sample data:

**Users:**
- Student: `aryan.sharma@upsifs.ac.in` / `password123`
- Student: `priya.das@upsifs.ac.in` / `password123`
- Teacher: `sarah.smith@upsifs.ac.in` / `password123`
- Teacher: `rajesh.kumar@upsifs.ac.in` / `password123`
- Admin: `admin@upsifs.ac.in` / `password123`

**Data included:**
- 4 Subjects (CS301, CS302, CS303, CS304)
- 4 Notices
- 3 Assignments
- 3 Grievances

## 🔒 Security Best Practices

1. **JWT Secret**: Always use a strong, randomly generated JWT_SECRET
2. **Environment Variables**: Never commit `.env` files
3. **HTTPS**: Both Vercel and Render provide HTTPS automatically
4. **Database**: SQLite file is isolated on Render's persistent disk
5. **CORS**: Restrict to your specific frontend domain in production

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/build.html)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## 💡 Customization

You can customize the deployment by:

1. **Using a different database** (PostgreSQL, MongoDB) for production
2. **Adding CDN** for static assets
3. **Setting up CI/CD** with GitHub Actions
4. **Configuring custom domains** for both services
5. **Adding monitoring** with tools like Sentry or DataDog

---

**Need Help?** Check the logs on both platforms and ensure all environment variables are correctly configured.
