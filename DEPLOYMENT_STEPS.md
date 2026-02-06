# 🚀 DEPLOYMENT STEPS - MediaMatic Studio Website

## Current Status
- ✅ Code is built locally in `dist` folder
- ✅ All fix files are present (_redirects, .htaccess)
- ❌ NOT YET deployed to live server
- ❌ Live site still showing 404 errors

---

## 📤 DEPLOYMENT INSTRUCTIONS

### Option 1: cPanel / Shared Hosting (GoDaddy, Bluehost, Hostinger, etc.)

#### Step 1: Access Your Hosting
1. Log in to your hosting control panel (cPanel)
2. Open **File Manager**
3. Navigate to `public_html` folder (this is your website root)

#### Step 2: Backup Current Files (IMPORTANT!)
1. In File Manager, select all files in `public_html`
2. Click **Compress** → Create a ZIP file
3. Name it `backup_before_update_Feb5_2026.zip`
4. Download this backup to your computer

#### Step 3: Clear Old Files
1. Delete ALL files in `public_html` EXCEPT:
   - `.htaccess` (if it exists, delete it - we have a new one)
   - `cgi-bin` folder (keep this)
   - Any database folders (keep these)

#### Step 4: Upload New Files
1. On your computer, open: `C:\Users\MMS-5\Desktop\mms-project\dist`
2. Select ALL files and folders inside `dist`:
   - index.html
   - assets folder
   - .htaccess
   - _redirects
   - 404-illustration.jpg
   - favicon.ico
   - robots.txt
   - sitemap.xml
   - download.jpg
   - vector.png

3. **Upload to cPanel:**
   - Click **Upload** in File Manager
   - Select all the files from `dist` folder
   - Upload them to `public_html`

#### Step 5: Verify .htaccess File
1. In File Manager, make sure you can see `.htaccess` file
2. If you can't see it, click **Settings** (top right) → Check "Show Hidden Files"
3. The `.htaccess` file MUST be in the root of `public_html`

#### Step 6: Set Correct Permissions
1. Right-click on `.htaccess` → **Change Permissions**
2. Set to: **644** (rw-r--r--)
3. Click OK

---

### Option 2: Netlify

#### Step 1: Install Netlify CLI (if not installed)
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Deploy
```bash
cd C:\Users\MMS-5\Desktop\mms-project
netlify deploy --prod --dir=dist
```

---

### Option 3: Vercel

#### Step 1: Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd C:\Users\MMS-5\Desktop\mms-project
vercel --prod
```

---

## ✅ VERIFICATION STEPS (After Deployment)

### Test 1: Check if .htaccess is Working
1. Open browser
2. Go to: `https://mediamaticstudio.com/.htaccess`
3. You should see: **403 Forbidden** (this is good! It means the file exists)

### Test 2: Check Service Page
1. Open browser
2. Go to: `https://mediamaticstudio.com/services/digital-marketing`
3. Press **F12** → **Network tab**
4. Press **Ctrl+R** to refresh
5. Look at the first request (the HTML document)
6. **Status should be: 200** ✅ (not 404)

### Test 3: Check 404 Page
1. Go to: `https://mediamaticstudio.com/this-does-not-exist`
2. You should see the new 404 page with illustration

### Test 4: Request Google Re-crawl
1. Go to Google Search Console
2. Enter the URL: `https://mediamaticstudio.com/services/digital-marketing`
3. Click **"Request Indexing"**
4. Wait 24-48 hours for Google to re-crawl

---

## 🔧 TROUBLESHOOTING

### If still showing 404 after deployment:

#### Check 1: Is .htaccess in the right place?
- Must be in the ROOT of your website (public_html)
- NOT in a subfolder

#### Check 2: Is mod_rewrite enabled?
- Contact your hosting support
- Ask them to enable "mod_rewrite" for your account

#### Check 3: Check .htaccess syntax
- Open the file and verify it matches this:
```apache
<IfModule mod_mime.c>
  AddType application/javascript .js .mjs
  AddType text/css .css
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Check 4: Server Configuration
Some servers need additional configuration:
- Add this to the TOP of .htaccess:
```apache
Options -MultiViews
```

---

## 📞 NEED HELP?

If you're stuck, tell me:
1. What hosting provider are you using?
2. Did you upload the files?
3. Can you see .htaccess in File Manager?
4. What error do you see when you visit the service page?

---

## 🎯 QUICK CHECKLIST

Before asking for help, verify:
- [ ] Built the project (`npm run build`)
- [ ] Uploaded ALL files from `dist` folder
- [ ] .htaccess file is in the root directory
- [ ] .htaccess file permissions are 644
- [ ] Cleared browser cache (Ctrl+Shift+Delete)
- [ ] Tested in incognito/private browsing mode

---

**Last Updated:** February 5, 2026
**Status:** Ready for deployment
