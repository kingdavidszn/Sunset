// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }
    
    // Hero Section Animations - Moved here to ensure they run after page load
    const heroTitle = document.querySelector('.hero-content h1');
    const heroDesc = document.querySelector('.hero-content p');
    const ctaButton = document.querySelector('.cta-button');
    
    if (heroTitle) gsap.to(heroTitle, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    if (heroDesc) gsap.to(heroDesc, { opacity: 1, y: 0, duration: 1, delay: 0.8 });
    if (ctaButton) gsap.to(ctaButton, { opacity: 1, y: 0, duration: 1, delay: 1.1 });
    
    // Call animate on scroll for initial animations
    animateOnScroll();
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Add hover-zoom class to all images
document.querySelectorAll('img').forEach(img => {
    img.parentElement.classList.add('hover-zoom');
});

// Enhanced Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message sent successfully!';
            form.appendChild(successMessage);
            
            // Animate success message
            gsap.fromTo(successMessage, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                gsap.to(successMessage, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => successMessage.remove()
                });
                form.reset();
            }, 3000);
        }
    });
});

// Enhanced Room Card Interactions
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Parallax Effect for Hero Sections
document.querySelectorAll('.hero').forEach(hero => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Add loading animation to all pages
if (!document.querySelector('.loader-wrapper')) {
    document.body.insertAdjacentHTML('afterbegin', `
        <div class="loader-wrapper">
            <div class="loader"></div>
        </div>
    `);
}

// Feature Cards Animation
gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2
    });
});

// Room Cards Animation
gsap.utils.toArray('.room-card').forEach((card, i) => {
    // Make sure cards are visible immediately
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        onComplete: () => {
            // Ensure card is visible after animation
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Contact Form Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    gsap.from(contactForm, {
        scrollTrigger: {
            trigger: contactForm,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
}

// Footer Animation
gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1
});

// Room Card Hover Effect
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Feature Card Hover Effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Form Submission Animation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate the button
        gsap.to(form.querySelector('button'), {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Add success message animation
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Message sent successfully!';
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '1rem';
        successMessage.style.opacity = '0';
        
        form.appendChild(successMessage);
        
        gsap.to(successMessage, {
            opacity: 1,
            duration: 0.5
        });

        // Clear form after animation
        setTimeout(() => {
            form.reset();
            gsap.to(successMessage, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => successMessage.remove()
            });
        }, 2000);
    });
}

// Booking Form Modal
const createBookingModal = () => {
    // Check if modal already exists
    if (document.querySelector('.booking-modal')) return document.querySelector('.booking-modal');
    
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="booking-form-container">
            <span class="close-modal"><i class="fas fa-times"></i></span>
            <form class="booking-form">
                <h2>Book Your Stay</h2>
                <div class="form-row">
                    <div class="form-group">
                        <label for="check-in">Check-in Date</label>
                        <input type="date" id="check-in" required>
                    </div>
                    <div class="form-group">
                        <label for="check-out">Check-out Date</label>
                        <input type="date" id="check-out" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="guests">Number of Guests</label>
                        <select id="guests" required>
                            <option value="">Select guests</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="room-type">Room Type</label>
                        <select id="room-type" required>
                            <option value="">Select room type</option>
                            <option value="deluxe">Deluxe Room</option>
                            <option value="suite">Executive Suite</option>
                            <option value="presidential">Presidential Suite</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="special-requests">Special Requests</label>
                    <textarea id="special-requests" rows="3"></textarea>
                </div>
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};

// Initialize booking modal
const bookingModal = createBookingModal();
const bookNowButtons = document.querySelectorAll('.book-now button, .room-info button');
const closeModal = document.querySelector('.close-modal');
const bookingForm = document.querySelector('.booking-form');

// Open modal
if (bookNowButtons && bookingModal) {
    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close modal
if (closeModal && bookingModal) {
    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Handle form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate button
        const button = bookingForm.querySelector('button');
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Booking request sent successfully!';
        bookingForm.appendChild(successMessage);

        // Animate success message
        gsap.fromTo(successMessage, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
        );

        // Close modal and reset form after delay
        setTimeout(() => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
            bookingForm.reset();
            successMessage.remove();
        }, 2000);
    });
}

// Set minimum date for check-in and check-out
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

if (checkInInput && checkOutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    checkInInput.addEventListener('change', () => {
        checkOutInput.min = checkInInput.value;
        if (checkOutInput.value && checkOutInput.value < checkInInput.value) {
            checkOutInput.value = checkInInput.value;
        }
    });
}