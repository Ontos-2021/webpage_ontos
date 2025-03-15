document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const fallbackImage = './assets/default.webp'; // Ruta de la imagen de respaldo

    // Eliminar duplicación: quitamos la verificación inicial y dejamos que setInitialTheme() la maneje

    const toggleTheme = (isDark) => {
        document.documentElement.classList.add('theme-transition');
        
        body.dataset.theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        // Actualizar color del iframe de Spotify
        const spotifyIframe = document.querySelector('.spotify-embed iframe');
        if (spotifyIframe) {
            const currentSrc = new URL(spotifyIframe.src);
            currentSrc.searchParams.set('theme', isDark ? '1' : '0');
            spotifyIframe.src = currentSrc.toString();
        }

        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };

    themeToggle.addEventListener('click', () => {
        const isDark = body.dataset.theme !== 'dark';
        toggleTheme(isDark);
    });

    themeToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') themeToggle.click();
    });

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });

    mobileMenuToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') mobileMenuToggle.click();
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-active');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
        }
    });

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = fallbackImage;
            img.classList.add('default-image');
        });
    });

    // Detectar preferencia del sistema y establecer tema inicial
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const setInitialTheme = () => {
        if (isIOS()) {
            // Forzar modo light en iOS para evitar problemas conocidos
            body.dataset.theme = 'light';
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            return;
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.dataset.theme = savedTheme;
            if (savedTheme === 'dark') {
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
        } else if (prefersDarkScheme.matches) {
            body.dataset.theme = 'dark';
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.dataset.theme = 'light';
            localStorage.setItem('theme', 'light');
        }
    };

    setInitialTheme();

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            toggleTheme(e.matches);
        }
    });

    // Add navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add intersection observer for animations
    const animatedElements = document.querySelectorAll('.service-item, .portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    animatedElements.forEach(element => observer.observe(element));
});

function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Por favor complete todos los campos');
        return false;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Clear form
    event.target.reset();
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
    return false;
}
