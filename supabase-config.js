// Configuração do Supabase
// IMPORTANTE: Substitua pelas suas credenciais reais do Supabase

const SUPABASE_URL = 'https://enfsvruzgyxwbujpdugp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZnN2cnV6Z3l4d2J1anBkdWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzODg5MjIsImV4cCI6MjA3MTk2NDkyMn0.076p5S5Y5F1wO6osDQ_F__mR9pyCXUCa8W4AVgBCAAw';

// Inicializar o cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Classe para gerenciar o site
class PortfolioSite {
    constructor() {
        this.siteData = null;
        this.subdomain = this.getSubdomain();
        this.isLoading = false;
    }

    // Extrair subdomínio da URL
    getSubdomain() {
        const hostname = window.location.hostname;
        
        // Se estiver testando localmente, usar um padrão
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            // Para testes, vamos usar o parâmetro ?site=subdomain
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('site') || 'joao-silva';
        }
        
        // Em produção, extrair o subdomínio
        const parts = hostname.split('.');
        return parts.length > 2 ? parts[0] : null;
    }

    // Carregar dados completos do site
    async loadSiteData() {
        try {
            this.isLoading = true;
            
            // Buscar dados do site
            const { data: site, error: siteError } = await supabase
                .from('sites')
                .select(`
                    *,
                    site_settings(*),
                    site_images(*),
                    site_services(*)
                `)
                .eq('subdomain', this.subdomain)
                .eq('is_active', true)
                .single();

            if (siteError) {
                throw new Error(`Erro ao carregar site: ${siteError.message}`);
            }

            if (!site) {
                throw new Error('Site não encontrado');
            }

            this.siteData = site;
            return site;

        } catch (error) {
            console.error('Erro ao carregar dados do site:', error);
            this.showError('Site não encontrado ou indisponível');
            return null;
        } finally {
            this.isLoading = false;
        }
    }

    // Organizar configurações por seção
    getSettingsBySection() {
        if (!this.siteData?.site_settings) return {};

        return this.siteData.site_settings.reduce((acc, setting) => {
            if (!acc[setting.section]) {
                acc[setting.section] = {};
            }
            acc[setting.section][setting.setting_key] = setting.setting_value;
            return acc;
        }, {});
    }

    // Organizar imagens por seção
    getImagesBySection() {
        if (!this.siteData?.site_images) return {};

        return this.siteData.site_images
            .filter(img => img.is_active)
            .sort((a, b) => a.order_index - b.order_index)
            .reduce((acc, image) => {
                if (!acc[image.section]) {
                    acc[image.section] = [];
                }
                acc[image.section].push(image);
                return acc;
            }, {});
    }

    // Renderizar o site com os dados carregados
    async renderSite() {
        const siteData = await this.loadSiteData();
        if (!siteData) return;

        const settings = this.getSettingsBySection();
        const images = this.getImagesBySection();
        const services = this.siteData.site_services
            .filter(service => service.is_active)
            .sort((a, b) => a.order_index - b.order_index);

        // Atualizar título da página
        document.title = `${settings.hero?.title || 'Portfólio'} - ${siteData.site_name}`;

        // Renderizar cada seção
        this.renderHero(settings.hero, images.hero);
        this.renderAbout(settings.about, images.about);
        this.renderGallery(settings.gallery, images.gallery);
        this.renderServices(settings.services, services);
        this.renderContact(settings.contact);
        this.renderParallax(settings.parallax1, settings.parallax2, images.parallax1, images.parallax2);

        // Remover loading screen
        this.hideLoader();
    }

    // Renderizar seção Hero
    renderHero(settings, images) {
        const heroSection = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (settings) {
            const title = heroContent.querySelector('h1');
            const subtitle = heroContent.querySelector('p');
            const ctaButton = heroContent.querySelector('.cta-button');

            if (title) title.textContent = settings.title || 'Nome do Fotógrafo';
            if (subtitle) subtitle.textContent = settings.subtitle || 'Fotógrafo Profissional';
            if (ctaButton) ctaButton.textContent = settings.cta_text || 'Ver Portfólio';
        }

        // Atualizar imagem de fundo
        if (images && images[0]) {
            const backgroundImage = images[0].image_url;
            heroSection.style.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
                url('${backgroundImage}')
            `;
        }
    }

    // Renderizar seção About
    renderAbout(settings, images) {
        if (!settings) return;

        const aboutSection = document.querySelector('#about');
        const aboutTitle = aboutSection.querySelector('h2');
        const aboutText = aboutSection.querySelector('.about-text');
        const aboutImage = aboutSection.querySelector('.about-image img');

        if (aboutTitle) aboutTitle.textContent = settings.title || 'Sobre Mim';

        if (aboutText && settings) {
            aboutText.innerHTML = `
                ${settings.paragraph1 ? `<p>${settings.paragraph1}</p>` : ''}
                ${settings.paragraph2 ? `<p>${settings.paragraph2}</p>` : ''}
                ${settings.paragraph3 ? `<p>${settings.paragraph3}</p>` : ''}
            `;
        }

        if (aboutImage && images && images[0]) {
            aboutImage.src = images[0].image_url;
            aboutImage.alt = images[0].alt_text || 'Sobre mim';
        }
    }

    // Renderizar galeria
    renderGallery(settings, images) {
        const gallerySection = document.querySelector('#gallery');
        const galleryTitle = gallerySection.querySelector('h2');
        const galleryGrid = gallerySection.querySelector('.gallery-grid');

        if (galleryTitle && settings?.title) {
            galleryTitle.textContent = settings.title;
        }

        if (galleryGrid && images) {
            galleryGrid.innerHTML = '';
            
            images.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.onclick = () => openModal(image.image_url);
                
                galleryItem.innerHTML = `
                    <img src="${image.image_url}" alt="${image.alt_text || 'Galeria'}">
                    <div class="gallery-overlay">
                        <i class="fas fa-expand"></i>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
            });
        }
    }

    // Renderizar serviços
    renderServices(settings, services) {
        const servicesSection = document.querySelector('#services');
        const servicesTitle = servicesSection.querySelector('h2');
        const servicesGrid = servicesSection.querySelector('.services-grid');

        if (servicesTitle && settings?.title) {
            servicesTitle.textContent = settings.title;
        }

        if (servicesGrid && services) {
            servicesGrid.innerHTML = '';
            
            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                
                serviceCard.innerHTML = `
                    <div class="service-icon">
                        <i class="${service.icon_class || 'fas fa-camera'}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    ${service.price ? `<div class="service-price">A partir de R$ ${service.price.toLocaleString('pt-BR')}</div>` : ''}
                `;
                
                servicesGrid.appendChild(serviceCard);
            });
        }
    }

    // Renderizar contato
    renderContact(settings) {
        if (!settings) return;

        const contactSection = document.querySelector('#contact');
        const contactTitle = contactSection.querySelector('h2');
        const contactSubtitle = contactSection.querySelector('.contact-info h3');
        const contactItems = contactSection.querySelectorAll('.contact-item span');

        if (contactTitle) contactTitle.textContent = settings.title || 'Contato';
        if (contactSubtitle) contactSubtitle.textContent = settings.subtitle || 'Vamos conversar sobre seu projeto';

        // Atualizar informações de contato
        if (contactItems.length >= 4) {
            if (settings.phone) contactItems[0].textContent = settings.phone;
            if (settings.email) contactItems[1].textContent = settings.email;
            if (settings.location) contactItems[2].textContent = settings.location;
            if (settings.hours) contactItems[3].textContent = settings.hours;
        }
    }

    // Renderizar seções parallax
    renderParallax(parallax1Settings, parallax2Settings, parallax1Images, parallax2Images) {
        // Parallax 1
        const parallax1 = document.querySelector('.parallax-1');
        if (parallax1 && parallax1Settings) {
            const quote = parallax1.querySelector('h3');
            const author = parallax1.querySelector('p');
            
            if (quote) quote.textContent = parallax1Settings.quote || '';
            if (author) author.textContent = parallax1Settings.author || '';
        }

        if (parallax1 && parallax1Images && parallax1Images[0]) {
            parallax1.style.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url('${parallax1Images[0].image_url}')
            `;
        }

        // Parallax 2
        const parallax2 = document.querySelector('.parallax-2');
        if (parallax2 && parallax2Settings) {
            const title = parallax2.querySelector('h3');
            const subtitle = parallax2.querySelector('p');
            
            if (title) title.textContent = parallax2Settings.title || '';
            if (subtitle) subtitle.textContent = parallax2Settings.subtitle || '';
        }

        if (parallax2 && parallax2Images && parallax2Images[0]) {
            parallax2.style.backgroundImage = `
                linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url('${parallax2Images[0].image_url}')
            `;
        }
    }

    // Submeter formulário de contato
    async submitContactForm(formData) {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        site_id: this.siteData.id,
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        service_type: formData.get('service'),
                        message: formData.get('message'),
                        ip_address: await this.getClientIP(),
                        user_agent: navigator.userAgent
                    }
                ]);

            if (error) {
                throw error;
            }

            return { success: true, data };

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            return { success: false, error: error.message };
        }
    }

    // Obter IP do cliente (opcional)
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return null;
        }
    }

    // Esconder loader
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }

    // Mostrar erro
    showError(message) {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.innerHTML = `
                <div style="color: white; text-align: center;">
                    <h2>😔 Ops!</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #d4af37; border: none; border-radius: 5px; color: white; cursor: pointer;">
                        Tentar Novamente
                    </button>
                </div>
            `;
        }
    }
}

// Instância global do site
let portfolioSite;

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Verificar se o Supabase está disponível
        if (typeof window.supabase === 'undefined') {
            console.error('Supabase não foi carregado. Adicione o script do Supabase no HTML.');
            return;
        }

        // Inicializar o site
        portfolioSite = new PortfolioSite();
        
        // Renderizar o site com dados do Supabase
        await portfolioSite.renderSite();

        // Interceptar o formulário de contato para usar Supabase
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const submitBtn = document.querySelector('.submit-btn');
                
                // Validação básica
                if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }
                
                // Validação de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.get('email'))) {
                    alert('Por favor, insira um email válido.');
                    return;
                }
                
                // Submeter via Supabase
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                const result = await portfolioSite.submitContactForm(formData);
                
                if (result.success) {
                    alert('Mensagem enviada com sucesso! Retornaremos em breve.');
                    this.reset();
                } else {
                    alert(`Erro ao enviar mensagem: ${result.error}`);
                }
                
                submitBtn.textContent = 'Enviar Mensagem';
                submitBtn.disabled = false;
            });
        }

    } catch (error) {
        console.error('Erro ao inicializar o site:', error);
        
        if (portfolioSite) {
            portfolioSite.showError('Erro ao carregar o site. Tente novamente.');
        }
    }
});

// Funções utilitárias globais para compatibilidade
window.getPortfolioSite = () => portfolioSite;

// Debug: expor no console para desenvolvimento
if (typeof window !== 'undefined') {
    window.debugPortfolio = {
        site: () => portfolioSite,
        supabase: supabase,
        loadSite: () => portfolioSite?.loadSiteData(),
        settings: () => portfolioSite?.getSettingsBySection(),
        images: () => portfolioSite?.getImagesBySection()
    };
    
    console.log('🔧 Debug disponível em window.debugPortfolio');
}