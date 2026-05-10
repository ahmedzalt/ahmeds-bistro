document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");
    const logoutBtn = document.getElementById("logout-btn");

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if(themeBtn) themeBtn.textContent = "☀️ Light";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                themeBtn.textContent = "☀️ Light";
            } else {
                localStorage.setItem("theme", "light");
                themeBtn.textContent = "🌙 Dark";
            }
        });
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isLoginPage = window.location.pathname.includes("login.html");

    if (!isLoggedIn && !isLoginPage) {
        window.location.href = "login.html";
    }
    
    if (isLoggedIn && isLoginPage) {
        window.location.href = "index.html";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "login.html";
        });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = document.getElementById("username").value.trim();
            const pass = document.getElementById("password").value.trim();
            const errorMsg = document.getElementById("login-error");

            if (user === "" || pass === "") {
                errorMsg.textContent = "Fields cannot be empty.";
                errorMsg.style.display = "block";
            } else if (user === "admin" && pass === "1234") {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
            } else {
                errorMsg.textContent = "Wrong username or password.";
                errorMsg.style.display = "block";
            }
        });
    }

    const clockElement = document.getElementById("clock");
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString();
        }, 1000);
    }

    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000);
    }

    const filterBtns = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-card");

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                menuItems.forEach(item => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.style.display = "block";
                        item.style.animation = "fadeIn 0.5s ease"; 
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const message = document.getElementById("contact-msg").value.trim();
            const errorMsg = document.getElementById("contact-error");
            const successMsg = document.getElementById("contact-success");

            errorMsg.style.display = "none";
            successMsg.style.display = "none";

            if (name === "" || email === "" || message === "") {
                errorMsg.textContent = "All fields are required.";
                errorMsg.style.display = "block";
            } else if (!email.includes("@")) {
                errorMsg.textContent = "Please enter a valid email address.";
                errorMsg.style.display = "block";
            } else {
                successMsg.textContent = "Message sent successfully!";
                successMsg.style.display = "block";
                contactForm.reset();
            }
        });
    }

    const reveals = document.querySelectorAll(".reveal");
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});

