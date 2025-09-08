// Funções para controlar os modais da linha do tempo (escopo global)
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede scroll do body
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura scroll do body
    }
};

// Função para navegar entre modais
window.navigateModal = function(currentModalId, direction) {
    const modals = ['modal1', 'modal2', 'modal3', 'modal4'];
    const currentIndex = modals.indexOf(currentModalId);
    
    let nextIndex;
    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % modals.length;
    } else {
        nextIndex = (currentIndex - 1 + modals.length) % modals.length;
    }
    
    closeModal(currentModalId);
    openModal(modals[nextIndex]);
};

// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const homeImage = document.querySelector('.home-image');

    // Função para mostrar seção ativa
    function showSection(targetId) {
        // Esconder todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });



    // Fechar modal ao clicar fora do conteúdo (exceto modal panorâmico)
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal') && event.target.id !== 'panoramaModal') {
            const modalId = event.target.id;
            closeModal(modalId);
        }
    });
    
    // Fechar modal com tecla ESC (exceto modal panorâmico que tem controle próprio)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal:not(#panoramaModal)');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
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

    // Event listener para todos os links internos (incluindo botões)
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            
            // Obter o ID da seção alvo
            const targetId = link.getAttribute('href').substring(1);
            
            // Mostrar a seção
            showSection(targetId);
            
            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
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

    // Efeito de escurecimento gradativo na imagem HOME durante o scroll
    function updateHomeImageDarkening() {
        const homeSection = document.querySelector('.home-section');
        if (!homeSection) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const maxScroll = windowHeight * 0.8; // Escurece completamente após 80% da altura da tela
        
        // Calcula a intensidade do escurecimento baseada no scroll (de 0 para 0.6)
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
        const darknessOpacity = scrollProgress * 0.6;
        
        // Aplica o escurecimento diretamente no pseudo-elemento
        const overlay = homeSection.querySelector('::before') || homeSection;
        homeSection.style.setProperty('--overlay-opacity', darknessOpacity);
    }

    // Event listener para o scroll
    window.addEventListener('scroll', updateHomeImageDarkening);
    
    // Chama a função uma vez para definir o estado inicial
    updateHomeImageDarkening();

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

    // Adicionar efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        // Efeito da navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Função utilitária para debug (pode ser removida em produção)
function debugNavigation() {
    console.log('Seções ativas:', document.querySelectorAll('.section.active').length);
    console.log('Links ativos:', document.querySelectorAll('.nav-link.active').length);
}

// Modal do Tour Virtual 360°
let panoramaViewer = null;

// Sistema de Administração do Tour Virtual
let adminMode = false;
let tourPoints = [];
const ADMIN_PASSWORD = 'euamominhacama';

// Carregar pontos salvos do localStorage
function loadTourPoints() {
    const saved = localStorage.getItem('tourPoints');
    if (saved) {
        tourPoints = JSON.parse(saved);
        renderTourPoints();
        updatePointsList();
    }
}

// Salvar pontos no localStorage
function saveTourPoints() {
    localStorage.setItem('tourPoints', JSON.stringify(tourPoints));
}

