# Gmail SMTP Contact Form Setup - Complete Guide

## ✅ Setup Complete!

Your portfolio contact form is now connected to Gmail SMTP and will send emails to **khan.aadil8299@gmail.com**.

---

## 🎯 What Was Implemented

### 1. **Backend API Route** (`app/api/contact/route.ts`)
   - Handles contact form submissions
   - Uses nodemailer to send emails via Gmail SMTP
   - Validates form data
   - Returns success/error responses

### 2. **Environment Variables** (`.env.local`)
   - `GMAIL_USER`: Your Gmail address (khan.aadil8299@gmail.com)
   - `GMAIL_APP_PASSWORD`: Your Gmail app password (configured)
   - `CONTACT_EMAIL`: Where emails will be sent (khan.aadil8299@gmail.com)

### 3. **Updated Contact Form** (`app/page.tsx`)
   - Added form submission handler
   - Shows loading state while sending
   - Displays success/error messages
   - Disables form during submission
   - Auto-clears form after successful submission

---

## 📧 How It Works

1. **User fills out the contact form** with their name, email, subject, and message
2. **Form submits to `/api/contact`** API endpoint
3. **API validates the data** and sends email via Gmail SMTP
4. **You receive an email** at khan.aadil8299@gmail.com with:
   - Sender's name
   - Sender's email (so you can reply)
   - Subject line
   - Message content
   - Timestamp
5. **User sees confirmation** that their message was sent

---

## 🔐 Security Notes

### ✅ What's Secure:
- App password is stored in `.env.local` (never committed to Git)
- `.env.local` is in `.gitignore` by default
- App passwords are more secure than regular passwords
- Form data is validated before processing

### ⚠️ Important:
- **NEVER commit `.env.local` to Git**
- **NEVER share your app password publicly**
- If password is compromised, revoke it and generate a new one

---

## 🧪 Testing Your Contact Form

1. **Open your portfolio**: http://localhost:3000
2. **Scroll to the Contact section**
3. **Fill out the form** with test data:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message
4. **Click [TRANSMIT_MESSAGE]**
5. **Wait for confirmation**: Should see green success message
6. **Check your email**: khan.aadil8299@gmail.com should have the message

---

## 🎨 Email Design

The emails you receive will have:
- **Hacker-themed styling** (matching your portfolio)
- **Green/black color scheme**
- **Clear formatting** with sender details
- **Timestamp** of when the message was sent

---

## 🐛 Troubleshooting

### Problem: Emails not sending

**Check these:**

1. **Environment variables loaded?**
   - Restart dev server: `npm run dev`
   - Check terminal - should show "Environments: .env.local"

2. **App password correct?**
   - Should be: `mbblfwlwzpujwuyg` (no spaces)
   - If wrong, update `.env.local` and restart server

3. **2-Step Verification enabled?**
   - Required for app passwords
   - Check: https://myaccount.google.com/security

4. **Gmail account settings?**
   - Make sure account is active
   - Try sending a regular email to verify account works

5. **Check browser console:**
   - Open DevTools (F12)
   - Look for error messages in Console tab

6. **Check terminal/server logs:**
   - Look for error messages when form is submitted

### Problem: Form shows error message

- Check browser DevTools Console for details
- Check terminal where `npm run dev` is running
- Verify all form fields are filled out
- Verify email format is valid

### Problem: Getting 500 error

- App password might be wrong
- Gmail might be blocking the login
- Check server terminal for detailed error

---

## 🔄 Regenerating App Password

If you need to create a new app password:

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not enabled)
3. Search for "**App passwords**"
4. Click "**App passwords**"
5. Select:
   - App: **Mail**
   - Device: **Other (Custom name)**
   - Name it: "Portfolio Website"
6. Click **Generate**
7. Copy the 16-character password
8. Update `.env.local` with new password (remove spaces)
9. Restart dev server

---

## 📁 File Structure

```
hacker_theme/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          ← API endpoint
│   └── page.tsx                  ← Contact form
├── .env.local                    ← Your credentials (DO NOT COMMIT)
├── .env.local.example            ← Template/documentation
└── GMAIL_SMTP_SETUP.md          ← This file
```

---

## 🚀 Deploying to Production

When deploying to Hostinger or another host:

### Option 1: Add environment variables in hosting panel
Most hosts have environment variable settings in their dashboard.

### Option 2: Create .env.local on server
```bash
# SSH into your server
cd /path/to/your/project

# Create .env.local file
nano .env.local

# Add your variables:
GMAIL_USER=khan.aadil8299@gmail.com
GMAIL_APP_PASSWORD=mbblfwlwzpujwuyg
CONTACT_EMAIL=khan.aadil8299@gmail.com

# Save and exit (Ctrl+X, Y, Enter)
```

### For Static Export (Hostinger):
⚠️ **Note**: If you're doing static export (`npm run build`), the contact form API won't work because API routes require a Node.js server.

**Solutions:**
1. **Deploy with Node.js** instead of static export
2. **Use a serverless function** (Vercel, Netlify)
3. **Use a third-party service** (FormSpree, EmailJS)

---

## 📊 Stats & Limits

### Gmail SMTP Limits:
- **500 emails per day** (for free Gmail accounts)
- **2,000 emails per day** (for Google Workspace)
- Should be more than enough for a portfolio site!

### Rate Limiting:
Consider adding rate limiting if you get lots of spam:
```typescript
// In route.ts, add IP-based rate limiting
```

---

## 🎉 Success!

Your contact form is now fully functional! When someone fills it out:
- ✅ They get instant feedback
- ✅ You get email notification
- ✅ You can reply directly to their email
- ✅ All styled in hacker theme

---

## 💡 Next Steps (Optional Enhancements)

1. **Add reCAPTCHA** - Prevent spam
2. **Add rate limiting** - Limit submissions per IP
3. **Save to database** - Keep a record of all messages
4. **Auto-reply** - Send confirmation email to sender
5. **Slack/Discord notification** - Get notified in real-time
6. **Email templates** - More professional email design

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Check browser console (F12)
3. Check terminal logs
4. Verify Gmail settings
5. Try regenerating app password

---

**Created:** December 10, 2025  
**Email:** khan.aadil8299@gmail.com  
**Status:** ✅ Fully Configured
