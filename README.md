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
- `public/`: assets publicos

## Publicacao

O deploy em GitHub Pages esta configurado em:

- `.github/workflows/deploy.yml`

O build gera HTML estatico para as rotas publicas e aplica metadados por rota no processo de build.

## Observacoes

- `dist/` nao deve ser tratado como fonte de verdade do projeto.
- Se houver necessidade de novos produtos, rotas ou metadados, atualize primeiro `src/config/site.ts`.
