# 🚀 Setup do Portfólio Dinâmico com Supabase

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase
3. Editor de código (VS Code recomendado)

## 🔧 Configuração Passo a Passo

### 1. Configurar o Supabase

#### 1.1 Criar as Tabelas
1. Acesse o painel do Supabase
2. Vá em **SQL Editor**
3. Cole e execute o script `supabase-schema.sql`
4. Cole e execute o script `sample-data.sql`

#### 1.2 Configurar Storage
1. Vá em **Storage**
2. Crie um bucket chamado `client-images`
3. Configure como **público**
4. Configure políticas de acesso:
   ```sql
   -- Permitir leitura pública
   CREATE POLICY "Public can view images" ON storage.objects
   FOR SELECT USING (bucket_id = 'client-images');
   
   -- Permitir upload autenticado (para dashboard admin futuro)
   CREATE POLICY "Authenticated can upload images" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'client-images' AND auth.role() = 'authenticated');
   ```

### 2. Configurar o Projeto

#### 2.1 Estrutura de Arquivos
```
seu-projeto/
├── index.html              # HTML dinâmico
├── styles.css              # Estilos base + dinâmicos
├── script.js               # Scripts originais
├── supabase-config.js      # Integração com Supabase
└── README.md
```

#### 2.2 Configurar Credenciais
No arquivo `supabase-config.js`, substitua:

```javascript
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui';
```

**📍 Onde encontrar as credenciais:**
1. Painel do Supabase
2. Settings → API
3. Copie **URL** e **anon public key**

### 3. Testar Localmente

#### 3.1 Servidor Local
Use qualquer servidor HTTP local:

```bash
# Python
python -m http.server 8000

# Node.js (se tiver http-server instalado)
npx http-server

# VS Code Live Server (extensão)
# Clique direito no index.html → "Open with Live Server"
```

#### 3.2 URL de Teste
Acesse: `http://localhost:8000?site=joao-silva`

O parâmetro `?site=joao-silva` simula o subdomínio para testes locais.

### 4. Personalizar Dados

#### 4.1 Via SQL (Método Direto)
```sql
-- Alterar informações do cliente
UPDATE clients SET 
    name = 'Seu Nome Aqui',
    email = 'seu@email.com'
WHERE id = '123e4567-e89b-12d3-a456-426614174000';

-- Alterar título do site
UPDATE site_settings SET 
    setting_value = 'Seu Nome'
WHERE site_id = '223e4567-e89b-12d3-a456-426614174000' 
    AND section = 'hero' 
    AND setting_key = 'title';
```

#### 4.2 Via Interface (Dashboard Futuro)
Em breve criaremos um dashboard para edição visual.

## 🎨 Personalização Visual

### Cores e Tema
No `styles.css`, altere as variáveis:

```css
:root {
    --primary-color: #1a1a1a;        /* Cor principal */
    --secondary-color: #f8f8f8;      /* Fundo claro */
    --accent-color: #d4af37;         /* Dourado - altere aqui */
    --text-light: #666;              /* Texto secundário */
}
```

### Imagens
1. **Upload via Supabase Storage:**
   - Vá em Storage → client-images
   - Upload suas imagens
   - Copie a URL pública

2. **Atualizar no banco:**
   ```sql
   UPDATE site_images SET 
       image_url = 'https://seu-projeto.supabase.co/storage/v1/object/public/client-images/sua-imagem.jpg'
   WHERE site_id = '223e4567-e89b-12d3-a456-426614174000' 
       AND section = 'hero';
   ```

## 🚀 Deploy em Produção

### Opção 1: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Configurar domínio personalizado no painel do Vercel
```

### Opção 2: Netlify
1. Conecte seu repositório GitHub
2. Build settings: deixe em branco (site estático)
3. Deploy automático

### Configuração Multi-tenant
Para múltiplos clientes com subdomínios:

1. **DNS Wildcard:**
   - Configure `*.seudominio.com` apontando para seu servidor

2. **Vercel/Netlify:**
   - Configure rewrites para capturar subdomínios
   - Exemplo `vercel.json`:
   ```json
   {
     "routes": [
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```

## 🔍 Debug e Troubleshooting

### Console Debug
No navegador, digite:
```javascript
// Ver dados carregados
window.debugPortfolio.settings()
window.debugPortfolio.images()

// Recarregar dados
await window.debugPortfolio.loadSite()
```

### Problemas Comuns

#### ❌ Site não carrega
1. Verificar credenciais do Supabase
2. Verificar se as tabelas foram criadas
3. Verificar console do navegador

#### ❌ Imagens não aparecem
1. Verificar se o bucket é público
2. Verificar URLs nas tabelas
3. Verificar políticas de RLS

#### ❌ Formulário não envia
1. Verificar se a tabela `contact_messages` existe
2. Verificar políticas de INSERT
3. Verificar console para erros

### Logs Úteis
```javascript
// Ver logs de conexão
console.log(window.debugPortfolio.supabase)

// Testar conexão manual
const { data, error } = await supabase.from('sites').select('*').limit(1)
console.log('Teste:', data, error)
```

## 📊 Próximos Passos

### Dashboard Administrativo
- [ ] Interface para editar textos
- [ ] Upload de imagens
- [ ] Visualização de mensagens
- [ ] Gerenciamento de múltiplos sites

### Funcionalidades Avançadas
- [ ] Sistema de autenticação para clientes
- [ ] Analytics de visitantes
- [ ] SEO dinâmico
- [ ] Múltiplos templates

### Monetização
- [ ] Sistema de assinaturas
- [ ] Planos diferentes
- [ ] Pagamento integrado
- [ ] Domínios personalizados

## 🆘 Suporte

Se encontrar problemas:
1. Verificar este guia primeiro
2. Consultar documentação do Supabase
3. Verificar logs do console
4. Abrir issue no repositório

---

**🎉 Parabéns! Seu portfólio dinâmico está configurado!**

Agora cada cliente pode ter seu próprio site personalizado através do banco de dados.