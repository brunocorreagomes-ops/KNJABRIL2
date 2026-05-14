const fs = require('fs');
const path = require('path');

const files = [
'blog/alternativas-turismo-massa-europa-2026/index.html',
'blog/consultoria-vs-assessoria-diferenca/index.html',
'blog/coolcation-turismo-regenerativo-artico-2026/index.html',
'blog/courchevel-vs-aspen-esqui-luxo-2026/index.html',
'blog/ees-passo-a-passo-completo-europa/index.html',
'blog/entrevista-consulado-americano-guia-pratico/index.html',
'blog/ficha-digital-hospedes-2026/index.html',
'blog/fim-filas-guarulhos-viracopos-2026/index.html',
'blog/guia-definitivo-visto-americano-2026/index.html',
'blog/guia-sobrevivencia-etias-ees-2026/index.html',
'blog/novas-rotas-viracopos-2026/index.html',
'blog/power-bank-no-aviao-regras-anac-2026/index.html',
'blog/renovacao-de-visto-americano-sem-entrevista/index.html',
'blog/renovacao-visto-2026/index.html',
'blog/sustentabilidade-veneza-2026/index.html',
'blog/tarifa-de-luto-o-que-e-como-solicitar/index.html',
'blog/viajante-conectado-2026/index.html',
'blog/vietna-2026-luxo-silencioso/index.html',
'blog/visto-americano-indaiatuba-campinas/index.html',
'blog/visto-americano-por-onde-comecar/index.html',
'blog/visto-copa-2026/index.html',
'blog/visto-infantil-2026/index.html'
];

const newHeader = `    <!-- SECTION 1: HEADER -->
    <header id="main-header" class="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5 h-20 md:h-24 flex items-center transition-all duration-300">
        <div class="container flex justify-between items-center text-white">
            <a href="../../index.html" class="flex items-center gap-1 group" aria-label="Voltar para Home">
                <img src="https://i.postimg.cc/d1RfCdxp/KNJ-LOGO-TRANSPARENTE.png" alt="KNJ TUR Logo" class="h-9 md:h-12 w-auto transition-all group-hover:scale-105 filter brightness-110" referrerPolicy="no-referrer" fetchpriority="high">
            </a>
            
            <div class="flex items-center gap-4 md:gap-10">
                <nav class="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-primary-light/60">
                    <a href="../../index.html" class="nav-link hover:text-primary transition-colors">Home</a>
                    <a href="../../sobre-nos/" class="nav-link hover:text-primary transition-colors">Sobre</a>
                    <a href="../../visto-americano/" class="nav-link hover:text-primary transition-colors text-primary italic">Visto</a>
                    <a href="../../viagens/" class="nav-link hover:text-primary transition-colors">Viagens</a>
                    <a href="../" class="nav-link hover:text-primary transition-colors active text-white">Blog</a>
                </nav>

                <div class="hidden md:flex items-center gap-6">
                    <a href="https://wa.me/5511994085822" target="_blank" class="btn-luxury btn-whatsapp !px-6 !py-2.5 !text-[10px] font-black uppercase tracking-widest !text-ink">
                        WhatsApp
                    </a>
                </div>

                <button id="menu-btn" class="lg:hidden text-primary p-2 focus:outline-none" aria-label="Abrir Menu">
                    <i data-lucide="menu" class="w-7 h-7"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- SECTION 2: MOBILE MENU -->
    <div id="mobile-menu" class="fixed inset-0 bg-ink z-[60] flex flex-col opacity-0 invisible transition-all duration-500 overflow-y-auto">
        <div class="flex justify-between items-center px-6 h-20 border-b border-white/5">
            <img src="https://i.postimg.cc/d1RfCdxp/KNJ-LOGO-TRANSPARENTE.png" alt="KNJ TUR Logo" class="h-8 w-auto filter brightness-110">
            <button id="close-menu" class="text-primary p-2 focus:outline-none" aria-label="Fechar Menu">
                <i data-lucide="x" class="w-8 h-8"></i>
            </button>
        </div>
        
        <nav class="flex flex-col gap-1 p-6">
            <a href="../../index.html" class="text-2xl font-display font-black text-white py-4 flex justify-between items-center group italic">Home <i data-lucide="chevron-right" class="text-primary opacity-0 group-hover:opacity-100 transition-all"></i></a>
            <a href="../../sobre-nos/" class="text-2xl font-display font-black text-white py-4 flex justify-between items-center group italic">Sobre <i data-lucide="chevron-right" class="text-primary opacity-0 group-hover:opacity-100 transition-all"></i></a>
            <a href="../../visto-americano/" class="text-2xl font-display font-black text-white py-4 flex justify-between items-center group italic">Visto <i data-lucide="chevron-right" class="text-primary opacity-0 group-hover:opacity-100 transition-all"></i></a>
            <a href="../../viagens/" class="text-2xl font-display font-black text-white py-4 flex justify-between items-center group italic">Viagens <i data-lucide="chevron-right" class="text-primary opacity-0 group-hover:opacity-100 transition-all"></i></a>
            <a href="../" class="text-2xl font-display font-black text-primary py-4 flex justify-between items-center group italic">Blog <i data-lucide="chevron-right" class="text-primary opacity-0 group-hover:opacity-100 transition-all"></i></a>
        </nav>

        <div class="mt-auto p-8 bg-white/[0.02] border-t border-white/5">
            <p class="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black mb-6 italic">Exclusividade KNJ</p>
            <a href="https://wa.me/5511994085822" class="btn-luxury btn-whatsapp w-full !py-5 font-black text-[12px] uppercase tracking-widest text-ink block text-center">Inicie sua Jornada</a>
            
            <div class="flex gap-6 mt-8 justify-center">
                <a href="https://www.instagram.com/knjtur" target="_blank" class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-ink transition-all">
                    <i data-lucide="instagram" class="w-5 h-5"></i>
                </a>
            </div>
        </div>
    </div>`;

