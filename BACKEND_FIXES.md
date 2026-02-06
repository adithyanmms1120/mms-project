
# Django Backend Fixes for CORS and Email

Based on the error logs you provided, there are two main issues:
1. **CORS Error**: The request from `www.mediamaticstudio.com` is being blocked when trying to access `mediamaticstudio.com`.
2. **Email Issues**: Potentially related to the request not reaching the backend, or SMTP configuration.

## 1. Fix CORS and CSRF Settings (settings.py)

In your Django `settings.py`, you need to explicitly trust the origins and ensure headers are correct. 

Add/Update these settings:

```python
# settings.py

# ... existing code ...

# Ensure these are in ALLOWED_HOSTS
ALLOWED_HOSTS = ['mediamaticstudio.com', 'www.mediamaticstudio.com', 'localhost', '127.0.0.1']

# CORS Settings
CORS_ALLOW_ALL_ORIGINS = True  # Useful for debugging, but better to be specific in prod:
CORS_ALLOWED_ORIGINS = [
    "https://mediamaticstudio.com",
    "https://www.mediamaticstudio.com",
]

# CSRF Settings (CRITICAL for Django 4.0+ POST requests)
CSRF_TRUSTED_ORIGINS = [
    "https://mediamaticstudio.com",
    "https://www.mediamaticstudio.com",
]

# Allow credentials if you use sessions/cookies
CORS_ALLOW_CREDENTIALS = True

# Middleware Check
# Ensure 'corsheaders.middleware.CorsMiddleware' is VERY HIGH in the MIDDLEWARE list.
# It should be before 'django.middleware.common.CommonMiddleware'.

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # <--- Must be at the top
    'django.middleware.security.SecurityMiddleware',
    # ... other middleware
]
```

## 2. Server Configuration (Nginx/Apache) - Important!

The error "Response to preflight request doesn't pass access control check" often happens if **Nginx** redirects the request before Django sees it.

*   If `https://mediamaticstudio.com` redirects to `https://www.mediamaticstudio.com`, the `OPTIONS` request (CORS preflight) might get a 301 Redirect response *without* CORS headers, causing the browser to block it.
*   **Fix**: Ensure your Frontend uses the **same domain** as the Backend is served on. I have updated `Contact.tsx` to use the `www` domain to minimize this risk.

## 3. Email Settings Check

Your email settings look mostly correct for a standard SMTP server, but here is a checklist:

```python
# Email Settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.mediamaticstudio.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = 'support@mediamaticstudio.com'
EMAIL_HOST_PASSWORD = 'YOUR_PASSWORD_HERE' # Double check this!
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
```

**Common Email Pitfalls:**
*   **Firewall**: Ensure your server allows outbound connections on port 587.
*   **DNS**: Ensure `mail.mediamaticstudio.com` resolves correctly from within the server.
*   **Authentication**: Some servers require the specific email account to be "unlocked" for SMTP access.

## Summary of Applied Frontend Fix
I have updated `src/components/Contact.tsx` to use `https://www.mediamaticstudio.com/api/contact/send/`. 
*   **Why**: Your error showed you were on `www.mediamaticstudio.com` trying to hit `mediamaticstudio.com`. This is a Cross-Origin request.
*   By changing the API URL to `www.mediamaticstudio.com`, the request becomes **Same-Origin** (if the browser is on www), which bypasses most CORS complexity.