// Autenticar administrador
function authenticateAdmin() {
    const passwordInput = document.getElementById('adminPassword');
    const authForm = document.querySelector('.auth-form');
    const adminStatus = document.getElementById('adminStatus');
    const panel = document.getElementById('adminPanel');
    
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === ADMIN_PASSWORD) {
        adminMode = true;
        
        // Mostrar status de admin ativo
        authForm.style.display = 'none';
        adminStatus.style.display = 'flex';
        
        // Mostrar painel administrativo
        if (panel) {
            panel.style.display = 'block';
        }
        
        // Carregar pontos
        loadTourPoints();
        
        // Limpar campo de senha
        passwordInput.value = '';
        
        showNotification('Acesso autorizado! Modo administrador ativado.', 'success');
    } else {
        showNotification('Senha incorreta. Acesso negado.', 'error');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Logout do administrador
function logoutAdmin() {
    const authForm = document.querySelector('.auth-form');
    const adminStatus = document.getElementById('adminStatus');
    const panel = document.getElementById('adminPanel');
    
    adminMode = false;
    
    // Mostrar formulário de login novamente
    authForm.style.display = 'flex';
    adminStatus.style.display = 'none';
    
    // Ocultar painel administrativo
    if (panel) {
        panel.style.display = 'none';
    }
    
    showNotification('Modo administrador desativado.', 'info');
}

// Permitir login com Enter
function handlePasswordKeyPress(event) {
    if (event.key === 'Enter') {
        authenticateAdmin();
    }
}

// Renderizar pontos no mapa
function renderTourPoints() {
    const container = document.getElementById('dynamicPoints');
    if (!container) return;
    
    container.innerHTML = '';
    
    tourPoints.forEach(point => {
        const pointElement = document.createElement('div');
        pointElement.className = 'dynamic-point';
        pointElement.style.cssText = `
            position: absolute;
            top: ${point.positionY}%;
            left: ${point.positionX}%;
            transform: translate(-50%, -50%);
        `;
        
        pointElement.innerHTML = `
            <svg class="location-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="openCustomPanorama('${point.id}')">
                <path d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z" fill="#4CAF50" stroke="#FFFFFF" stroke-width="3"/>
                <circle cx="24" cy="18" r="5" fill="#FFFFFF"/>
            </svg>
        `;
        
        // Adicionar tooltip
        pointElement.title = point.name;
        
        container.appendChild(pointElement);
    });
}

// Abrir panorama customizado
function openCustomPanorama(pointId) {
    const point = tourPoints.find(p => p.id === pointId);
    if (!point) return;
    
    const modal = document.getElementById('panoramaModal');
    const modalTitle = modal.querySelector('.modal-header h2');
    
    modalTitle.textContent = point.name;
    modal.style.display = 'block';
    
    // Inicializar panorama com imagem customizada
    if (panoramaViewer) {
        panoramaViewer.destroy();
    }
    
    panoramaViewer = pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": point.image,
        "autoLoad": true,
        "title": point.name,
        "author": "Centro Educacional Salesiano",
        "compass": true,
        "northOffset": 0,
        "showZoomCtrl": true,
        "mouseZoom": true,
        "showFullscreenCtrl": true,
        "autoRotate": -2
    });
}

// Atualizar lista de pontos no painel admin
function updatePointsList() {
    const container = document.getElementById('pointsList');
    if (!container) return;
    
    if (tourPoints.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Nenhum ponto adicionado ainda.</p>';
        return;
    }
    
    container.innerHTML = tourPoints.map(point => `
        <div class="point-item">
            <div class="point-info">
                <h5>${point.name}</h5>
                <p>${point.description || 'Sem descrição'}</p>
                <small>Posição: ${point.positionX}%, ${point.positionY}%</small>
            </div>
            <div class="point-actions">
                <button class="btn-edit" onclick="editPoint('${point.id}')">✏️ Editar</button>
                <button class="btn-delete" onclick="deletePoint('${point.id}')">🗑️ Excluir</button>
            </div>
        </div>
    `).join('');
}

// Editar ponto
function editPoint(pointId) {
    const point = tourPoints.find(p => p.id === pointId);
    if (!point) return;
    
    // Preencher formulário com dados do ponto
    document.getElementById('pointName').value = point.name;
    document.getElementById('pointDescription').value = point.description || '';
    document.getElementById('positionX').value = point.positionX;
    document.getElementById('positionY').value = point.positionY;
    
    // Remover ponto atual (será re-adicionado ao submeter)
    deletePoint(pointId, false);
    
    showNotification('Ponto carregado para edição', 'info');
}

// Excluir ponto
function deletePoint(pointId, showConfirm = true) {
    if (showConfirm && !confirm('Tem certeza que deseja excluir este ponto?')) {
        return;
    }
    
    tourPoints = tourPoints.filter(p => p.id !== pointId);
    saveTourPoints();
    renderTourPoints();
    updatePointsList();
    
    if (showConfirm) {
        showNotification('Ponto excluído com sucesso!', 'success');
    }
}

