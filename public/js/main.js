document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 200;
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Store section elements for scroll spy
    const sections = {};
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Populate sections object
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        if (sectionId !== '#') {
            const section = document.querySelector(sectionId);
            if (section) {
                sections[sectionId] = section.offsetTop;
            }
        }
    });

    // Documentation page navigation
    const docNavLinks = document.querySelectorAll('.doc-nav ul li a[href^="#"]');
    const docSections = {};
    
    // Populate doc sections object
    docNavLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        if (sectionId !== '#') {
            const section = document.querySelector(sectionId);
            if (section) {
                docSections[sectionId] = section.offsetTop;
            }
        }
    });

    function handleScroll() {
        // Update header class
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
            header.classList.remove('transparent');
        } else {
            header.classList.add('transparent');
            header.classList.remove('scrolled');
        }
        
        // Update progress bar
        const scrollPosition = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
        
        // Update active nav link - only when scrolled past hero section
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        const currentPosition = window.scrollY + header.offsetHeight + 50;
        
        // First remove all active classes if we're in the hero section
        if (window.scrollY < heroHeight - 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
        } else {
            // Only apply active classes when scrolled past hero
            for (const section in sections) {
                const sectionElement = document.querySelector(section);
                if (sectionElement) {
                    const sectionTop = sectionElement.offsetTop;
                    const sectionBottom = sectionTop + sectionElement.offsetHeight;
                    
                    if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === section) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            }
        }
        
        // Documentation page scroll spy
        if (docNavLinks.length > 0) {
            // Determine which section is currently in view
            let currentSection = null;
            const buffer = 150; // Buffer to highlight sections a bit earlier
            
            for (const sectionId in docSections) {
                const section = document.querySelector(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop - buffer;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }
            
            // Update active class on doc navigation links
            if (currentSection) {
                docNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === currentSection) {
                        link.classList.add('active');
                    }
                });
            }
        }
    }

    // Setup smooth scrolling for all anchor links including doc nav links
    function setupSmoothScrolling(links) {
        links.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (menuToggle && menuToggle.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        navLinksContainer.classList.remove('active');
                    }

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - header.offsetHeight - 20,
                            behavior: 'smooth'
                        });
                        
                        // Update active class for appropriate link type
                        if (this.closest('.doc-nav')) {
                            docNavLinks.forEach(link => link.classList.remove('active'));
                        } else {
                            navLinks.forEach(link => link.classList.remove('active'));
                        }
                        this.classList.add('active');
                    }
                }
            });
        });
    }

    // Setup all smooth scrolling
    setupSmoothScrolling(document.querySelectorAll('a[href^="#"]'));

    window.addEventListener('scroll', handleScroll);
    // Initial check for page load
    handleScroll();

    // Handle mobile menu toggle
    if (menuToggle) {
        const spans = menuToggle.querySelectorAll('span');
        
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinksContainer && navLinksContainer.classList.contains('active') && !event.target.closest('.navbar')) {
            navLinksContainer.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
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

    // Enhanced hover effects for cards with more subtle animations
    const productCards = document.querySelectorAll('.product-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const steps = document.querySelectorAll('.step');
    
    function addHoverEffect(elements) {
        elements.forEach((element, index) => {
            // Create shine effect element with more subtle gradient
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            shine.style.position = 'absolute';
            shine.style.top = '0';
            shine.style.left = '0';
            shine.style.width = '100%';
            shine.style.height = '100%';
            shine.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 70%, rgba(255,255,255,0) 100%)';
            shine.style.transform = 'translateX(-100%)';
            shine.style.transition = 'transform 0s ease';
            shine.style.pointerEvents = 'none';
            shine.style.zIndex = '1';
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(shine);
            
            // Store the original transition value to avoid conflicts
            const originalTransition = element.style.transition || '';
            
            // Common effect functions to reduce duplication
            function applyEnterEffect(el, isEven) {
                const translateY = isEven ? -6 : -5;
                const scale = isEven ? 1.01 : 1.008;
                const rotate = (Math.random() * 0.4 - 0.2) * 0.5; // Very subtle random rotation
                el.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
                el.style.boxShadow = isEven ? 
                    '0 12px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(58, 123, 213, 0.05)' : 
                    '0 12px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(140, 152, 164, 0.05)';
                
                // Update element components
                const icon = el.querySelector('.card-icon, .feature-icon, .step-number');
                if (icon) {
                    icon.style.transform = 'scale(1.05) translateY(-2px)';
                    if (isEven) {
                        icon.style.background = 'var(--premium-blue-gradient)';
                        icon.style.color = 'white';
                    } else {
                        icon.style.background = 'var(--premium-silver-gradient)';
                        icon.style.color = 'var(--premium-blue-dark)';
                    }
                    icon.style.boxShadow = isEven ? 
                        '0 8px 15px rgba(58, 123, 213, 0.2), 0 0 10px rgba(58, 123, 213, 0.1)' : 
                        '0 8px 15px rgba(140, 152, 164, 0.2), 0 0 10px rgba(140, 152, 164, 0.1)';
                }
                
                const title = el.querySelector('h3');
                if (title) {
                    title.style.transform = 'translateY(-2px)';
                    title.style.color = 'white';
                }
                
                const text = el.querySelector('p');
                if (text) {
                    text.style.color = 'var(--premium-silver-light)';
                }
            }
            
            function applyLeaveEffect(el) {
                // Reset all transformations with a slightly longer transition
                el.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
                el.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                el.style.boxShadow = 'var(--shadow)';
                
                // Reset element components
                const icon = el.querySelector('.card-icon, .feature-icon, .step-number');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.background = '';
                    icon.style.color = '';
                    icon.style.boxShadow = '';
                }
                
                const title = el.querySelector('h3');
                if (title) {
                    title.style.transform = '';
                    title.style.color = '';
                }
                
                const text = el.querySelector('p');
                if (text) {
                    text.style.color = '';
                }
            }
            
            element.addEventListener('mouseenter', function(e) {
                const isEven = index % 2 === 0;
                applyEnterEffect(this, isEven);
                
                // Subtle shine effect animation
                setTimeout(() => {
                    shine.style.transition = 'transform 0.8s ease';
                    shine.style.transform = 'translateX(100%)';
                }, 50);
            });
            
            element.addEventListener('mouseleave', function() {
                applyLeaveEffect(this);
                
                // Reset shine effect
                shine.style.transition = 'transform 0s ease';
                shine.style.transform = 'translateX(-100%)';
                
                // Reset the transition to original after animation completes
                setTimeout(() => {
                    this.style.transition = originalTransition;
                }, 400);
            });
            
            // Subtle 3D effect on mouse move - using requestAnimationFrame for better performance
            let ticking = false;
            element.addEventListener('mousemove', function(e) {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const rect = this.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        // Calculate rotation based on mouse position
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        // Max rotation in degrees (very subtle)
                        const maxRotate = 0.7;
                        
                        // Calculate rotation angles based on mouse position relative to center
                        const rotateY = maxRotate * (x - centerX) / centerX;
                        const rotateX = -maxRotate * (y - centerY) / centerY;
                        
                        // Apply the rotation transform with subtle adjustments
                        const currentTransform = window.getComputedStyle(this).transform;
                        const isHovered = currentTransform !== 'none' && !currentTransform.includes('matrix(1, 0, 0, 1, 0, 0)');
                        
                        if (isHovered) {
                            this.style.transform = `translateY(${index % 2 === 0 ? -6 : -5}px) scale(${index % 2 === 0 ? 1.01 : 1.008}) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        }
                        
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        });
    }
    
    addHoverEffect(productCards);
    addHoverEffect(featureCards);
    addHoverEffect(steps);

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
        messageEl.style.backgroundColor = 'var(--premium-blue)';
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
}); 