# Mohammed Ryad — Portfolio 🚀

A clean, professional portfolio website showcasing my projects, education, and skills as a **Full Stack Developer**.

**Live:** [this.is.ryad.portfolio](https://this-is-ryad-portfolio.vercel.app)

---

## ✨ Features

- **Clean Design** — Generous whitespace, clear typography hierarchy, subtle animations
- **Dark / Light Mode** — Persisted in localStorage, respects system preference
- **Live GitHub Projects** — Fetches repos from the GitHub API in real-time, with skeleton loading and "Load More" pagination
- **Education Timeline** — Visual academic journey from L1 to Master 2
- **Contact Form** — Powered by Formspree (free tier)
- **Fully Responsive** — Mobile-first, works on all screen sizes
- **Accessible** — Semantic HTML, ARIA labels, focus-visible outlines, reduced-motion support
- **Automated Notifications** — GitHub Actions detects new repos and sends email notifications via Resend

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic) |
| Styling | Tailwind CSS (CDN) + Vanilla CSS custom properties |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Inter & JetBrains Mono (Google Fonts) |
| Contact Form | [Formspree](https://formspree.io/) |
| Email Notifications | [Resend](https://resend.com/) via Vercel Serverless Function |
| CI/CD | GitHub Actions (scheduled cron job) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```
portfolio/
├── index.html                  # Main page — 4 sections (Hero, Education, Projects, Contact)
├── style.css                   # Design system with CSS custom properties (dark/light)
├── main.js                     # GitHub API fetch, dark mode, scroll effects
├── tailwind.config.js          # Tailwind CDN configuration
├── package.json                # Minimal deps (resend for serverless function)
├── vercel.json                 # Vercel routing config
├── IMG/
│   ├── IMG-20250103-WA0021.jpg # Profile photo
│   ├── mylogo.png              # Logo
│   └── ...
├── api/
│   └── notify.js               # Vercel serverless function — email notifications
└── .github/
    └── workflows/
        └── new-repo-notify.yml # GitHub Actions — new repo detection + notification
```

---

## 🔧 Setup & Configuration

### 1. Contact Form (Formspree)

✅ **Already configured** — the form action points to `https://formspree.io/f/xdeoyzyp`.

### 2. Email Notifications (Resend + Vercel)

Add these **environment variables** in your Vercel project settings (`Settings → Environment Variables`):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Your Resend API key (get one free at [resend.com](https://resend.com/)) |
| `NOTIFY_SECRET` | A random secret string (e.g., generate with `openssl rand -hex 32`) |
| `NOTIFICATION_EMAIL` | Email address to receive notifications (default: `ryadbenyakoub@gmail.com`) |

### 3. GitHub Actions Secrets

Add these **secrets** in your GitHub repo settings (`Settings → Secrets and Variables → Actions`):

| Secret | Description |
|--------|-------------|
| `NOTIFY_SECRET` | Same secret as in Vercel (must match) |
| `VERCEL_DEPLOY_URL` | Your Vercel deployment URL (e.g., `https://this-is-ryad-portfolio.vercel.app`) |

### 4. Install Dependencies

```bash
npm install
```

This installs the `resend` package needed by the serverless function.

---

## 🚀 Deployment

The site auto-deploys to Vercel on push to `main`. The GitHub Actions workflow runs every 6 hours to check for new repos.

### Local Development

Simply open `index.html` in your browser — no build step needed for the frontend.

To test the serverless function locally, use the [Vercel CLI](https://vercel.com/cli):

```bash
npx vercel dev
```

---

## ✍️ Author

**Mohammed Ryad Benyakoub**
- GitHub: [@RYAD-BENYAKOUB](https://github.com/RYAD-BENYAKOUB)
- LinkedIn: [Mohammed Ryad Benyakoub](https://www.linkedin.com/in/mohammed-ryad-benyakoub-0b16bb343/)
- Email: ryadbenyakoub@gmail.com
