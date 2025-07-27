// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 30) {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Subtle fade-in on scroll for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'none';
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.card-section, .hero-section').forEach(section => {
    observer.observe(section);
});
// No playful or bouncy animations

// Highlight nav link on scroll
const sectionIds = Array.from(document.querySelectorAll('main section')).map(s => s.id);
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