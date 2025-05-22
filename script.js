import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Album hover effect with GSAP
    const albums = document.querySelectorAll('.album');
    
    albums.forEach(album => {
        album.addEventListener('mouseenter', () => {
            gsap.to(album, {
                y: -10,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                duration: 0.3
            });
            
            const albumCover = album.querySelector('.album-cover img');
            gsap.to(albumCover, {
                scale: 1.05,
                duration: 0.5
            });
        });
        
        album.addEventListener('mouseleave', () => {
            gsap.to(album, {
                y: 0,
                boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                duration: 0.3
            });
            
            const albumCover = album.querySelector('.album-cover img');
            gsap.to(albumCover, {
                scale: 1,
                duration: 0.5
            });
        });
    });
    
    // Tour date hover effect
    const tourDates = document.querySelectorAll('.tour-date');
    
    tourDates.forEach(date => {
        date.addEventListener('mouseenter', () => {
            if (!date.querySelector('.sold-out')) {
                gsap.to(date, {
                    x: 5,
                    duration: 0.3
                });
            }
        });
        
        date.addEventListener('mouseleave', () => {
            gsap.to(date, {
                x: 0,
                duration: 0.3
            });
        });
    });
    
    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
            });
            
            if (isValid) {
                // For demo purposes, just reset the form
                contactForm.reset();
                alert('Thanks for your message! We\'ll get back to you soon.');
            }
        });
    }
    
    // Animate elements on scroll with GSAP
    function animateOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const elements = section.querySelectorAll('h2, .about-content, .albums, .tour-dates, .contact-content');
            
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    // Initialize animations if ScrollTrigger is available
    if (typeof gsap.registerPlugin === 'function') {
        try {
            // If you want to use ScrollTrigger, add it to the import map
            // and uncomment the line below
            // gsap.registerPlugin(ScrollTrigger);
            // animateOnScroll();
            
            // For now, we'll just do a simple animation on load
            gsap.from('.hero-content', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5
            });
        } catch (error) {
            console.warn('GSAP ScrollTrigger not available');
        }
    }
});

