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

    // Mejorar la transición del tema
    const toggleTheme = (isDark) => {
        // Agregar clase de transición
        document.documentElement.classList.add('theme-transition');
        
        // Cambiar tema
        body.dataset.theme = isDark ? 'dark' : '';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Toggle del icono
        const icon = themeToggle.querySelector('i');
        icon.classList.replace(
            isDark ? 'fa-moon' : 'fa-sun',
            isDark ? 'fa-sun' : 'fa-moon'
        );

        // Remover clase de transición después de la animación
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };

    // Reemplazar el listener existente del tema
    themeToggle.addEventListener('click', () => {
        const isDark = body.dataset.theme !== 'dark';
        toggleTheme(isDark);
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
