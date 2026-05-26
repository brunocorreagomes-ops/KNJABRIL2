/* KNJ TUR - Global Scripts */

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('KNJ TUR Static Site Initialized');
    
    // Smooth Page Entry
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Lucide Icons Initialization
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Scroll Performance Optimization
    const header = document.querySelector('header');
    const floatingActions = document.getElementById('floating-actions');
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                if (header) {
                    if (scrollY > 40) {
                        header.classList.add('header-scrolled', 'bg-ink/95', 'shadow-2xl');
                        header.classList.remove('bg-ink/80');
                    } else {
                        header.classList.remove('header-scrolled', 'bg-ink/95', 'shadow-2xl');
                        header.classList.add('bg-ink/80');
                    }
                }

                if (floatingActions) {
                    if (scrollY > 500) {
                        floatingActions.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                        floatingActions.classList.add('opacity-100', 'visible', 'translate-y-0');
                    } else {
                        floatingActions.classList.add('opacity-0', 'invisible', 'translate-y-10');
                        floatingActions.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        const toggleMenu = (show) => {
            if (show) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        menuBtn.addEventListener('click', () => toggleMenu(true));
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => toggleMenu(false));
        }

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // EXTRA UX AND USER NAVIGATION EXPERIENCE ENHANCEMENTS (DESKTOP & MOBILE)
    // ==========================================================================

    // Dynamic Navigation Highlighting & Inline styles clean-up
    const uXNormalizeActiveNavs = () => {
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('header .nav-link, #mobile-menu nav a');
        
        // Define clean category routing checks
        let activePage = 'home';
        if (path.includes('/sobre-nos/')) activePage = 'sobre';
        else if (path.includes('/visto-americano/')) activePage = 'visto';
        else if (path.includes('/viagens/')) activePage = 'viagens';
        else if (path.includes('/blog/')) activePage = 'blog';
        else if (path.includes('/politica-de-privacidade/') || path.includes('/termos-de-uso/')) activePage = 'none';

        navLinks.forEach(link => {
            // Remove hardcoded static styles in HTML so premium CSS styles control the visual presentation
            link.classList.remove('underline', 'decoration-primary', 'underline-offset-8', 'italic', 'text-primary');
            
            const href = link.getAttribute('href') || '';
            let isActive = false;

            if (activePage === 'home') {
                if (href.endsWith('index.html') || href === '/' || href === '../../index.html' || href === '../index.html' || href === './index.html' || href === '') {
                    // Make sure it doesn't match subfolders
                    if (!href.includes('sobre-nos') && !href.includes('visto-americano') && !href.includes('viagens') && !href.includes('blog')) {
                        isActive = true;
                    }
                }
            } else if (activePage === 'sobre' && href.includes('sobre-nos')) {
                isActive = true;
            } else if (activePage === 'visto' && href.includes('visto-americano')) {
                isActive = true;
            } else if (activePage === 'viagens' && (href.includes('viagens') || href.includes('esim'))) {
                isActive = true;
            } else if (activePage === 'blog' && href.includes('blog')) {
                isActive = true;
            }

            if (isActive) {
                link.classList.add('active');
                if (link.closest('#mobile-menu')) {
                    link.classList.add('text-primary');
                }
            } else {
                link.classList.remove('active');
                if (link.closest('#mobile-menu')) {
                    link.classList.remove('text-primary');
                }
            }
        });
    };
    uXNormalizeActiveNavs();

    // Automatic Staggering Delay Assignment for Reveal Grids
    document.querySelectorAll('.grid, .reveal-group, .reveal-container').forEach(container => {
        const children = container.querySelectorAll('.reveal');
        if (children.length > 1) {
            children.forEach((child, index) => {
                // Ensure we do not override pre-existing explicit delay classes
                if (!child.className.includes('reveal-delay-') && !child.style.transitionDelay) {
                    child.style.transitionDelay = `${(index % 4) * 0.12}s`;
                }
            });
        }
    });

    // Close Mobile Menu on Outside Tap / Click for intuitive user workspace exit
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll Reveal Animation Logic
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing after reveal if desired, or keep for re-triggering
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Global Share Functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const url = window.location.href;
            const title = document.title;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title,
                        url: url
                    });
                } catch (err) {
                    console.log('Share cancelled or failed:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                try {
                    await navigator.clipboard.writeText(url);
                    const originalContent = btn.innerHTML;
                    btn.innerHTML = '<i data-lucide="check" size="14"></i> URL Copiada!';
                    if (window.lucide) window.lucide.createIcons();
                    setTimeout(() => {
                        btn.innerHTML = originalContent;
                        if (window.lucide) window.lucide.createIcons();
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    });

    // FAQ Accordion Logic
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const container = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('[data-lucide="chevron-down"]');
            
            // Close other items
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.parentElement.classList.remove('active');
                    const otherIcon = item.previousElementSibling.querySelector('[data-lucide="chevron-down"]');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                container.classList.remove('active');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                container.classList.add('active');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
