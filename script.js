// Function to open external links
function openExternalLink(url) {
    try {
        window.open(url, '_blank');
    } catch (e) {
        // Fallback for browsers that block window.open
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Add event listeners to social links after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Direct fix for hero social icons
    const heroLinkedIn = document.querySelector('.hero-social a[href*="linkedin"]');
    const heroGithub = document.querySelector('.hero-social a[href*="github"]');
    
    if (heroLinkedIn) {
        heroLinkedIn.onclick = function(e) {
            e.preventDefault();
            window.open('https://www.linkedin.com/in/akshat-bhatnagar-22a11a19b', '_blank');
            return false;
        };
    }
    
    if (heroGithub) {
        heroGithub.onclick = function(e) {
            e.preventDefault();
            window.open('https://github.com/akshat12000', '_blank');
            return false;
        };
    }
    
    // Also add click handlers to the icon elements themselves
    const heroLinkedInIcon = document.querySelector('.hero-social a[href*="linkedin"] i');
    const heroGithubIcon = document.querySelector('.hero-social a[href*="github"] i');
    
    if (heroLinkedInIcon) {
        heroLinkedInIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            window.open('https://www.linkedin.com/in/akshat-bhatnagar-22a11a19b', '_blank');
        });
    }
    
    if (heroGithubIcon) {
        heroGithubIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            window.open('https://github.com/akshat12000', '_blank');
        });
    }
    
    // Add debug click handler to body to check if events are being captured
    document.body.addEventListener('click', function(e) {
        const target = e.target.closest('.hero-social a, .footer-social a');
        if (target) {
            console.log('Social link clicked:', target);
        } else if (e.target.tagName === 'I' && e.target.closest('.hero-social a, .footer-social a')) {
            console.log('Social icon clicked:', e.target);
        }
    });
})

// Mobile menu toggle
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelectorAll('nav ul li a');
const navMenu = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.nav-mobile-toggle')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add shadow and shrink navbar on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
        navbar.style.padding = '0.8rem 2rem';
    } else {
        header.classList.remove('scrolled');
        navbar.style.padding = '1rem 2rem';
    }
});

// Add CSS for scrolled header
document.head.insertAdjacentHTML('beforeend', `
<style>
    header.scrolled {
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        background: rgba(255, 255, 255, 0.98);
    }
    
    body.menu-open {
        overflow: hidden;
    }
</style>
`);

// Enhanced fade-in on scroll for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .card-section, .hero-section {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .card-section.in-view, .hero-section.in-view {
        opacity: 1;
        transform: none;
    }
    
    .card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        transition-delay: calc(var(--card-index, 0) * 0.1s);
    }
    
    .card-section.in-view .card {
        opacity: 1;
        transform: none;
    }
</style>
`);

document.querySelectorAll('.card-section, .hero-section').forEach(section => {
    observer.observe(section);
});

// Add card animation delay based on index
document.querySelectorAll('.card-section').forEach(section => {
    section.querySelectorAll('.card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
});
// No playful or bouncy animations

// Highlight nav link on scroll with smooth transition
const sectionIds = Array.from(document.querySelectorAll('main section')).map(s => s.id);

// Add CSS for active link transition
document.head.insertAdjacentHTML('beforeend', `
<style>
    .nav-links li a::after {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
</style>
`);

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + 120;
    
    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollY) {
            current = id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Optional: Animate floating shapes in background
const bg = document.querySelector('.animated-bg');
if (bg) {
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.width = `${40 + Math.random()*60}px`;
        shape.style.height = shape.style.width;
        shape.style.left = `${Math.random()*90}vw`;
        shape.style.top = `${Math.random()*90}vh`;
        shape.style.background = i%2===0 ? 'rgba(78,168,222,0.18)' : 'rgba(34,34,59,0.13)';
        shape.style.borderRadius = `${60 + Math.random()*40}%`;
        shape.style.position = 'absolute';
        shape.style.zIndex = 0;
        shape.style.animation = `floatShape ${8+Math.random()*8}s ease-in-out infinite alternate`;
        bg.appendChild(shape);
    }
}

// Typewriter effect for About tagline
const typewriterTexts = [
    "Turning ideas into impactful solutions.",
    "Building robust, scalable systems.",
    "Crafting delightful user experiences.",
    "Let's create something amazing!"
];
let twIndex = 0, charIndex = 0, isDeleting = false;
const twElem = document.getElementById('typewriter');
function typewriterTick() {
    if (!twElem) return;
    const fullText = typewriterTexts[twIndex];
    if (isDeleting) {
        twElem.textContent = fullText.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            twIndex = (twIndex + 1) % typewriterTexts.length;
            setTimeout(typewriterTick, 700);
        } else {
            setTimeout(typewriterTick, 30);
        }
    } else {
        twElem.textContent = fullText.substring(0, charIndex++);
        if (charIndex > fullText.length) {
            isDeleting = true;
            setTimeout(typewriterTick, 1200);
        } else {
            setTimeout(typewriterTick, 60);
        }
    }
}
if (twElem) typewriterTick();

// Parallax/tilt effect for skill and achievement cards
function addTiltEffect(selector) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
addTiltEffect('.skill-card');
addTiltEffect('.achievement-card');

// Particle background (very light, subtle)
(function particleBg() {
    const n = 32;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = Array.from({length: n}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1.5 + Math.random() * 2.5,
        dx: -0.2 + Math.random() * 0.4,
        dy: -0.2 + Math.random() * 0.4,
        o: 0.08 + Math.random() * 0.10
    }));
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(0,191,174,${p.o})`;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        }
        requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();
// Project card hover reveal: handled by CSS .project-extra