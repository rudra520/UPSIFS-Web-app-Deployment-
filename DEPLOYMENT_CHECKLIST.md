# UPSIFS Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

## Pre-Deployment

### Backend Preparation
- [ ] Review and update `backend/.env.example` with correct defaults
- [ ] Generate a strong `JWT_SECRET` (min 32 characters)
- [ ] Test database initialization locally: `npm run init-db`
- [ ] Verify all API endpoints are working correctly
- [ ] Test authentication flow (login, token refresh, logout)
- [ ] Ensure CORS is configured correctly

### Frontend Preparation
- [ ] Review `frontend/.env.example` for API URL
- [ ] Test all pages and routes in development mode
- [ ] Verify API calls are working with the backend
- [ ] Check responsive design on different screen sizes
- [ ] Ensure all environment variables are documented

### Code Quality
- [ ] Run `npm run build` in both frontend and root
- [ ] Check for any TypeScript errors
- [ ] Verify no console errors in browser
- [ ] Remove any debug logs or console statements
- [ ] Check `.gitignore` excludes sensitive files

## Backend Deployment (Render)

### Initial Setup
- [ ] Create Render account (render.com)
- [ ] Connect Render to GitHub repository
- [ ] Select `main` branch for deployment

### Service Configuration
- [ ] **Name**: `upsifs-backend` (or your preferred name)
- [ ] **Region**: Select region closest to your users
- [ ] **Runtime**: Node.js
- [ ] **Build Command**: `cd backend && npm install`
- [ ] **Start Command**: `cd backend && npm start`

### Environment Variables
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `DB_PATH` = `/opt/render/project/data/upsifs.db`
- [ ] `JWT_SECRET` = (your secure random string)
- [ ] `CORS_ORIGIN` = (to be set after frontend deployment)

### Disk Storage (Important!)
- [ ] Add persistent disk named `data`
- [ ] Mount path: `/opt/render/project/data`
- [ ] Size: 1 GB (or more if needed)

### Post-Deployment Verification
- [ ] Backend is running and accessible
- [ ] Health endpoint returns 200 OK: `https://your-backend.onrender.com/api/health`
- [ ] Check Render logs for any errors
- [ ] Database tables were created successfully
- [ ] Test authentication with sample credentials

## Frontend Deployment (Vercel)

### Initial Setup
- [ ] Create Vercel account (vercel.com)
- [ ] Connect Vercel to GitHub repository
- [ ] Import the UPSIFS project

### Project Configuration
- [ ] **Framework Preset**: Vite
- [ ] **Root Directory**: `./frontend`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`

### Environment Variables
- [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`

### Post-Deployment Verification
- [ ] Frontend is accessible via Vercel URL
- [ ] All pages load without errors
- [ ] Check browser console for any errors
- [ ] Verify SPA routing works (refresh on different pages)
- [ ] Test login flow with backend

## Final Configuration

### Update CORS
- [ ] Get your Vercel frontend URL
- [ ] Update `CORS_ORIGIN` in Render backend environment variables
- [ ] Backend will restart automatically
- [ ] Test API calls from frontend again

### DNS (Optional - Custom Domain)
- [ ] Purchase custom domain (if desired)
- [ ] Add domain in Vercel project settings
- [ ] Update DNS records as instructed by Vercel
- [ ] Update `CORS_ORIGIN` with custom domain

## Testing & Verification

### Backend Tests
- [ ] Health check: `GET /api/health` ✓
- [ ] User registration: `POST /api/auth/register` ✓
- [ ] User login: `POST /api/auth/login` ✓
- [ ] Get current user: `GET /api/auth/me` ✓
- [ ] Get notices: `GET /api/notices` ✓
- [ ] Create grievance: `POST /api/grievances` ✓

### Frontend Tests
- [ ] Load homepage ✓
- [ ] Login as student ✓
- [ ] Login as teacher ✓
- [ ] Navigate to dashboard ✓
- [ ] View attendance ✓
- [ ] View notices ✓
- [ ] Create grievance ✓
- [ ] View profile ✓
- [ ] Logout ✓

### Integration Tests
- [ ] Frontend can authenticate with backend ✓
- [ ] API calls return correct data ✓
- [ ] JWT tokens are stored and sent correctly ✓
- [ ] Error messages display properly ✓
- [ ] Loading states work correctly ✓

## Post-Deployment

### Monitoring Setup
- [ ] Set up Render alerts for backend
- [ ] Set up Vercel analytics for frontend
- [ ] Monitor logs for any errors
- [ ] Check response times and performance

### Documentation
- [ ] Save deployment URLs in secure location
- [ ] Document environment variables
- [ ] Share deployment guide with team
- [ ] Update any internal documentation

### Security Checklist
- [ ] Change default passwords
- [ ] Verify JWT_SECRET is strong
- [ ] Ensure HTTPS is enabled (automatic on both platforms)
- [ ] Check CORS is restricted to frontend domain
- [ ] Review database permissions
- [ ] No sensitive data in code or git history

## Rollback Plan

If deployment fails:

### Backend Rollback
- [ ] Revert to previous commit in GitHub
- [ ] Render will auto-deploy the previous version
- [ ] Verify database data is intact

### Frontend Rollback
- [ ] Revert to previous commit in GitHub
- [ ] Vercel will auto-deploy the previous version
- [ ] Clear CDN cache if needed

## Ongoing Maintenance

### Regular Tasks
- [ ] Monitor logs weekly
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Backup database regularly (Render provides backups)
- [ ] Test critical functionality after updates

### Scaling Considerations
- [ ] Monitor Render free tier limits
- [ ] Consider upgrading if needed
- [ ] Monitor Vercel bandwidth usage
- [ ] Plan for database scaling if needed

---

## Quick Reference

**Backend URL**: https://your-backend.onrender.com
**Frontend URL**: https://your-frontend.vercel.app
**Database**: SQLite (persistent on Render)
**Health Check**: https://your-backend.onrender.com/api/health

**Sample Credentials**:
- Email: `aryan.sharma@upsifs.ac.in`
- Password: `password123`
- Role: `STUDENT`

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Project DEPLOYMENT.md](./DEPLOYMENT.md)
- [Backend README](./backend/README.md)
