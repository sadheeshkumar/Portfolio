# Sadheeshkumar Rajamanickam - Portfolio Website

A modern, responsive portfolio website showcasing my expertise as a Cloud DevOps & Platform Engineer.

## 🚀 Features

- **Modern Design**: Dark mode with glassmorphism effects and vibrant gradients
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Animations**: Smooth scroll, typing effects, and micro-interactions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Fast loading with optimized assets

## 🛠️ Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

## 📦 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `<your-username>.github.io` (replace `<your-username>` with your actual GitHub username)
3. Make it public
4. Don't initialize with README (we already have files)

### Step 2: Push Your Code

Open terminal in this directory and run:

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**

Your site will be live at: `https://<your-username>.github.io`

## 🎨 Customization Guide

### Update Personal Information

1. **index.html**:
   - Update your name, title, and description
   - Add your email, LinkedIn, and GitHub links
   - Update skills, projects, experience, and certifications

2. **Social Links**:
   - Replace placeholder URLs with your actual profiles
   - Update email address

### Customize Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00d9ff;
    --secondary-color: #a855f7;
    /* Modify these to change the color scheme */
}
```

### Add Your Photo

Replace the floating icons in the hero section with your profile picture:
- Add your image to the project directory
- Update the hero-image section in HTML

## 🧪 Local Development

To run locally, you can use any static file server:

**Python:**
```bash
python -m http.server 8000
```

**Node.js (with http-server):**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 📝 License

Feel free to use this template for your own portfolio!

## 🤝 Contact

- LinkedIn: [Sadheeshkumar Rajamanickam](https://www.linkedin.com/in/sadheeshkumar-rajamanickam-1424a1149)
- Email: your.email@example.com

---

Built with ❤️ for the DevOps community
