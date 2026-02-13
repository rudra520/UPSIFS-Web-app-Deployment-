# Quick Deployment Guide

Fast-track deployment guide for UPSIFS to Vercel (frontend) and Render (backend).

## ⚡ 15-Minute Deployment

### Step 1: Backend (5 minutes)

1. **Go to [render.com](https://render.com)** and sign up/login
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - Name: `upsifs-backend`
   - Runtime: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. **Environment Variables**:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `DB_PATH` = `/opt/render/project/data/upsifs.db`
   - `JWT_SECRET` = Click "Generate" (or use: `openssl rand -base64 32`)
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app` (update after frontend deployment)
6. **Disk Storage** (Critical!):
   - Click **Advanced** → **Add Disk**
   - Name: `data`
   - Mount Path: `/opt/render/project/data`
   - Size: `1 GB`
7. Click **Create Web Service**
8. Wait ~2-3 minutes for deployment
9. Copy your backend URL (e.g., `https://upsifs-backend.onrender.com`)

---

### Step 2: Frontend (5 minutes)

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. Click **Add New** → **Project**
3. Import your UPSIFS repository
4. Configure:
   - Framework: Vite (auto-detected)
   - Root Directory: `./frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Environment Variables**:
   - `VITE_API_URL` = Your Render backend URL with `/api`
   - Example: `https://upsifs-backend.onrender.com/api`
6. Click **Deploy**
7. Wait ~1-2 minutes for build and deployment
8. Copy your frontend URL (e.g., `https://upsifs.vercel.app`)

---

### Step 3: Update CORS (2 minutes)

1. Go back to your Render service dashboard
2. Click **Environment**
3. Edit `CORS_ORIGIN`:
   - Replace with your actual Vercel URL
   - Example: `https://upsifs.vercel.app`
4. Click **Save Changes**
5. Backend will restart automatically (takes ~30 seconds)

---

### Step 4: Test (3 minutes)

1. Visit your Vercel frontend URL
2. Test login:
   - Email: `aryan.sharma@upsifs.ac.in`
   - Password: `password123`
   - Role: Student
3. Navigate through different sections
4. Check browser console for errors
5. Verify API calls are working

---

## ✅ Done!

Your UPSIFS application is now live!

- **Frontend**: Your Vercel URL
- **Backend**: Your Render URL
- **API Health**: `https://your-backend.onrender.com/api/health`

---

## 🔧 Troubleshooting

### Issue: Backend not starting
- Check Render logs for errors
- Verify environment variables are set
- Ensure disk storage is configured

### Issue: Frontend can't connect to backend
- Verify `VITE_API_URL` is correct (includes `/api`)
- Check CORS_ORIGIN on Render matches your Vercel URL
- Test backend health endpoint directly

### Issue: Database errors
- Ensure disk storage is configured
- Check `DB_PATH` is set to `/opt/render/project/data/upsifs.db`
- Restart Render service

### Issue: API calls failing
- Clear browser cache
- Check browser console for specific errors
- Verify both services are running

---

## 📚 Detailed Documentation

Need more details? Check these guides:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide with troubleshooting
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API documentation
- **[backend/README.md](./backend/README.md)** - Backend-specific documentation

---

## 💡 Tips

1. **Save URLs**: Save your backend and frontend URLs in a secure place
2. **Monitor Logs**: Check logs regularly for the first few days
3. **Test Features**: Test all major features after deployment
4. **Set Alerts**: Configure alerts on both platforms (optional)
5. **Update CORS**: Always update CORS_ORIGIN when changing domains

---

## 🔒 Security Reminders

- ✅ JWT_SECRET was generated randomly (don't change it)
- ✅ CORS_ORIGIN is set to your specific domain
- ✅ HTTPS is enabled automatically on both platforms
- ✅ Database is isolated on persistent disk

---

## 🎉 Success!

If everything is working, congratulations! You've successfully deployed UPSIFS to production.

**Next Steps**:
- Share your URLs with stakeholders
- Set up monitoring (optional)
- Plan regular backups
- Monitor for any issues

---

**Need Help?** Check the detailed documentation files for comprehensive troubleshooting and configuration options.
