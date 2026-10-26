// ===========================
// Smooth Scroll Behavior
// ===========================

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

// ===========================
// Navigation Styling on Scroll
// ===========================

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

function updateActiveNavLink() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
}

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-card')) {
                const levelBar = entry.target.querySelector('.level-bar');
                if (levelBar) {
                    levelBar.style.animation = 'fillBar 1.5s ease-out forwards';
                }
            }
            
            // Animate project cards
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// ===========================
// Add slideInUp animation to CSS dynamically
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Contact Card Interactions
// ===========================

const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Button Ripple Effect
// ===========================

function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple style
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', addRippleEffect);
});

// ===========================
// Skill Card Hover Animation
// ===========================

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.skill-icon');
        icon.style.transform = 'scale(1.2) rotateZ(10deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.skill-icon');
        icon.style.transform = 'scale(1) rotateZ(0)';
    });
});

// ===========================
// Project Card Hover Effect & Interactions
// ===========================

document.querySelectorAll('.project-card').forEach(card => {
    const projectImage = card.querySelector('.project-image');
    const projectContent = card.querySelector('.project-content');
    
    // Enhanced hover effect
    card.addEventListener('mouseenter', () => {
        projectImage.style.transform = 'scale(1.05) translateY(-2px)';
        projectImage.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        projectImage.style.transform = 'scale(1)';
        projectImage.style.opacity = '1';
    });
    
    // Smooth reveal of buttons
    const buttons = card.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        btn.style.opacity = '1';
        btn.style.transition = `all 0.3s ease ${index * 0.1}s`;
    });
});

// Add smooth transitions to project elements
const projectTransitionStyle = document.createElement('style');
projectTransitionStyle.textContent = `
    .project-image {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-content {
        transition: all 0.3s ease;
    }
    
    .tool-tag {
        transition: all 0.3s ease;
    }
    
    .tool-tag:hover {
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
    
    .btn-github:hover i {
        transform: rotate(360deg);
    }
    
    .btn-github i {
        transition: transform 0.5s ease;
    }
`;
document.head.appendChild(projectTransitionStyle);

// Enhanced smooth scroll with project focus
const originalAnchorLinks = document.querySelectorAll('a[href^="#"]');
originalAnchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#projects') {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Highlight projects section
                setTimeout(() => {
                    const cards = projectsSection.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = 'projectHighlight 0.6s ease-out';
                        }, index * 150);
                    });
                }, 600);
            }
        }
    });
});

// Add project highlight animation
const projectHighlightStyle = document.createElement('style');
projectHighlightStyle.textContent = `
    @keyframes projectHighlight {
        0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
        }
    }
`;
document.head.appendChild(projectHighlightStyle);

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ===========================
// Scroll to Top Button (Optional Enhancement)
// ===========================

const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopButton.addEventListener('mouseenter', () => {
    scrollToTopButton.style.transform = 'scale(1.1)';
});

scrollToTopButton.addEventListener('mouseleave', () => {
    scrollToTopButton.style.transform = 'scale(1)';
});

// ===========================
// Counter Animation for Stats
// ===========================

const animateCounter = (element, target, duration = 1500) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Trigger counter animation when stat cards are visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            if (statNumber && statNumber.textContent !== '∞') {
                const target = parseInt(statNumber.textContent);
                if (!isNaN(target)) {
                    animateCounter(statNumber, target);
                }
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ===========================
// Print Friendly Styles
// ===========================

window.addEventListener('beforeprint', () => {
    document.body.style.background = 'white';
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any potential modals or dropdowns if implemented
        console.log('Escape pressed');
    }
});

// ===========================
// Console Message
// ===========================

console.log('%c👋 Welcome to Data Analyst Portfolio!', 'font-size: 16px; font-weight: bold; color: #2563eb;');
console.log('%cFeel free to explore the code and reach out for collaboration!', 'font-size: 12px; color: #64748b;');


// ===========================
// Certificate Links Handling for Local & Deployed Environments
// ===========================
if (window.location.protocol === 'file:') {
    document.querySelectorAll('a[href^="/certificates/"]').forEach(link => {
        link.setAttribute('href', link.getAttribute('href').substring(1));
    });
}
