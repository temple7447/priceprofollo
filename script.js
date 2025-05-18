// Animation Controller Class
class AnimationController {
    constructor() {
        this.initIntersectionObserver();
        this.initTypeWriter();
        this.initScrollAnimations();
        this.initCursorEffect();
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        document.querySelectorAll('section, .skill-card, .project-card').forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    initTypeWriter() {
        const phrases = [
            "Frontend Developer",
            "UI Enthusiast",
            "Web Designer"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deleteSpeed = 50;
        const pauseEnd = 2000;

        const type = () => {
            const current = phrases[phraseIndex];
            const target = document.querySelector('.hero h2');

            if (isDeleting) {
                target.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                target.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === current.length) {
                setTimeout(() => isDeleting = true, pauseEnd);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
        };

        type();
    }

    initScrollAnimations() {
        let lastScroll = 0;
        const nav = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            nav.classList.toggle('nav-hidden', currentScroll > lastScroll && currentScroll > 100);
            lastScroll = currentScroll;
        }, { passive: true });
    }

    initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }
}

// Form Controller Class
class FormController {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.initFormValidation();
    }

    initFormValidation() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                await this.handleSubmit();
            }
        });

        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
        });
    }

    validateInput(input) {
        const isValid = input.checkValidity();
        input.classList.toggle('invalid', !isValid);
        return isValid;
    }

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(input => {
            if (!this.validateInput(input)) isValid = false;
        });
        return isValid;
    }

    async handleSubmit() {
        const submitBtn = this.form.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            this.showSuccess();
        } catch (error) {
            this.showError();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }

    showSuccess() {
        this.showToast('Message sent successfully!', 'success');
        this.form.reset();
    }

    showError() {
        this.showToast('Failed to send message. Please try again.', 'error');
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
}

// Mobile Navigation Handler
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking nav items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Hide nav bar on scroll down, show on scroll up
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('nav');
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Add active state to nav items based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new FormController();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
