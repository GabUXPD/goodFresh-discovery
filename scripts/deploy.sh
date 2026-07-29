#!/usr/bin/env bash
# Despliega a Vercel el proyecto correcto según la rama de git activa,
# para no mezclar los deploys de "main" (versión actual) y "v2" (nueva versión).
set -e

BRANCH=$(git branch --show-current)

case "$BRANCH" in
  main)
    PROJECT="goodfresh-discovery"
    ;;
  v2)
    PROJECT="goodfresh-discovery-v2"
    ;;
  *)
    echo "No hay proyecto Vercel configurado para la rama '$BRANCH'." >&2
    exit 1
    ;;
esac

echo "Rama '$BRANCH' -> proyecto Vercel '$PROJECT'"
vercel link --yes --project "$PROJECT"
vercel --prod --yes
