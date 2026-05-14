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
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            // Update icon
            menuBtn.innerHTML = isActive 
                ? '<i data-lucide="x" size="28"></i>' 
                : '<i data-lucide="menu" size="28"></i>';
            
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuBtn.innerHTML = '<i data-lucide="menu" size="28"></i>';
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            });
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
