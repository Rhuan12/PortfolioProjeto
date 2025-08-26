# 📸 Portfólio Fotógrafo - João Silva

Um portfólio moderno e minimalista para fotógrafos profissionais, com efeitos parallax e design responsivo.

## ✨ Características

- **Design Minimalista** - Foco no conteúdo fotográfico
- **Efeitos Parallax** - Experiência visual envolvente
- **Totalmente Responsivo** - Funciona em todos os dispositivos
- **Galeria Interativa** - Modal para visualização ampliada
- **Animações Suaves** - Transições elegantes
- **SEO Otimizado** - Pronto para mecanismos de busca
- **Performance** - Carregamento rápido e otimizado

## 🚀 Deploy no Vercel

### Opção 1: Deploy via Git (Recomendado)

1. **Crie um repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio fotógrafo"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portfolio-fotografo.git
   git push -u origin main
   ```

2. **Deploy no Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Conecte seu GitHub e selecione o repositório
   - Clique em "Deploy"

### Opção 2: Deploy via Vercel CLI

1. **Instale o Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

### Opção 3: Upload direto

1. Acesse [vercel.com](https://vercel.com)
2. Arraste a pasta do projeto para a área de upload
3. Configure o domínio personalizado se desejar

## 📁 Estrutura do Projeto

```
portfolio-fotografo/
├── index.html          # Página principal
├── vercel.json         # Configurações do Vercel
├── README.md           # Documentação
└── images/            # Pasta para imagens locais (opcional)
```

## 🎨 Personalização

### Alterar Informações Pessoais

1. **Nome e título:**
   ```html
   <h1>João Silva</h1>
   <p>Fotógrafo Profissional</p>
   ```

2. **Informações de contato:**
   ```html
   <span>(11) 99999-9999</span>
   <span>contato@joaosilva.com</span>
   ```

3. **Redes sociais:**
   ```html
   <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
   ```

### Alterar Imagens

1. **Substitua as URLs do Unsplash pelas suas imagens:**
   ```html
   <!-- Antes -->
   <img src="https://images.unsplash.com/photo-..." alt="Sua foto">
   
   <!-- Depois -->
   <img src="./images/sua-foto.jpg" alt="Sua foto">
   ```

2. **Para imagens de alta qualidade, use:**
   - WebP para melhor compressão
   - Múltiplas resoluções para responsividade
   - Lazy loading (já implementado)

### Personalizar Cores

Altere as variáveis CSS no `:root`:

```css
:root {
    --primary-color: #1a1a1a;      /* Cor principal */
    --secondary-color: #f8f8f8;    /* Cor secundária */
    --accent-color: #d4af37;       /* Cor de destaque */
    --text-light: #666;            /* Texto claro */
}
```

### Adicionar Seções

Para adicionar novas seções:

1. **HTML:**
   ```html
   <section id="nova-secao">
       <div class="animate-on-scroll">
           <h2>Nova Seção</h2>
           <!-- Conteúdo -->
       </div>
   </section>
   ```

2. **Navegação:**
   ```html
   <li><a href="#nova-secao">Nova Seção</a></li>
   ```

## 📱 Funcionalidades

### Galeria Interativa
- Clique nas imagens para visualização ampliada
- Modal responsivo com navegação
- Efeitos hover elegantes

### Formulário de Contato
- Validação de campos em JavaScript
- Feedback visual para o usuário
- Pronto para integração com APIs

### Animações
- Scroll reveal animations
- Parallax smoothing
- Loading screen
- Typing effects

## 🔧 Otimizações Incluídas

### Performance
- Lazy loading de imagens
- CSS minificado inline
- JavaScript otimizado
- Cache headers configurados

### SEO
- Meta tags apropriadas
- Estrutura semântica HTML5
- Alt texts nas imagens
- Schema.org ready

### Acessibilidade
- Contraste adequado
- Navegação por teclado
- ARIA labels
- Foco visível

## 🌐 Domínio Personalizado

1. **No Vercel Dashboard:**
   - Acesse seu projeto
   - Vá em "Settings" > "Domains"
   - Adicione seu domínio personalizado

2. **Configure o DNS:**
   - Aponte seu domínio para `76.76.21.21`
   - Ou use CNAME: `cname.vercel-dns.com`

## 📊 Analytics (Opcional)

Para adicionar Google Analytics:

```html
<!-- Antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Atualizações Futuras

### Versão 2.0 (Planejada)
- [ ] CMS integrado para gerenciar imagens
- [ ] Blog integrado
- [ ] E-commerce para vendas
- [ ] Dashboard administrativo
- [ ] Integração com Instagram API

## 🐛 Solução de Problemas

### Imagens não carregam
- Verifique se as URLs estão corretas
- Use HTTPS para todas as imagens
- Considere hospedar imagens no próprio projeto

### Parallax não funciona no mobile
- É normal, parallax é desabilitado no mobile para melhor performance
- Use `background-attachment: scroll` para mobile

### Formulário não envia
- O formulário atual apenas simula envio
- Para funcionalidade real, integre com services como Formspree ou Netlify Forms

## 📞 Suporte

Para dúvidas ou customizações:
- Abra uma issue no GitHub
- Consulte a documentação do Vercel
- Verifique o console do navegador para erros

## 📄 Licença

Este projeto está sob licença MIT. Sinta-se livre para usar e modificar.

---

**Desenvolvido com ❤️ para fotógrafos que querem se destacar online**