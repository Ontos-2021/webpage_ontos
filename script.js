// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
        themeToggle.querySelector('i').classList.toggle('fa-sun');
        themeToggle.querySelector('i').classList.toggle('fa-moon');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit');
            const spinner = submitBtn.querySelector('.spinner');
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !validateEmail(email) || !mensaje) {
                alert('Por favor, completa todos los campos correctamente.');
                return;
            }

            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert(`¡Gracias, ${nombre}! Me pondré en contacto contigo pronto.`);
                contactForm.reset();
            } catch (error) {
                alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            } finally {
                submitBtn.disabled = false;
                spinner.style.display = 'none';
            }
        });
    }
});
