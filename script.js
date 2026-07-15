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
                            <svg class="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.832.002-2.623-1.023-5.09-2.885-6.955C16.592 1.951 14.124.931 11.51.929c-5.43 0-9.855 4.415-9.858 9.835-.002 1.83.488 3.615 1.417 5.176l-.924 3.376 3.473-.912zm11.233-5.362c-.329-.165-1.947-.961-2.247-1.071-.3-.11-.518-.165-.736.165-.218.33-.842 1.071-1.033 1.291-.19.22-.382.247-.711.082-1.127-.565-1.927-1.002-2.686-2.301-.19-.33-.19-.544-.025-.709.148-.148.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.412-.028-.577-.082-.165-.736-1.774-1.008-2.433-.265-.638-.535-.552-.736-.562-.19-.01-.408-.01-.626-.01-.218 0-.573.082-.873.412-.3.33-1.145 1.117-1.145 2.721 0 1.604 1.171 3.159 1.334 3.378.164.22 2.304 3.518 5.58 4.939.78.338 1.388.54 1.864.691.783.249 1.496.214 2.059.13.629-.094 1.947-.796 2.22-1.527.273-.731.273-1.359.191-1.492-.08-.133-.3-.218-.629-.383z"/></svg>
                        </a>
                        <!-- Facebook -->
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]/40 duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no Facebook">
                            <svg class="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]/40 duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no LinkedIn">
                            <svg class="w-5 h-5 text-[#0A66C2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <!-- X/Twitter -->
                        <a href="https://twitter.com/intent/tweet?text=${title}&url=${url}" target="_blank" class="group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-white hover:text-black hover:border-white duration-300 transition-all hover:scale-105 active:scale-95" title="Compartilhar no X (Twitter)">
                            <svg class="w-5 h-5 text-white group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <!-- Copiar Link -->
                        <button class="copy-url-btn group w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] hover:bg-[#E8842A] hover:text-black hover:border-[#E8842A] duration-300 transition-all hover:scale-105 active:scale-95" title="Copiar Link para Área de Transferência">
                            <svg class="w-5 h-5 text-[#E8842A] group-hover:text-black transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
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
                        copyBtn.innerHTML = `<svg class="w-5 h-5 text-green-400 transition-colors" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                        copyBtn.classList.remove('hover:bg-[#E8842A]', 'hover:text-black');
                        copyBtn.classList.add('bg-green-500/10', 'border-green-500/30');
                        
                        setTimeout(() => {
                            copyBtn.innerHTML = originalHtml;
                            copyBtn.classList.add('hover:bg-[#E8842A]', 'hover:text-black');
                            copyBtn.classList.remove('bg-green-500/10', 'border-green-500/30');
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
