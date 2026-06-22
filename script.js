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
    const modals = ['modal6', 'modal7', 'modal8', 'modal9', 'modal10', 'modal11'];
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

// Sistema de Palavras-Chave
window.filterByKeyword = function(keyword) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const keywordButtons = document.querySelectorAll('.keyword-btn');
    
    // Verificar se os elementos existem antes de tentar acessá-los
    if (!timelineItems.length || !keywordButtons.length) {
        return;
    }
    
    // Remover classe active de todos os botões
    keywordButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (keyword === 'all') {
        // Mostrar todos os itens
        timelineItems.forEach(item => {
            item.style.display = 'flex';
        });
        const allButton = document.querySelector('.keyword-btn[onclick="filterByKeyword(\'all\')"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    } else {
        // Filtrar por palavra-chave
        timelineItems.forEach(item => {
            const keywords = item.getAttribute('data-keywords');
            if (keywords && keywords.includes(keyword)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        const activeButton = document.querySelector(`.keyword-btn[onclick="filterByKeyword('${keyword}')"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
};

// Sistema de Filtros por Categoria
window.filterByCategory = function(category) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const filterItems = document.querySelectorAll('.filter-item');
    
    // Remover classe active de todos os filtros
    filterItems.forEach(item => {
        item.classList.remove('active');
    });
    
    if (category === 'all') {
        // Mostrar todos os itens
        timelineItems.forEach(item => {
            item.style.display = 'flex';
        });
        // Adicionar classe active ao filtro "all"
        const allFilter = document.querySelector('.filter-item[data-filter="all"]');
        if (allFilter) {
            allFilter.classList.add('active');
        }
    } else {
        // Filtrar por categoria
        timelineItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            if (categories && categories.includes(category)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        // Adicionar classe active ao filtro selecionado
        const activeFilter = document.querySelector(`.filter-item[data-filter="${category}"]`);
        if (activeFilter) {
            activeFilter.classList.add('active');
        }
    }
};

// Modal do Experimenta
window.openExperimentaModal = function() {
    const modal = document.getElementById('experimentaModal');
    const iframe = document.getElementById('experimentaIframe');
    const loading = document.getElementById('experimentaLoading');
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Mostrar loading
    loading.style.display = 'flex';
    
    // Configurar iframe
    iframe.src = 'https://meutour360.com/tour-360/experimenta';
    
    // Esconder loading após carregar
    iframe.onload = function() {
        loading.style.display = 'none';
    };
    
    // Fallback para esconder loading após 5 segundos
    setTimeout(() => {
        loading.style.display = 'none';
    }, 5000);
};

window.closeExperimentaModal = function() {
    const modal = document.getElementById('experimentaModal');
    const iframe = document.getElementById('experimentaIframe');
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Parar carregamento do iframe
    iframe.src = 'about:blank';
};

// Funções do Modal do Mural
window.openMuralModal = function() {
    const modal = document.getElementById('muralModal');
    const iframe = document.getElementById('muralIframe');
    const loading = document.getElementById('muralLoading');
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Mostrar loading
    loading.style.display = 'flex';
    
    // Configurar iframe com o Padlet completo
    iframe.src = 'https://padlet.com/embed/7n44571iqd8ry903';
    
    // Esconder loading após carregar
    iframe.onload = function() {
        loading.style.display = 'none';
    };
    
    // Fallback para esconder loading após 5 segundos
    setTimeout(() => {
        loading.style.display = 'none';
    }, 5000);
};

window.closeMuralModal = function() {
    const modal = document.getElementById('muralModal');
    const iframe = document.getElementById('muralIframe');
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Parar carregamento do iframe
    iframe.src = 'about:blank';
};

// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Efeito de scroll na navbar
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Event listener para o scroll
    window.addEventListener('scroll', handleNavbarScroll);

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

    // Event listeners para navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Fechar menu mobile se estiver aberto
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Menu hambúrguer
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Mostrar seção História como padrão (página inicial)
    showSection('historia');
    
    // Inicializar sistema de palavras-chave após um pequeno delay para garantir que os elementos estejam prontos
    setTimeout(() => {
        filterByKeyword('all');
    }, 100);

    // Inicializar sistema de filtros por categoria
    setTimeout(() => {
        // Adicionar event listeners aos filtros
        const filterItems = document.querySelectorAll('.filter-item');
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');
                filterByCategory(category);
            });
        });
        
        // Inicializar com todos os itens visíveis
        filterByCategory('all');
    }, 200);

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            const modalId = event.target.id;
            if (modalId === 'experimentaModal') {
                closeExperimentaModal();
            } else {
                closeModal(modalId);
            }
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const experimentaModal = document.getElementById('experimentaModal');
            if (experimentaModal && experimentaModal.style.display === 'block') {
                closeExperimentaModal();
            }
            
            const modals = document.querySelectorAll('.modal:not(#experimentaModal)');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Função para abrir depoimentos
    window.openDepoimento = function(depoimentoId) {
        const modal = document.getElementById('depoimentoModal');
        const content = document.getElementById('depoimentoContent');
        
        // Conteúdo dos depoimentos
        const depoimentos = {
            1: {
                nome: "Maria Silva",
                cargo: "Ex-aluna (1985-1992)",
                texto: "Minha experiência no Colégio Salesiano foi transformadora. Os valores que aprendi aqui me acompanham até hoje. A educação de qualidade e o ambiente acolhedor fizeram toda a diferença na minha formação."
            },
            2: {
                nome: "João Santos",
                cargo: "Ex-professor (1990-2010)",
                texto: "Trabalhar no Colégio Salesiano foi um privilégio. Ver o crescimento dos alunos e participar da construção de uma educação baseada em valores salesianos foi uma experiência única e enriquecedora."
            },
            3: {
                nome: "Ana Costa",
                cargo: "Ex-aluna (1995-2002)",
                texto: "O Colégio Salesiano não foi apenas uma escola, foi minha segunda casa. As amizades que fiz aqui duraram para toda a vida, e os ensinamentos dos educadores me tornaram uma pessoa melhor."
            }
        };
        
        const depoimento = depoimentos[depoimentoId];
        if (depoimento) {
            content.innerHTML = `
                <h3>${depoimento.nome}</h3>
                <p class="cargo">${depoimento.cargo}</p>
                <p class="texto">"${depoimento.texto}"</p>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeDepoimentoModal = function() {
        const modal = document.getElementById('depoimentoModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
});

function debugNavigation() {
    console.log('Seções encontradas:', document.querySelectorAll('.section').length);
    console.log('Links de navegação:', document.querySelectorAll('.nav-link').length);
}

// Fluxo de Login/Admin via botão da navbar
let isAdminLoggedIn = false;
const ADMIN_USER = 'unisales';
const ADMIN_PASSWORD = 'salesiano1940';

function openAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        const input = document.getElementById('adminLoginUser');
        if (input) input.focus();
    }
}

function closeAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        const userInput = document.getElementById('adminLoginUser');
        const passwordInput = document.getElementById('adminLoginPassword');
        if (userInput) userInput.value = '';
        if (passwordInput) passwordInput.value = '';
    }
}

function loginAdmin() {
    const user = document.getElementById('adminLoginUser')?.value || '';
    const pwd = document.getElementById('adminLoginPassword')?.value || '';
    
    if (user === ADMIN_USER && pwd === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        closeAdminLoginModal();
        const panel = document.getElementById('adminPanelModal');
        if (panel) {
            panel.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        showNotification('Login realizado com sucesso!', 'success');
    } else {
        showNotification('Usuário ou senha incorretos. Tente novamente.', 'error');
    }
}

function closeAdminPanel() {
    const panel = document.getElementById('adminPanelModal');
    if (panel) {
        panel.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function addTimelineItem({ year, tag, imageSrc, title, description }) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    // ID único para o modal
    const modalId = `modal-${Date.now()}`;

    // Criar item da timeline
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('data-keywords', tag);
    item.setAttribute('data-category', tag);
    item.innerHTML = `
        <div class="timeline-date">${year}</div>
        <div class="timeline-connector"></div>
        <div class="timeline-content">
            <div class="timeline-image" onclick="openModal('${modalId}')">
                <img src="${imageSrc}" alt="${title}">
                <div class="timeline-overlay">
                    <span>Clique para ampliar</span>
                </div>
            </div>
            <div class="timeline-text">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;

    // Inserir e reordenar cronologicamente.
    timeline.appendChild(item);
    sortTimelineChronologically();
    applyTimelineAlternation();

    // Criar modal correspondente
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${modalId}')">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="modal-text">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Inicialização quando o DOM estiver carregado (suporte a admin e animações)
document.addEventListener('DOMContentLoaded', function() {
    // Botão do usuário na navbar
    const adminBtn = document.getElementById('adminUserBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', openAdminLoginModal);
    }

    // Submissão do formulário da timeline
    const form = document.getElementById('timelineForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!isAdminLoggedIn) {
                showNotification('Faça login para adicionar itens.', 'warning');
                return;
            }
            const year = document.getElementById('timelineYear')?.value;
            const tag = document.getElementById('timelineTag')?.value;
            const title = document.getElementById('timelineTitle')?.value;
            const description = document.getElementById('timelineDescription')?.value;
            const fileInput = document.getElementById('timelineImage');
            const file = fileInput?.files && fileInput.files[0];

            if (!file) {
                showNotification('Selecione uma imagem.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(ev) {
                addTimelineItem({
                    year,
                    tag,
                    imageSrc: ev.target.result,
                    title,
                    description
                });
                closeAdminPanel();
                form.reset();
                showNotification('Item adicionado à timeline!', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    // Fechar modais admin com ESC e clique fora
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const adminLoginModal = document.getElementById('adminLoginModal');
            const adminPanelModal = document.getElementById('adminPanelModal');
            if (adminPanelModal && adminPanelModal.style.display === 'block') {
                closeAdminPanel();
            } else if (adminLoginModal && adminLoginModal.style.display === 'block') {
                closeAdminLoginModal();
            }
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            if (event.target.id === 'adminLoginModal') {
                closeAdminLoginModal();
            } else if (event.target.id === 'adminPanelModal') {
                closeAdminPanel();
            }
        }
    });

    // Animação de notificação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Mostrar/ocultar botão do admin baseado no status de login
    const adminUserBtn = document.getElementById('adminUserBtn');
    if (adminUserBtn) {
        adminUserBtn.style.display = isAdminLoggedIn ? 'block' : 'block'; // Sempre visível
    }

    // Mostrar/ocultar botão de adicionar imagem baseado no status de login
    updateAdminUI();
});

// Variável global para controlar o próximo lado da timeline
let nextTimelineSide = 'left'; // Começa com left para o primeiro item ser odd (esquerda)

// Função para atualizar a UI do admin
function updateAdminUI() {
    const adminAddContainer = document.getElementById('adminAddContainer');
    const timelineImages = document.querySelectorAll('.timeline-image');
    
    if (isAdminLoggedIn) {
        // Mostrar botão de adicionar
        if (adminAddContainer) {
            adminAddContainer.style.display = 'block';
        }
        
        // Adicionar classe editável às imagens
        timelineImages.forEach((img, index) => {
            img.classList.add('editable');
            img.addEventListener('click', function(e) {
                // Prevenir que o modal da imagem abra
                e.stopPropagation();
                openEditImageModal(index);
            });
        });
    } else {
        // Ocultar botão de adicionar
        if (adminAddContainer) {
            adminAddContainer.style.display = 'none';
        }
        
        // Remover classe editável das imagens
        timelineImages.forEach(img => {
            img.classList.remove('editable');
        });
    }
}

// Função para abrir modal de adicionar imagem
function openAddImageModal() {
    const modal = document.getElementById('addImageModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Função para fechar modal de adicionar imagem
function closeAddImageModal() {
    const modal = document.getElementById('addImageModal');
    if (modal) {
        modal.style.display = 'none';
        // Limpar formulário
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Função para abrir modal de editar imagem
function openEditImageModal(itemIndex) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const item = timelineItems[itemIndex];
    
    if (!item) return;
    
    const modal = document.getElementById('editImageModal');
    if (!modal) return;
    
    // Extrair dados do item
    const year = item.querySelector('.timeline-date').textContent;
    const title = item.querySelector('.timeline-text h3').textContent;
    const description = item.querySelector('.timeline-text p').textContent;
    const categories = item.getAttribute('data-category') || '';
    const keywords = item.getAttribute('data-keywords') || '';
    
    // Combinar categories e keywords para formar as tags
    const allTags = [...new Set([...categories.split(' '), ...keywords.split(' ')])].filter(tag => tag.trim() !== '');
    
    // Preencher formulário
    document.getElementById('editItemId').value = itemIndex;
    document.getElementById('editItemYear').value = year;
    document.getElementById('editItemTitle').value = title;
    document.getElementById('editItemDescription').value = description;
    document.getElementById('editItemTags').value = allTags.join(', ');
    
    modal.style.display = 'block';
}

// Função para fechar modal de editar imagem
function closeEditImageModal() {
    const modal = document.getElementById('editImageModal');
    if (modal) {
        modal.style.display = 'none';
        // Limpar formulário
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Função para adicionar nova imagem à timeline
function addNewTimelineItem(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const year = formData.get('year');
    const tags = formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFile = formData.get('image');
    
    if (!imageFile) {
        showNotification('Por favor, selecione uma imagem.', 'error');
        return;
    }
    
    // Criar URL temporária para a imagem
    const imageUrl = URL.createObjectURL(imageFile);
    
    // Determinar posição na timeline
    const timeline = document.querySelector('.timeline');
    const existingItems = timeline.querySelectorAll('.timeline-item');
    const newIndex = existingItems.length;
    
    // Criar novo item da timeline
    const newItem = document.createElement('div');
    newItem.className = 'timeline-item';
    newItem.setAttribute('data-keywords', tags.join(' '));
    newItem.setAttribute('data-category', tags.join(' '));
    
    // Criar ID único para o modal
    const modalId = `modal${Date.now()}`;
    
    newItem.innerHTML = `
        <div class="timeline-date">${year}</div>
        <div class="timeline-connector"></div>
        <div class="timeline-content">
            <div class="timeline-image" onclick="openModal('${modalId}')">
                <img src="${imageUrl}" alt="${title}">
                <div class="timeline-overlay">
                    <span>Clique para ampliar</span>
                </div>
            </div>
            <div class="timeline-text">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Adicionar à timeline e manter a ordem cronológica crescente
    timeline.appendChild(newItem);
    sortTimelineChronologically();
    
    // Criar modal para a nova imagem
    createImageModal(modalId, imageUrl, title, description);
    
    // Fechar modal de adição
    closeAddImageModal();
    
    // Atualizar UI do admin para incluir a nova imagem
    updateAdminUI();
    
    // Aplicar alternância correta
    applyTimelineAlternation();
    
    // Aplicar símbolos das tags ao novo item
    createTagSymbols(newItem);
    
    showNotification('Imagem adicionada com sucesso!', 'success');
}

// Função para salvar edições de imagem
function saveImageEdit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const itemIndex = parseInt(formData.get('itemId'));
    const year = formData.get('year');
    const tags = formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const title = formData.get('title');
    const description = formData.get('description');
    const newImageFile = formData.get('image');
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    const item = timelineItems[itemIndex];
    
    if (!item) {
        showNotification('Item não encontrado.', 'error');
        return;
    }
    
    // Atualizar dados do item
    item.querySelector('.timeline-date').textContent = year;
    item.querySelector('.timeline-text h3').textContent = title;
    item.querySelector('.timeline-text p').textContent = description;
    item.setAttribute('data-keywords', tags.join(' '));
    item.setAttribute('data-category', tags.join(' '));
    
    // Atualizar imagem se uma nova foi fornecida
    if (newImageFile && newImageFile.size > 0) {
        const imageUrl = URL.createObjectURL(newImageFile);
        const img = item.querySelector('.timeline-image img');
        if (img) {
            img.src = imageUrl;
            img.alt = title;
        }
        
        // Atualizar modal correspondente
        const modalId = item.querySelector('.timeline-image').getAttribute('onclick').match(/'([^']+)'/)[1];
        const modal = document.getElementById(modalId);
        if (modal) {
            const modalImg = modal.querySelector('img');
            const modalTitle = modal.querySelector('h3');
            const modalDesc = modal.querySelector('p');
            
            if (modalImg) modalImg.src = imageUrl;
            if (modalTitle) modalTitle.textContent = title;
            if (modalDesc) modalDesc.textContent = description;
        }
    }
    
    // Recriar símbolos das tags
    createTagSymbols(item);
    
    // Fechar modal de edição
    closeEditImageModal();
    
    showNotification('Imagem atualizada com sucesso!', 'success');
}

// Mantém a linha do tempo em ordem cronológica crescente, inclusive para itens
// carregados depois do HTML inicial ou adicionados pelo painel administrativo.
window.sortTimelineChronologically = function() {
    const timeline = document.querySelector('#historia .timeline');
    if (!timeline) return;

    const getYear = (item) => {
        const year = Number.parseInt(item.querySelector('.timeline-date')?.textContent, 10);
        return Number.isFinite(year) ? year : Number.POSITIVE_INFINITY;
    };

    const items = Array.from(timeline.children).filter(item => item.classList.contains('timeline-item'));
    items.sort((a, b) => getYear(a) - getYear(b));
    items.forEach(item => timeline.appendChild(item));
};

// Função para aplicar alternância correta na timeline
function applyTimelineAlternation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Remover classes existentes
        item.classList.remove('timeline-left', 'timeline-right');
        
        // Aplicar alternância: ímpar = esquerda, par = direita
        if (index % 2 === 0) {
            item.classList.add('timeline-left');
        } else {
            item.classList.add('timeline-right');
        }
    });
}

