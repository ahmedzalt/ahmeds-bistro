# 🍽️ Ahmed's Bistro - Front-End Web Application

## 📌 Project Overview
**Ahmed's Bistro** is a modern, fully responsive restaurant website built entirely from scratch using native web technologies (**HTML5, CSS3, and Vanilla JavaScript**). No external frameworks or libraries were used. 

This project was developed as a final requirement for the Web Development course (Software Engineering - Sinai University) and showcases advanced front-end concepts, DOM manipulation, and interactive user interfaces.

🔗 **Live Demo:** [View Website Here](https://ahmedzalt.github.io/ahmeds-bistro/)

---

## ✨ Key Features
* **🌓 Theme Toggling:** Seamless transition between Dark and Light modes, with user preference saved securely in the browser's `localStorage`.
* **🔐 User Authentication:** A simulated frontend authentication system. Users can create new accounts (Sign Up) and log in. User credentials and duplicate email/username validations are handled dynamically via `localStorage`.
* **🍔 Dynamic Menu Filtering:** A fully functional menu page where items can be filtered by category (Pizza, Burgers, Desserts, Drinks) using JavaScript events.
* **🕰️ Real-Time Interactivity:** Features an auto-playing image slider in the hero section and a live digital clock.
* **✅ Form Validation:** Strict client-side validation for both the contact form and authentication forms to ensure accurate data entry (e.g., matching passwords, valid email formats).
* **✨ Animations:** Smooth scroll-reveal animations implemented using the modern `IntersectionObserver` API to enhance user experience.
* **📱 Fully Responsive:** The layout adapts beautifully to all screen sizes (Mobile, Tablet, and Desktop) using CSS Flexbox, Grid, and Media Queries.

---

## 🛠️ Technologies Used
* **HTML5:** Semantic structuring of web pages.
* **CSS3:** Custom styling, CSS variables for theming, Grid/Flexbox layouts, and keyframe animations.
* **JavaScript (ES6+):** Logic for routing protection, DOM manipulation, events, and `localStorage` management.

---

## 📂 Project Structure
```text
├── css/
│   └── style.css       # Core styling and theme variables
├── images/             # Project assets and food photography
├── js/
│   └── script.js       # Main logic (Auth, slider, filters, animations)
├── index.html          # Landing page
├── menu.html           # Dynamic food menu
├── about.html          # Our story and restaurant details
├── contact.html        # Contact form with validation
├── login.html          # User login interface
└── signup.html         # Account creation interface
