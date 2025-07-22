document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const fallbackImage = './assets/default.webp';

    // Unified theme toggling function
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
            try {
                const currentSrc = new URL(spotifyIframe.src);
                currentSrc.searchParams.set('theme', isDark ? '1' : '0');
                spotifyIframe.src = currentSrc.toString();
            } catch (e) {
                console.error("Error updating Spotify iframe theme:", e);
            }
        }

        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    };

    // Theme toggle click handler - single implementation
    themeToggle.addEventListener('click', () => {
        const isDark = body.dataset.theme !== 'dark';
        toggleTheme(isDark);
    });

    themeToggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') themeToggle.click();
    });

    // Mobile menu handler - single implementation
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
        
        mobileMenuToggle.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') mobileMenuToggle.click();
        });
    }

    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('mobile-active');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('mobile-active');
        }
    });

    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => {
            img.src = fallbackImage;
            img.classList.add('default-image');
        });
    });

    // Theme detection and initialization
    const setInitialTheme = () => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            // Force light mode on iOS to avoid known issues
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

    // Listen for system theme changes
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            toggleTheme(e.matches);
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animation with Intersection Observer
    const animatedElements = document.querySelectorAll('.service-item, .portfolio-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animatedElements.forEach(element => observer.observe(element));
    }

    // Email functionality
    const copyEmailButton = document.getElementById('copy-email');
    const footerEmailButton = document.querySelector('.social-email-btn');
    
    if (copyEmailButton) {
        copyEmailButton.addEventListener('click', copyEmail);
    }
    
    if (footerEmailButton) {
        footerEmailButton.addEventListener('click', copyEmail);
    }

    // ======= CARRUSEL DE IMÁGENES DE FONDO =======
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let interval;

    // Función para cambiar de slide
    function goToSlide(index) {
        // Eliminar clase active de todos los slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Ajustar el índice si está fuera de rango
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Activar el slide e indicador correspondiente
        if (slides[index]) slides[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
        currentIndex = index;
    }

    // Iniciar carrusel automático
    function startAutoSlide() {
        if (slides.length > 1) {
            interval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000); // Cambiar cada 5 segundos
        }
    }

    // Detener carrusel automático al interactuar
    function resetAutoSlide() {
        clearInterval(interval);
        startAutoSlide();
    }

    // Configurar botones y eventos si existen
    if (prevBtn && slides.length > 1) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoSlide();
        });
    }

    if (nextBtn && slides.length > 1) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoSlide();
        });
    }

    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // Iniciar carrusel solo si hay slides
    if (slides.length > 0) {
        startAutoSlide();
    }
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
    
    console.log('Form submitted:', { name, email, message });
    
    event.target.reset();
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
    return false;
}

function copyEmail() {
    const email = "josemercado.musica@gmail.com";
    navigator.clipboard.writeText(email)
        .then(() => {
            alert("Email copiado al portapapeles!");
        })
        .catch(err => {
            console.error("Error al copiar el email: ", err);
        });
}