// Visualizar ponto antes de adicionar
function previewPoint() {
    const name = document.getElementById('pointName').value;
    const x = document.getElementById('positionX').value;
    const y = document.getElementById('positionY').value;
    
    if (!name || !x || !y) {
        showNotification('Preencha nome e posições para visualizar', 'warning');
        return;
    }
    
    // Criar preview temporário
    const container = document.getElementById('dynamicPoints');
    const preview = document.createElement('div');
    preview.className = 'dynamic-point';
    preview.style.cssText = `
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        transform: translate(-50%, -50%);
        opacity: 0.7;
        animation: pulse 1s infinite;
    `;
    
    preview.innerHTML = `
        <svg class="location-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z" fill="#FFC107" stroke="#FFFFFF" stroke-width="3"/>
            <circle cx="24" cy="18" r="5" fill="#FFFFFF"/>
        </svg>
    `;
    
    container.appendChild(preview);
    
    // Remover preview após 3 segundos
    setTimeout(() => {
        if (preview.parentNode) {
            preview.parentNode.removeChild(preview);
        }
    }, 3000);
    
    showNotification(`Preview: "${name}" em ${x}%, ${y}%`, 'info');
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        default:
            notification.style.background = '#007bff';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.parentNode.removeChild(notification);
            }, 300);
        }
    }, 3000);
}

// Processar formulário de adição de ponto
function addTourPoint(event) {
    event.preventDefault();
    
    const name = document.getElementById('pointName').value.trim();
    const description = document.getElementById('pointDescription').value.trim();
    const imageFile = document.getElementById('panoramaImage').files[0];
    const positionX = parseFloat(document.getElementById('positionX').value);
    const positionY = parseFloat(document.getElementById('positionY').value);
    
    // Validações
    if (!name) {
        showNotification('Nome do ponto é obrigatório', 'error');
        return;
    }
    
    if (!imageFile) {
        showNotification('Imagem panorâmica é obrigatória', 'error');
        return;
    }
    
    if (isNaN(positionX) || isNaN(positionY) || positionX < 0 || positionX > 100 || positionY < 0 || positionY > 100) {
        showNotification('Posições devem ser números entre 0 e 100', 'error');
        return;
    }
    
    // Verificar se é uma imagem
    if (!imageFile.type.startsWith('image/')) {
        showNotification('Arquivo deve ser uma imagem', 'error');
        return;
    }
    
    // Converter imagem para base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const newPoint = {
            id: Date.now().toString(),
            name: name,
            description: description,
            image: e.target.result,
            positionX: positionX,
            positionY: positionY,
            createdAt: new Date().toISOString()
        };
        
        tourPoints.push(newPoint);
        saveTourPoints();
        renderTourPoints();
        updatePointsList();
        
        // Limpar formulário
        document.getElementById('addPointForm').reset();
        
        showNotification(`Ponto "${name}" adicionado com sucesso!`, 'success');
    };
    
    reader.onerror = function() {
        showNotification('Erro ao processar imagem', 'error');
    };
    
    reader.readAsDataURL(imageFile);
}

// Variáveis globais para pesquisa
let searchResults = [];
let currentSearchIndex = -1;
let searchHighlights = [];