const newFooter = `    <!-- SECTION 6: FOOTER -->
    <footer class="bg-ink pt-16 md:pt-24 pb-8 md:pb-12 text-white border-t border-white/5">
        <div class="container">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24 border-b border-white/5 pb-16 md:pb-24">
                <div class="flex flex-col items-start col-span-1 sm:col-span-2 lg:col-span-1">
                    <a href="../../index.html" class="flex items-center gap-3 mb-6 md:mb-8">
                        <img src="https://i.postimg.cc/d1RfCdxp/KNJ-LOGO-TRANSPARENTE.png" alt="KNJ TUR Logo" class="h-10 md:h-12 w-auto" referrerPolicy="no-referrer">
                    </a>
                    <p class="text-white/40 text-[11px] leading-loose max-w-[280px] font-medium tracking-wide">Planejamento estratégico de viagens e visto americano. Atendimento personalizado para Indaiatuba e região.</p>
                </div>

                <div class="flex flex-col gap-4 md:gap-6">
                    <h5 class="text-primary uppercase tracking-widest text-[10px] font-black">Navegação</h5>
                    <nav class="flex flex-col gap-3 text-xs font-medium text-white/50">
                        <a href="../../index.html" class="hover:text-primary transition-colors">Home</a>
                        <a href="../../sobre-nos/" class="hover:text-primary transition-colors">Sobre</a>
                        <a href="../../visto-americano/" class="hover:text-primary transition-colors text-primary italic">Visto</a>
                        <a href="../../viagens/" class="hover:text-primary transition-colors">Viagens</a>
                        <a href="../" class="hover:text-primary transition-colors active text-white">Blog</a>
                    </nav>
                </div>

                <div class="flex flex-col gap-4 md:gap-6">
                    <h5 class="text-primary uppercase tracking-widest text-[10px] font-black">Contato</h5>
                    <div class="flex flex-col gap-3 text-xs font-medium text-white/50">
                        <span class="flex items-start gap-3"><i data-lucide="map-pin" class="w-4 h-4 text-primary shrink-0"></i> Indaiatuba - SP</span>
                        <span class="flex items-center gap-3"><i data-lucide="mail" class="w-4 h-4 text-primary shrink-0"></i> kenji@knjtur.com</span>
                        <span class="flex items-center gap-3"><i data-lucide="phone" class="w-4 h-4 text-primary shrink-0"></i> (11) 99408-5822</span>
                    </div>
                </div>

                <div class="flex flex-col gap-4 md:gap-6">
                    <h5 class="text-primary uppercase tracking-widest text-[10px] font-black">Social</h5>
                    <div class="flex gap-4">
                        <a href="https://www.instagram.com/knjtur" target="_blank" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-ink transition-all overflow-hidden p-2.5">
                             <img src="https://i.ibb.co/gbY8Qtmb/instagramknj.webp" alt="Instagram" class="w-full h-full object-contain" referrerPolicy="no-referrer" loading="lazy">
                        </a>
                        <a href="https://wa.me/5511994085822" target="_blank" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-whatsapp hover:text-white transition-all">
                            <i data-lucide="message-circle" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">@2026 KNJ TUR | TODOS OS DIREITOS RESERVADOS</p>
                <div class="text-[8px] uppercase tracking-widest text-white/10 font-bold">
                    DESIGN BY <a href="https://www.orvalia.com.br" target="_blank" class="text-[#40E0D0]/60 hover:text-[#40E0D0] transition-colors">ORVALIA</a>
                </div>
            </div>
        </div>
    </footer>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Header
    const headerPattern = /<!-- Header -->[\s\S]*?<\/header>/;
    content = content.replace(headerPattern, newHeader);
    
    // Replace Footer
    const footerPattern = /<!-- Footer -->[\s\S]*?<\/footer>/;
    content = content.replace(footerPattern, newFooter);
    
    // Update body classes if needed
    content = content.replace('class="bg-surface', 'class="bg-ink');
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
