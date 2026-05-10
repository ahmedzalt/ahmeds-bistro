document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");
    const authBtn = document.getElementById("auth-btn");

    // --- Theme toggle logic ---
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

    // --- Authentication and UI state logic ---
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isLoginPage = window.location.pathname.includes("login.html");
    const isSignupPage = window.location.pathname.includes("signup.html");

    // Update Auth button based on login status
    if (authBtn) {
        if (isLoggedIn) {
            authBtn.textContent = "Logout";
            authBtn.addEventListener("click", () => {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "index.html"; // Refresh to guest state
            });
        } else {
            authBtn.textContent = "Login";
            authBtn.addEventListener("click", () => {
                window.location.href = "login.html";
            });
        }
    }

    // Redirect to home if already logged in and trying to access auth pages
    if (isLoggedIn && (isLoginPage || isSignupPage)) {
        window.location.href = "index.html";
    }

    // --- Login form logic (Support for Username or Email) ---
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const identifier = document.getElementById("username").value.trim(); 
            const pass = document.getElementById("password").value.trim();
            const errorMsg = document.getElementById("login-error");

            if (identifier === "" || pass === "") {
                errorMsg.textContent = "Fields cannot be empty.";
                errorMsg.style.display = "block";
                return;
            }

            // 1. Check for Admin credentials
            if (identifier === "admin" && pass === "1234") {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
                return;
            }

            // 2. Search for the user in localStorage
            let foundUser = null;
            const directMatch = localStorage.getItem("user_" + identifier);
            
            if (directMatch) {
                foundUser = JSON.parse(directMatch); // Found by username
            } else {
                // Search by email
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith("user_")) {
                        const data = JSON.parse(localStorage.getItem(key));
                        if (data.email === identifier) {
                            foundUser = data;
                            break;
                        }
                    }
                }
            }

            // 3. Validate credentials
            if (foundUser && foundUser.password === pass) {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
            } else {
                errorMsg.textContent = "Invalid username/email or password.";
                errorMsg.style.display = "block";
            }
        });
    }

    // --- Signup form logic (With Unique Username & Email Validation) ---
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = document.getElementById("new-username").value.trim();
            const email = document.getElementById("new-email").value.trim();
            const pass = document.getElementById("new-password").value.trim();
            const confirmPass = document.getElementById("confirm-password").value.trim();
            const errorMsg = document.getElementById("signup-error");
            const successMsg = document.getElementById("signup-success");

            errorMsg.style.display = "none";
            successMsg.style.display = "none";

            // 1. Check if passwords match
            if (pass !== confirmPass) {
                errorMsg.textContent = "Passwords do not match!";
                errorMsg.style.display = "block";
                return; // Stop execution
            }

            // 2. Check if username already exists
            if (localStorage.getItem("user_" + user)) {
                errorMsg.textContent = "Username is already taken. Please choose another.";
                errorMsg.style.display = "block";
                return; // Stop execution
            }

            // 3. Check if email already exists
            let emailExists = false;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("user_")) {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data.email === email) {
                        emailExists = true;
                        break;
                    }
                }
            }

            if (emailExists) {
                errorMsg.textContent = "Email is already registered. Please login or use a different email.";
                errorMsg.style.display = "block";
                return; // Stop execution
            }

            // 4. If everything is valid, create the account
            const userData = { username: user, password: pass, email: email };
            localStorage.setItem("user_" + user, JSON.stringify(userData));
            
            successMsg.textContent = "Account created successfully! Redirecting to login...";
            successMsg.style.display = "block";
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }

    // --- Live clock logic ---
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString();
        }, 1000);
    }

    // --- Hero image slider ---
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 4000);
    }

    // --- Menu filtering logic ---
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
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    // --- Contact form validation ---
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
                errorMsg.textContent = "Invalid email format.";
                errorMsg.style.display = "block";
            } else {
                successMsg.textContent = "Message sent successfully!";
                successMsg.style.display = "block";
                contactForm.reset();
            }
        });
    }

    // --- Scroll reveal animations ---
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});