// Configurar caixa de pesquisa
function setupSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchCounter = document.getElementById('searchCounter');
    const prevResult = document.getElementById('prevResult');
    const nextResult = document.getElementById('nextResult');
    const historiaSection = document.getElementById('historia');
    
    if (!searchBox || !searchInput || !historiaSection) return;
    
    // A caixa de pesquisa está sempre visível na seção HISTÓRIA
    
    // Função de busca
    function performSearch(query) {
        clearSearch();
        
        if (!query.trim()) {
            updateSearchCounter();
            return;
        }
        
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const walker = document.createTreeWalker(
            historiaSection,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    return node.parentElement.tagName !== 'SCRIPT' && 
                           node.parentElement.tagName !== 'STYLE' &&
                           node.textContent.trim().length > 0 ?
                           NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        let textNode;
        while (textNode = walker.nextNode()) {
            const matches = [...textNode.textContent.matchAll(regex)];
            if (matches.length > 0) {
                highlightTextNode(textNode, matches, query);
            }
        }
        
        searchResults = document.querySelectorAll('.search-highlight');
        currentSearchIndex = searchResults.length > 0 ? 0 : -1;
        
        if (currentSearchIndex >= 0) {
            highlightCurrentResult();
            scrollToResult(currentSearchIndex);
        }
        
        updateSearchCounter();
    }
    
    // Destacar texto encontrado
    function highlightTextNode(textNode, matches, query) {
        const parent = textNode.parentElement;
        const text = textNode.textContent;
        let lastIndex = 0;
        const fragment = document.createDocumentFragment();
        
        matches.forEach(match => {
            // Adicionar texto antes da correspondência
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }
            
            // Criar elemento destacado
            const highlight = document.createElement('span');
            highlight.className = 'search-highlight';
            highlight.textContent = match[0];
            fragment.appendChild(highlight);
            
            lastIndex = match.index + match[0].length;
        });
        
        // Adicionar texto restante
        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        
        parent.replaceChild(fragment, textNode);
    }
    
    // Limpar pesquisa anterior
    function clearSearch() {
        const highlights = historiaSection.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentElement;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
        
        searchResults = [];
        currentSearchIndex = -1;
        searchInput.value = '';
        updateSearchCounter();
    }
    
    // Destacar resultado atual
    function highlightCurrentResult() {
        searchResults.forEach((result, index) => {
            result.classList.toggle('current', index === currentSearchIndex);
        });
    }
    
    // Rolar para resultado
    function scrollToResult(index) {
        if (index >= 0 && index < searchResults.length) {
            searchResults[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    // Atualizar contador
    function updateSearchCounter() {
        if (searchResults.length > 0) {
            searchCounter.textContent = `${currentSearchIndex + 1} de ${searchResults.length}`;
            prevResult.disabled = currentSearchIndex <= 0;
            nextResult.disabled = currentSearchIndex >= searchResults.length - 1;
        } else {
            searchCounter.textContent = searchInput.value.trim() ? 'Nenhum resultado' : '';
            prevResult.disabled = true;
            nextResult.disabled = true;
        }
    }
    
    // Event listeners
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            if (query) {
                if (searchResults.length === 0) {
                    // Primeira busca
                    performSearch(query);
                } else {
                    // Navegar pelos resultados existentes
                    currentSearchIndex = (currentSearchIndex + 1) % searchResults.length;
                    highlightCurrentResult();
                    scrollToResult(currentSearchIndex);
                    updateSearchCounter();
                }
            }
        } else if (e.key === 'Escape') {
            clearSearch();
        }
    });
    
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    closeSearchBtn.addEventListener('click', () => {
        searchBox.style.display = 'none';
        clearSearch();
    });
    
    prevResult.addEventListener('click', () => {
        if (currentSearchIndex > 0) {
            currentSearchIndex--;
            highlightCurrentResult();
            scrollToResult(currentSearchIndex);
            updateSearchCounter();
        }
    });
    
    nextResult.addEventListener('click', () => {
        if (currentSearchIndex < searchResults.length - 1) {
            currentSearchIndex++;
            highlightCurrentResult();
            scrollToResult(currentSearchIndex);
            updateSearchCounter();
        }
    });
}

// Código removido - duplicação corrigida

function openPanoramaModal() {
    const modal = document.getElementById('panoramaModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Inicializar Pannellum se ainda não foi inicializado
        if (!panoramaViewer) {
            initializePanorama();
        }
    }
}

function closePanoramaModal() {
    const modal = document.getElementById('panoramaModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function initializePanorama() {
    panoramaViewer = pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "images/galeria/panoramica.jpg",
        "autoLoad": true,
        "autoRotate": -2,
        "compass": true,
        "northOffset": 0,
        "showZoomCtrl": true,
        "showFullscreenCtrl": true,
        "showControls": true,
        "mouseZoom": true,
        "draggable": true,
        "keyboardZoom": true,
        "hfov": 100,
        "minHfov": 50,
        "maxHfov": 120,
        "pitch": 0,
        "yaw": 0
    });
}

// Event listeners para o modal panorâmico
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar caixa de pesquisa
    setupSearchBox();
    
    // Adicionar event listener ao ícone de localização
    const locationIcon = document.querySelector('.location-icon');
    if (locationIcon) {
        locationIcon.addEventListener('click', openPanoramaModal);
    }
    
    // Adicionar event listener ao botão de fechar
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePanoramaModal);
    }
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('panoramaModal');
            if (modal && modal.style.display === 'block') {
                closePanoramaModal();
            }
        }
    });
});