document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Expandable testimonials functionality
    document.querySelectorAll('.expandable-testimonial').forEach(testimonial => {
        testimonial.addEventListener('click', function() {
            const summary = this.querySelector('.testimonial-summary');
            const full = this.querySelector('.testimonial-full');

            if (full.style.display === 'none') {
                summary.style.display = 'none';
                full.style.display = 'block';
                this.classList.add('expanded');
            } else {
                summary.style.display = 'block';
                full.style.display = 'none';
                this.classList.remove('expanded');
            }
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector('button[title="Back to Top"]');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';

            // Scrollspy logic
            handleScrollSpy();
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dark mode toggle functionality
    const toggleBtn = document.getElementById("theme-icon");
    const darkToggle = document.getElementById("dark-toggle");

    if (toggleBtn && darkToggle) {
        // Always default to light mode on load
        document.body.classList.remove('dark');
        toggleBtn.classList.add('bi-moon-fill');
        toggleBtn.classList.remove('bi-sun-fill');

        // Only toggle dark mode when user clicks
        darkToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            toggleBtn.classList.toggle('bi-moon-fill', !isDark);
            toggleBtn.classList.toggle('bi-sun-fill', isDark);
            localStorage.setItem('darkMode', isDark);
        });
    }
});

// Handle scrollspy functionality
function handleScrollSpy() {
    const sections = document.querySelectorAll('section');
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const id = section.getAttribute('id');
        const link = document.querySelector(`nav a[href='#${id}']`);
        if (!link) return;

        const offsetTop = section.offsetTop - 80;
        const offsetBottom = offsetTop + section.offsetHeight;

        if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            link.classList.add('fw-bold');
        } else {
            link.classList.remove('fw-bold');
        }
    });
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    body.classList.toggle('dark');
    icon.classList.toggle('bi-moon-fill');
    icon.classList.toggle('bi-sun-fill');

    // Save preference to localStorage
    const isDarkMode = body.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode);
}

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
