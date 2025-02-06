document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Guardar preferencia del usuario en localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.dataset.theme = 'dark';
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.dataset.theme === 'dark';
        body.dataset.theme = isDark ? '' : 'dark';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        themeToggle.querySelector('i').classList.toggle('fa-sun');
        themeToggle.querySelector('i').classList.toggle('fa-moon');
    });

    themeToggle.addEventListener('keypress', (e) => {
        if (e.key === "Enter") themeToggle.click();
    });

    // Nuevo: listener para el menú móvil
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });

    mobileMenuToggle.addEventListener('keypress', (e) => {
        if (e.key === "Enter") mobileMenuToggle.click();
    });

    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-active');
            }
        });
    });

    // Cerrar menú móvil al redimensionar la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
        }
    });

    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        form.querySelector('.btn-submit').disabled = true;
        setTimeout(() => {
            alert(`¡Gracias, ${nombre}! Me pondré en contacto contigo pronto.`);
            form.reset();
            form.querySelector('.btn-submit').disabled = false;
        }, 1000);
    });
});
