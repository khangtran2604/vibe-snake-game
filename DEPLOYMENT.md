# Deployment Guide

This project can be deployed for **completely free** using GitHub Pages.

## ✅ Setup Complete

The project is already configured for GitHub Pages deployment with:

- Automatic builds and deployments via GitHub Actions
- Optimized production builds
- All tests run before deployment

## 📦 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Create a GitHub repository** (if you haven't already):

   ```bash
   # Initialize git (if not done)
   git init

   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

2. **Update the base path** in `vite.config.ts`:
   - Change `/simple-todo-v4/` to `/YOUR_REPO_NAME/`
   - Or keep it as is if your repo is named `simple-todo-v4`

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: **GitHub Actions**
   - Click **Save**

4. **Push your code**:

   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push -u origin main
   ```

5. **Deployment happens automatically!**
   - GitHub Actions will build and deploy
   - Check the **Actions** tab to see progress
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Option 2: Manual Build Only

If you just want to build locally without deploying:

```bash
npm run build:gh
```

The production files will be in the `dist/` folder.

## 🚀 Other Free Hosting Options

### Vercel (Recommended Alternative)

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

   Follow prompts, then your site is live!

**Features:**

- Automatic deployments from GitHub
- Free SSL
- Global CDN
- Preview deployments for PRs
- No configuration needed

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

**Features:**

- Free SSL
- Forms and serverless functions
- Automatic deployments
- Global CDN

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy!

**Features:**

- Unlimited bandwidth
- Free SSL
- Global CDN
- Very fast

## 📝 Deployment Checklist

Before deploying, make sure:

- [ ] All tests pass: `npm run test:run`
- [ ] Build succeeds: `npm run build`
- [ ] Update `base` path in `vite.config.ts` to match your repo name
- [ ] Remove any sensitive data or API keys
- [ ] Update repository name in this README if needed

## 🔧 Troubleshooting

### Blank page after deployment

**Problem:** Page loads but shows blank screen  
**Solution:** Check that `base` in `vite.config.ts` matches your repository name

```typescript
base: process.env.GITHUB_PAGES ? '/YOUR_REPO_NAME/' : '/',
```

### 404 errors on routes

**Problem:** Direct navigation to routes shows 404  
**Solution:** This is expected with client-side routing on GitHub Pages. Users should start from the home page.

For Vercel/Netlify: Create a `vercel.json` or `netlify.toml`:

**vercel.json:**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**netlify.toml:**

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deployment fails

1. Check the **Actions** tab in GitHub for error logs
2. Ensure GitHub Pages is enabled in repository settings
3. Verify all tests pass locally: `npm run test:run`
4. Check that Node.js version matches (20.x in workflow)

## 🎮 Your Game is Live!

Once deployed to GitHub Pages, share your game at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Enjoy your free, fast, and reliable hosting! 🎉
