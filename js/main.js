/* ============================================================
   SAVOR & SPICE — Main JavaScript
   ============================================================ */

(function () {
    "use strict";

    // ---- DOM Elements ----
    var navbar = document.getElementById("navbar");
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");
    var allNavLinks = document.querySelectorAll(".nav-link");
    var backToTop = document.getElementById("backToTop");
    var contactForm = document.getElementById("contactForm");
    var newsletterForm = document.getElementById("newsletterForm");

    // ---- Mobile Menu Toggle ----
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
            // Update aria-expanded attribute
            var isOpen = navLinks.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isOpen);
        });
    }

    // ---- Close Mobile Menu on Link Click ----
    allNavLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navLinks.classList.contains("active")) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });
    });

    // ---- Close Mobile Menu on Outside Click ----
    document.addEventListener("click", function (e) {
        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }
    });

    // ---- Navbar Scroll Effect ----
    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    // ---- Back to Top Button Visibility ----
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }

    // ---- Scroll Event Listener ----
    window.addEventListener("scroll", function () {
        handleNavbarScroll();
        handleBackToTop();
    });

    // Initial check on load
    handleNavbarScroll();
    handleBackToTop();

    // ---- Back to Top Click ----
    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    // ---- Contact Form Submission ----
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var name = document.getElementById("contactName").value.trim();
            var email = document.getElementById("contactEmail").value.trim();
            var subject = document.getElementById("contactSubject").value;
            var message = document.getElementById("contactMessage").value.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Email format validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Success
            alert(
                "Thank you, " +
                    name +
                    "! Your message has been sent successfully. We'll get back to you within 24 hours."
            );

            // Reset form
            contactForm.reset();
        });
    }

    // ---- Newsletter Form Submission ----
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var emailInput = newsletterForm.querySelector(".newsletter-input");
            var email = emailInput.value.trim();

            // Basic validation
            if (!email) {
                alert("Please enter your email address.");
                return;
            }

            // Email format validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Success
            alert(
                "Welcome to the Savor & Spice family! You've been subscribed successfully. Check your inbox for a welcome email with our top 10 recipes."
            );

            // Reset form
            newsletterForm.reset();
        });
    }

    // ---- Smooth Scroll for All Anchor Links (fallback) ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight;
                var targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // ---- Scroll Reveal Animation (CSS class-based via IntersectionObserver) ----
    var revealSelector =
        ".category-card, .recipe-card, .class-card, .testimonial-card, .about-content, .about-image";

    // Add the fade-in-up class to every revealable element
    document.querySelectorAll(revealSelector).forEach(function (el) {
        el.classList.add("fade-in-up");
    });

    // Use IntersectionObserver to add the "visible" class when elements enter the viewport
    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0, rootMargin: "0px 0px -120px 0px" }
        );

        document.querySelectorAll(revealSelector).forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: make everything visible immediately
        document.querySelectorAll(revealSelector).forEach(function (el) {
            el.classList.add("visible");
        });
    }
})();
