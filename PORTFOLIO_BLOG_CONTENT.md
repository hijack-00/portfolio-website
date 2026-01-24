# 🚀 Blog Post: Building My Portfolio Website

Use this content to add a blog post about the Portfolio Website project to your admin panel.
Simply copy and paste each field into the corresponding form field.

---

## BASIC INFORMATION

### Title
```
Building a Modern Portfolio with Next.js 15, React 19 & Custom CMS
```

### Slug
```
building-modern-portfolio-nextjs-react-custom-cms
```

### Category
```
Case Study
```

### Preview
```
A deep dive into building my personal portfolio website with a hacker-themed UI, custom content management system, and VPS deployment. Learn the architecture, challenges, and solutions.
```

### Read Time
```
15 min read
```

### Is Published
```
true
```

### Order
```
1
```

---

## CONTENT (Full Blog Post)

```markdown
## Introduction

After years of building websites for clients, I finally decided to create my own portfolio - and I wanted it to be special. Not just another template, but something that truly represents my personality and skills as a developer.

In this case study, I'll walk you through how I built **aadilkhan.site** - a full-stack portfolio featuring a cyber/hacker aesthetic, custom CMS, and professional deployment on my own VPS.

---

## The Vision

I had specific goals for this project:

1. **Unique Design** - A cyber/hacker theme that stands out
2. **Full Control** - Custom CMS to update content without redeployment
3. **Performance** - Instant page loads, even on slow connections
4. **Professional Deployment** - Self-hosted on VPS, not relying on free tiers

---

## Tech Stack Overview

### Frontend
- **Next.js 15** - Latest version with App Router
- **React 19** - Server and client components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### Backend
- **Node.js + Express** - RESTful API
- **MongoDB Atlas** - Cloud database
- **Cloudflare R2** - Image storage

### Deployment
- **Nginx** - Reverse proxy and static file serving
- **PM2** - Node.js process manager
- **Let's Encrypt** - SSL certificates

---

## The Hacker Theme

The design was inspired by classic terminal aesthetics and cyberpunk visuals. Key elements include:

### Matrix Rain Animation
I implemented a canvas-based matrix effect that runs in the background:

```javascript
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  const chars = '01アイウエオカキクケコ';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(columns).fill(1);
  
  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      
      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  };
  
  const interval = setInterval(draw, 33);
  return () => clearInterval(interval);
}, []);
```

### Terminal-Inspired UI
Every element uses the cyber aesthetic:
- Green-on-black color scheme (`#4ade80` on `#000`)
- Monospace fonts
- Command prompt prefixes (`$`, `>`)
- Animated cursor effects

---

## Hybrid Caching Strategy

One major challenge was dealing with cold starts on free hosting tiers. My solution: **hybrid caching**.

### The Problem
When using Render.com's free tier, the server sleeps after inactivity. First visits take 30-50 seconds to wake up.

### The Solution
1. **Build-time data fetching** - Fetch latest data during deployment
2. **Static baking** - Include data in the deployed bundle
3. **Client-side caching** - Store in localStorage for repeat visits
4. **Background refresh** - Silently update stale data

```typescript
// Hybrid data hook
export function usePortfolioData() {
  const [data, setData] = useState(defaultData);
  const [fromCache, setFromCache] = useState(true);
  
  useEffect(() => {
    // Try cache first
    const cached = localStorage.getItem('portfolio-data');
    if (cached) {
      setData(JSON.parse(cached));
    }
    
    // Fetch fresh in background
    fetch('/api/data')
      .then(res => res.json())
      .then(fresh => {
        setData(fresh);
        setFromCache(false);
        localStorage.setItem('portfolio-data', JSON.stringify(fresh));
      });
  }, []);
  
  return { data, fromCache };
}
```

Result: Users see content instantly, even if backend is cold.

---

## Custom CMS Development

Instead of using WordPress or a headless CMS, I built my own admin panel:

