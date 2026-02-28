#!/bin/sh
set -e

cd /app

if [ ! -f package.json ]; then
  echo "Projeto nao encontrado em /app."
  exit 1
fi

if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "Instalando dependencias com pnpm dentro do container..."
  pnpm install --frozen-lockfile
fi

case "${1:-dev}" in
  dev)
    echo "Iniciando servidor de desenvolvimento..."
    exec pnpm run dev
    ;;
  install)
    exec pnpm install --frozen-lockfile
    ;;
  lint)
    exec pnpm run lint
    ;;
  typecheck)
    exec pnpm run typecheck
    ;;
  build)
    exec pnpm run build
    ;;
  preview)
    exec pnpm run preview -- --host 0.0.0.0 --port 4173
    ;;
  sh|/bin/sh|bash|/bin/bash)
    exec "$@"
    ;;
  *)
    exec "$@"
    ;;
esac