// Atualizar função de login para incluir UI do admin
const originalLoginAdmin = loginAdmin;
loginAdmin = function() {
    const result = originalLoginAdmin();
    if (isAdminLoggedIn) {
        updateAdminUI();
    }
    return result;
};

// Função para criar modal de imagem dinamicamente
function createImageModal(modalId, imageUrl, title, description) {
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${modalId}')">&times;</span>
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Aplicar alternância na inicialização
// Função para criar símbolos das tags
function createTagSymbols(item) {
    const categories = item.getAttribute('data-category') || '';
    const keywords = item.getAttribute('data-keywords') || '';
    
    // Combinar categories e keywords para formar as tags
    const allTags = [...new Set([...categories.split(' '), ...keywords.split(' ')])].filter(tag => tag.trim() !== '');
    
    if (allTags.length === 0) return;
    
    // Remover tags existentes se houver
    const existingTags = item.querySelector('.tag-text');
    if (existingTags) {
        existingTags.remove();
    }
    
    // Criar container do texto das tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tag-text';
    
    // Formatar as tags em maiúsculo e separadas por vírgula
    const formattedTags = allTags.map(tag => tag.toUpperCase()).join(', ');
    tagsContainer.textContent = `TAGS: ${formattedTags}`;
    
    // Adicionar as tags à imagem
    const imageContainer = item.querySelector('.timeline-image');
    if (imageContainer) {
        imageContainer.style.position = 'relative';
        imageContainer.appendChild(tagsContainer);
    }
}

// Função para aplicar símbolos a todos os itens da timeline
function applyTagSymbolsToAll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        createTagSymbols(item);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    sortTimelineChronologically();
    applyTimelineAlternation();
    applyTagSymbolsToAll();
});