### Features
- **Projects management** - CRUD with image uploads
- **Blog posts** - Markdown content with preview
- **Skills & Tools** - Dynamic updates
- **Contact messages** - View and manage inquiries
- **Real-time preview** - See changes before publishing

### Admin Panel Stack
- React with React Router
- Vite for fast development
- React Hook Form for forms
- Toast notifications

### Image Upload Flow
1. User selects/drops image
2. Frontend compresses if needed
3. Upload to Express `/api/upload`
4. Server uploads to Cloudflare R2
5. Return public URL to store in database

---

## VPS Deployment Journey

Deploying to a VPS was a learning experience. Here's what I set up:

### Server Architecture
```
Internet → Nginx (Port 80/443)
              │
              ├── aadilkhan.site → /frontend/out (static)
              ├── admin.aadilkhan.site → /admin/dist (static)
              └── api.aadilkhan.site → localhost:5005 (proxy)
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name aadilkhan.site;
    
    root /home/admin2/portfolio/frontend/out;
    index index.html;
    
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

### PM2 for Node.js
```bash
pm2 start server.js --name "portfolio-api"
pm2 startup  # Auto-start on reboot
pm2 save
```

### SSL with Let's Encrypt
```bash
sudo certbot --nginx \
  -d aadilkhan.site \
  -d admin.aadilkhan.site \
  -d api.aadilkhan.site
```

---

## Challenges & Solutions

### 1. CORS Issues
**Problem**: Frontend on aadilkhan.site couldn't reach api.aadilkhan.site

**Solution**: Proper CORS configuration with specific origins:
```javascript
app.use(cors({
  origin: [
    'https://aadilkhan.site',
    'https://admin.aadilkhan.site'
  ],
  credentials: true
}));
```

### 2. Permission Denied (Nginx)
**Problem**: 500 errors when serving static files

**Solution**: Fix directory permissions:
```bash
chmod 755 /home/admin2
chmod -R 755 /home/admin2/portfolio
```

### 3. Cold Start Delays
**Problem**: 40+ second waits on first load

**Solution**: Hybrid caching + VPS migration (now instant!)

---

## Performance Metrics

After optimization:
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2s
- **Time to Interactive**: < 1.5s
- **PageSpeed Score**: 90+

---

## Key Takeaways

1. **Own your infrastructure** - VPS gives you control and eliminates cold starts
2. **Design with purpose** - The hacker theme isn't just aesthetic, it's memorable
3. **Build for offline** - Caching ensures users always see content
4. **Custom CMS freedom** - Full control over your content structure
5. **Document everything** - Future you will thank present you

---

## What's Next?

Future improvements planned:
- Blog comments system
- Dark/light theme toggle
- Project filtering by technology
- Analytics dashboard
- RSS feed for blog

---

## Conclusion

Building this portfolio was more than just a project - it was a complete full-stack journey from design to deployment. If you're a developer considering building your own portfolio, I highly recommend going the custom route. Yes, it takes more time, but the learning experience and final result are worth it.

The site is live at **[aadilkhan.site](https://aadilkhan.site)** - feel free to explore and reach out!

---

*Have questions about the implementation? Drop me a message through the contact form or connect on [LinkedIn](https://linkedin.com/in/aadilkhan00).*
```

---

## ✅ Quick Copy Checklist

When uploading to admin panel, make sure to:

- [ ] Title entered
- [ ] Slug is URL-friendly (no spaces)
- [ ] Category: "Case Study"
- [ ] Preview written (under 200 chars)
- [ ] Read Time: "15 min read"
- [ ] Content pasted (full markdown)
- [ ] isPublished: true
- [ ] Order: 1 (to show first)

---

## 🎉 Done!

After saving, your blog post will appear at:
- **Card view**: https://aadilkhan.site/#blog
- **Full article**: https://aadilkhan.site/blog/building-modern-portfolio-nextjs-react-custom-cms
