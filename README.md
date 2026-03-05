# Mundo Flavinha

Site institucional e landing pages de produtos digitais do projeto Mundo Flavinha.

## Stack

- React 18
- TypeScript
- Vite
- `vite-react-ssg`
- Tailwind CSS
- Radix UI / shadcn

## Fluxo padrao

O projeto foi alinhado para usar `pnpm` como gerenciador de pacotes principal.

### Instalar dependencias

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm run dev
```

Servidor local padrao: `http://localhost:5175`

### Build estatico

```bash
pnpm run build
```

### Preview

```bash
pnpm run preview
```

### Qualidade

```bash
pnpm run lint
pnpm run typecheck
```

## Estrutura principal

- `src/pages`: paginas publicas e landings
- `src/components`: secoes e componentes reutilizaveis
- `src/config/site.ts`: dados centrais do site, rotas publicas e SEO
- `src/pages/admin`: telas administrativas da Fase 1
- `public/`: assets publicos

## Admin CMS (Fase 1)

Rotas administrativas:

- `/admin/login`
- `/admin/home-v2`

Secoes dentro do `/admin/home-v2` (menu lateral):

- Menu
- Hero
- Meus Canais
- Materiais autorais (CRUD + drag and drop)
- Produtos (CRUD + destaque + listas separadas + drag and drop)
- Depoimentos (CRUD + drag and drop)
- Menos Tela, Mais Presenca
- Footer

Obs: os formularios de CRUD abrem em tela dedicada dentro do modulo (nao ficam abaixo da listagem).

Rotas publicas principais:

- `/` (Home V2 principal)
- `/_old` (home antiga para referencia)

Variaveis de ambiente necessarias:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET` (opcional, padrao/fallback: `images` -> `cms-images`)
- base sugerida: `.env.example`

Importante:

- o Vite nao carrega `.env.example` em runtime
- copie para `.env` na raiz (`cp .env.example .env`) e reinicie o `pnpm run dev`

SQL de setup:

- `supabase/phase1-cms-pages.sql`
- `supabase/phase1-storage.sql`

## Publicacao

O deploy em GitHub Pages esta configurado em:

- `.github/workflows/deploy.yml`

O build gera HTML estatico para as rotas publicas e aplica metadados por rota no processo de build.

## Observacoes

- `dist/` nao deve ser tratado como fonte de verdade do projeto.
- Se houver necessidade de novos produtos, rotas ou metadados, atualize primeiro `src/config/site.ts`.
