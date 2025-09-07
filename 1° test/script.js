// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Função para mostrar seção ativa
    function showSection(targetId) {
        // Esconder todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar seção alvo
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Atualizar link ativo na navegação
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Adicionar classe active ao link correspondente
        const activeLink = document.querySelector(`a[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Função para scroll suave para a seção de história
    window.scrollToHistoria = function() {
        const historiaSection = document.getElementById('historia');
        if (historiaSection) {
            historiaSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            // Atualiza a navegação
            showSection('historia');
        }
    }

    // Funções da Modal do Mural
    window.openMuralModal = function() {
        const modal = document.getElementById('muralModal');
        const iframe = document.getElementById('muralIframe');
        const loading = document.getElementById('muralLoading');
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll da página
        
        // Mostrar loading
        loading.style.display = 'block';
        iframe.style.display = 'none';
        
        // Carregar Padlet após um pequeno delay
        setTimeout(() => {
            iframe.src = 'https://padlet.com/diegoauerz/contribua-para-a-nossa-hist-ria-7n44571iqd8ry903';
            
            // Esconder loading após carregar
            iframe.onload = function() {
                loading.style.display = 'none';
                iframe.style.display = 'block';
            };
        }, 500);
    }

    window.closeMuralModal = function() {
        const modal = document.getElementById('muralModal');
        const iframe = document.getElementById('muralIframe');
        
        // Esconder modal
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll da página
        
        // Limpar iframe para economizar recursos
        iframe.src = '';
    }

    // Fechar modal ao clicar fora dela
    window.onclick = function(event) {
        const modal = document.getElementById('muralModal');
        if (event.target === modal) {
            closeMuralModal();
        }
    }

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('muralModal');
            if (modal.style.display === 'block') {
                closeMuralModal();
            }
        }
    });

    // Event listeners para os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter o ID da seção alvo
            const targetId = this.getAttribute('href').substring(1);
            
            // Mostrar a seção
            showSection(targetId);
            
            // Fechar menu mobile se estiver aberto
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Função para toggle do menu mobile
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Event listener para o hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });

    // Fechar menu mobile ao redimensionar a tela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Navegação por teclado (acessibilidade)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Inicializar com a primeira seção ativa
    showSection('home');

    // Animação suave para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos placeholder para animação
    const placeholders = document.querySelectorAll('[class*="placeholder"]');
    placeholders.forEach(placeholder => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'translateY(20px)';
        placeholder.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(placeholder);
    });

    // Função para destacar link ativo baseado no scroll (para uso futuro)
    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Adicionar efeito de loading suave
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Estilo inicial para loading
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    // Adicionar efeito de scroll na navbar e home section
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const homeSection = document.querySelector('.home-section');
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (homeSection) {
                homeSection.classList.add('scrolled');
            }
        } else {
            navbar.classList.remove('scrolled');
            if (homeSection) {
                homeSection.classList.remove('scrolled');
            }
        }
    });
});

// Função utilitária para debug (pode ser removida em produção)
function debugNavigation() {
    console.log('Seções ativas:', document.querySelectorAll('.section.active').length);
    console.log('Links ativos:', document.querySelectorAll('.nav-link.active').length);
}