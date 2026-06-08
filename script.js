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

    // Global Share & Dynamic Article Share Section Injection
    const initArticleSharing = () => {
        const isBlogArticle = window.location.pathname.includes('/blog/') && 
                             !document.getElementById('blog-posts-grid') &&
                             document.querySelector('article');

        if (!isBlogArticle) return;

        const prose = document.querySelector('.prose');
        if (prose && !document.querySelector('.share-section')) {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            // 1. Dynamic metadata row share button if missing
            const metaRow = document.querySelector('article header div.flex.flex-wrap.items-center.justify-between') || 
                            document.querySelector('article header div.flex-wrap') || 
                            document.querySelector('article header .flex');
            if (metaRow && !metaRow.querySelector('.share-btn')) {
                const shareBtn = document.createElement('button');
                shareBtn.className = 'share-btn flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#E8842A] hover:text-white transition-colors ml-auto';
                shareBtn.innerHTML = '<i data-lucide="share-2" class="w-3.5 h-3.5"></i> Compartilhar';
                metaRow.appendChild(shareBtn);
            }

            // 2. Main beautiful block at the end of the text
            const shareSection = document.createElement('div');
            shareSection.className = 'share-section mt-16 pt-8 border-t border-white/5 reveal reveal-up active';
            shareSection.innerHTML = `
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] shadow-2xl">
                    <div>
                        <h4 class="text-sm font-black uppercase tracking-widest text-[#E8842A] mb-1">Gostou deste artigo?</h4>
                        <p class="text-xs text-primary-light/50 font-light">Compartilhe com amigos e ajude a divulgar viagens incríveis!</p>
                    </div>
                    <div class="flex flex-wrap gap-2.5">
                        <!-- WhatsApp -->
                        <a href="https://api.whatsapp.com/send?text=${title}%20-%20${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#25D366] hover:text-white hover:border-[#25D366]/40 duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no WhatsApp">
                            <i data-lucide="message-circle" class="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors"></i>
                        </a>
                        <!-- Facebook -->
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]/40 duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no Facebook">
                            <i data-lucide="facebook" class="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors"></i>
                        </a>
                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]/40 duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no LinkedIn">
                            <i data-lucide="linkedin" class="w-5 h-5 text-[#0A66C2] group-hover:text-white transition-colors"></i>
                        </a>
                        <!-- X/Twitter -->
                        <a href="https://twitter.com/intent/tweet?text=${title}&url=${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-white hover:text-black hover:border-white duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no X (Twitter)">
                            <i data-lucide="share-2" class="w-5 h-5 text-white/70 group-hover:text-black transition-colors"></i>
                        </a>
                        <!-- Copiar Link -->
                        <button class="copy-url-btn group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#E8842A] hover:text-black hover:border-[#E8842A] duration-300 transition-all hover:scale-105 active:scale-95" title="Copiar Link para Área de Transferência">
                            <i data-lucide="link" class="w-5 h-5 text-[#E8842A] group-hover:text-black transition-colors"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Insert cleanly right below the prose section
            prose.parentNode.insertBefore(shareSection, prose.nextSibling);

            // Direct event handler for premium dynamic copy link button
            const copyBtn = shareSection.querySelector('.copy-url-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', async () => {
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        const originalHtml = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5 text-green-400"></i>';
                        copyBtn.classList.remove('hover:bg-[#E8842A]', 'hover:text-black');
                        copyBtn.classList.add('bg-green-500/10', 'border-green-500/30');
                        if (window.lucide) window.lucide.createIcons();
                        
                        setTimeout(() => {
                            copyBtn.innerHTML = originalHtml;
                            copyBtn.classList.add('hover:bg-[#E8842A]', 'hover:text-black');
                            copyBtn.classList.remove('bg-green-500/10', 'border-green-500/30');
                            if (window.lucide) window.lucide.createIcons();
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy link:', err);
                    }
                });
            }

            if (window.lucide) {
                window.lucide.createIcons();
            }
        }
    };
    initArticleSharing();

    // Unified Event Delegated Share Listener
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.share-btn');
        if (!btn) return;
        
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
                btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-green-400"></i> Copiado!';
                if (window.lucide) window.lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
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
