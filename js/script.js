// Wait for the HTML document to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Live Clock Logic ---
    // Updates the time display every 1 second (1000 milliseconds)
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        setInterval(() => {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString();
        }, 1000);
    }

    // --- 2. Authentication State Logic ---
    // Checks if the user is already logged in using the browser's localStorage
    const authBtn = document.getElementById("auth-btn");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (authBtn) {
        if (isLoggedIn) {
            // If the user is logged in, show "Logout"
            authBtn.textContent = "Logout";
            authBtn.addEventListener("click", () => {
                localStorage.removeItem("isLoggedIn"); // Delete session
                window.location.href = "index.html";   // Redirect to Home
            });
        } else {
            // If the user is a guest, show "Login"
            authBtn.textContent = "Login";
            authBtn.addEventListener("click", () => {
                window.location.href = "login.html";  // Redirect to Login page
            });
        }
    }

    // Prevent logged-in users from going back to the login page
    if (isLoggedIn && window.location.pathname.includes("login.html")) {
        window.location.href = "index.html";
    }

    // --- 3. Login Form Validation ---
    // Validates static admin credentials (Username: admin | Password: 1234)
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page from refreshing
            
            const user = document.getElementById("username").value.trim();
            const pass = document.getElementById("password").value.trim();
            const errorMsg = document.getElementById("login-error");

            // Check if credentials are correct
            if (user === "admin" && pass === "1234") {
                localStorage.setItem("isLoggedIn", "true"); // Save login session
                window.location.href = "index.html";        // Go to Home
            } else {
                errorMsg.textContent = "Invalid username or password!";
                errorMsg.style.display = "block";           // Show error message
            }
        });
    }

    // --- 4. Menu Filtering Logic ---
    // Filters food items based on the clicked category button
    const filterBtns = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-card");

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const filterValue = btn.getAttribute("data-filter");

                menuItems.forEach(item => {
                    // Show the item if it matches the filter, or if "all" is selected
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    // --- 5. Contact Form Validation ---
    // Shows a success message when the user sends a message
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page from refreshing
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset(); // Clear the form fields
        });
    }
});