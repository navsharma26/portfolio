# Navneet Sharma — Developer Portfolio

> Systems, Backend & Full-Stack Software Engineer  
> Computer Science & Engineering @ Vellore Institute of Technology (VIT Bhopal)

**Live Production URL:** [https://navneet-sharma-portfolio-two.vercel.app](https://navneet-sharma-portfolio-two.vercel.app)

---

## 🌟 Overview & Architecture

This is a developer portfolio built for **Navneet Sharma**, showcasing production-grade distributed systems, storage engines, real-time developer platforms, and full-stack applications.

### Key Features
- **Hero & Interactive Bento:** Dynamic typewriter headline, live stat counters (30+ GitHub Repos, 10+ Deployments, 200+ LeetCode DSA Solved, 8.25 CGPA).
- **Interactive Terminal CLI:** Fully functional in-browser terminal emulator supporting commands like `skills`, `projects`, `exp`, `about`, `certs`, `contact`, `theme <color>`, `sudo hire-me`, and `clear`.
- **Project Filter & Instant Search:** Filter between *Systems & Storage*, *Full-Stack & Real-Time*, and *AI, Analytics & Cloud*. Real-time search by technology tags (e.g. `Go`, `Redis`, `WebRTC`, `FastAPI`).
- **Architecture Deep Dive Modals:** Clickable architectural breakdown for projects (WiscKey key-value separation, Bloom filters, BullMQ async workers, ACID transactions).
- **Embedded Resume Preview & Download:** One-click modal preview and direct PDF download of Navneet's official resume.
- **Theme Engine:** Clean Dark / Light mode toggle inspired by the minimalist aesthetic of `vishalbhutekar.netlify.app` with persistent `localStorage`.
- **Direct Contact & Copy System:** One-click copy for email (`navsharma30405@gmail.com`) and phone with animated toast confirmations, plus prefilled direct email client launch.

---

## 🛠️ Tech Stack

- **Core:** Semantic HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3 (Custom Properties & Glassmorphism).
- **Typography:** Inter, Outfit, and JetBrains Mono (via Google Fonts).
- **Deployment:** Vercel Edge Network with HTTP/2, security headers, and asset caching.

---

## 📁 Project Structure

```text
├── index.html          # Semantic HTML structure & metadata
├── style.css           # Glassmorphism design system & theme variables
├── script.js           # Typewriter, terminal CLI, project data & filters
├── resume.pdf          # Official PDF Resume
├── vercel.json         # Vercel deployment configuration & caching rules
└── assets/
    └── avatar.png      # Profile avatar image
```

---

## 🚀 Running Locally

To run the portfolio locally on your machine:

```bash
# Using Python
python3 -m http.server 8080

# Or using npx serve
npx serve .
```

Then open `http://localhost:8080` in your browser.

---

## 🔒 Security Notice

Please ensure you rotate or revoke any personal API tokens or keys (GitHub personal access token, Vercel token, Render API keys) that were temporarily shared during setup.
