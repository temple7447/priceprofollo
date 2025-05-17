// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thanks for your message! I\'ll get back to you soon.');
    this.reset();
});

// Scroll reveal animation
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const revealTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if(revealTop < windowHeight - revealPoint) {
            section.classList.add('active');
        }
    });
}

// Typing animation for hero section
const text = "Full Stack Developer";
let index = 0;
const speed = 100;

function typeWriter() {
    if (index < text.length) {
        document.querySelector('.hero h2').textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    document.querySelector('.hero h2').textContent = '';
    setTimeout(typeWriter, 1000);
});

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Skill cards stagger animation
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Project cards stagger animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});
