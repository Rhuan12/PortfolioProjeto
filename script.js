// Loading Screen
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Modal functionality
function openModal(imgSrc) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Retornaremos em breve.');
        this.reset();
        submitBtn.textContent = 'Enviar Mensagem';
        submitBtn.disabled = false;
    }, 2000);
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Hero parallax
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
    
    // Other parallax sections
    parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const speed = 0.5;
        const yPos = -(rect.top * speed);
        element.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add some interactive effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.service-icon').style.transform = 'scale(1.2)';
        this.querySelector('.service-icon').style.color = '#b8941f';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.service-icon').style.transform = 'scale(1)';
        this.querySelector('.service-icon').style.color = 'var(--accent-color)';
    });
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content p');
        
        if (heroTitle) {
            typeWriter(heroTitle, 'João Silva', 150);
        }
        
        setTimeout(() => {
            if (heroSubtitle) {
                typeWriter(heroSubtitle, 'Fotógrafo Profissional', 100);
            }
        }, 2000);
    }, 1500);
});

// Add counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start < target) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when parallax section is visible
const parallax2 = document.querySelector('.parallax-2');
const parallax2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            if (h3 && !h3.classList.contains('animated')) {
                h3.classList.add('animated');
                // You can add counter animation here if needed
            }
        }
    });
});

if (parallax2) {
    parallax2Observer.observe(parallax2);
}

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--accent-color);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});