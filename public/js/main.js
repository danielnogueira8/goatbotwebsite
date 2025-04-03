document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            header.classList.remove('transparent');
        } else {
            header.classList.add('transparent');
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Initial check for page load
    handleScroll();

    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && !event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });

    // Handle FAQ accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                const activeIcon = currentlyActive.querySelector('.accordion-icon');
                if (activeIcon) {
                    activeIcon.textContent = '+';
                }
            }
            
            item.classList.toggle('active');
            
            // Update icon
            const icon = item.querySelector('.accordion-icon');
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '−' : '+';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - header.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Products and features cards hover effects
    const productCards = document.querySelectorAll('.product-card');
    const featureCards = document.querySelectorAll('.feature-card');
    
    function addHoverEffect(cards) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow)';
            });
        });
    }
    
    addHoverEffect(productCards);
    addHoverEffect(featureCards);

    // Wait list form validation
    const waitlistForm = document.getElementById('waitlist-form');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('email');
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(emailValue)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                emailInput.focus();
            } else {
                // Add success animation
                const button = this.querySelector('button');
                if (button) {
                    button.innerHTML = '<i class="fas fa-check"></i> Submitted';
                    button.style.backgroundColor = 'var(--secondary-color)';
                }
            }
        });
    }

    // Check for waitlist success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('waitlist') === 'success') {
        const messageEl = document.createElement('div');
        messageEl.className = 'success-message';
        messageEl.innerHTML = '<p>Thank you for joining our waitlist! We will contact you soon.</p>';
        messageEl.style.position = 'fixed';
        messageEl.style.top = '100px';
        messageEl.style.left = '50%';
        messageEl.style.transform = 'translateX(-50%)';
        messageEl.style.padding = '16px 24px';
        messageEl.style.backgroundColor = 'var(--secondary-color)';
        messageEl.style.color = 'white';
        messageEl.style.borderRadius = '12px';
        messageEl.style.boxShadow = 'var(--shadow)';
        messageEl.style.zIndex = '9999';
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 500);
        }, 5000);
    }

    // Menu toggle animation
    if (menuToggle) {
        const spans = menuToggle.querySelectorAll('span');
        
        menuToggle.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}); 