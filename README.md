# Hacker Portfolio Website

A minimalist portfolio website with a hacker aesthetic, designed for beginner software developers. Features a dark terminal-inspired design with green text and modern animations.

## 🎨 Features

### Design
- **Dark Theme**: Black background with green terminal-style text
- **Terminal Aesthetic**: Terminal window design with macOS-style buttons
- **Glitch Effects**: Animated glitch effect on the main title
- **Monospace Font**: JetBrains Mono for authentic terminal feel
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Interactive Elements
- **Terminal Cursor**: Follows mouse movement with blinking animation
- **Typing Effects**: Animated typing for commands and text
- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Hover Effects**: Cards and buttons have interactive hover states
- **Progress Bars**: Animated skill bars that fill on scroll
- **Form Validation**: Contact form with validation and notifications
- **Scroll Progress**: Progress bar at the top of the page

### Sections
1. **Hero**: Terminal-style introduction with animated commands
2. **About**: Personal information with animated statistics
3. **Projects**: Project showcase with technology tags
4. **Skills**: Animated skill bars for languages and technologies
5. **Contact**: Contact form and social links

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. That's it! The website is ready to use

### File Structure
```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Customization

### Personal Information
Edit the following in `index.html`:
- Replace "DEVELOPER_NAME" with your actual name
- Update the about section text
- Modify project descriptions and links
- Change contact information
- Update skill percentages

### Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --bg-primary: #0a0a0a;      /* Main background */
    --text-primary: #00ff00;    /* Primary text color */
    --accent: #00ff41;          /* Accent color */
    /* ... other variables */
}
```

### Projects
Add or modify projects in the projects section:
```html
<div class="project-card">
    <div class="project-header">
        <h3>Your Project Name</h3>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fab fa-github"></i></a>
            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
        </div>
    </div>
    <p>Project description here...</p>
    <div class="project-tech">
        <span class="tech-tag">Technology</span>
    </div>
</div>
```

### Skills
Update skill percentages in the skills section:
```html
<div class="skill-progress" style="width: 85%"></div>
```

## 🎯 Browser Support

- Chrome
- Firefox
- Safari
- Edge

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Different screen orientations

## 🔧 Technologies Used

- **HTML**: Semantic markup
- **CSS**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: JetBrains Mono and Orbitron fonts

## 🎨 Design Inspiration

This portfolio draws inspiration from:
- Terminal/command line interfaces
- Cyberpunk and hacker aesthetics
- Matrix-style green text
- Minimalist design principles

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them with the community!

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Built with tears and lots of ☕** 