#!/bin/bash
# SmartAssist AI — rychlé spuštění
# Pro workshop "Vibecoding v project managementu"

echo "=========================================="
echo "  SmartAssist AI — spouštím projekt..."
echo "=========================================="
echo ""

# Kontrola uv
if ! command -v uv &> /dev/null; then
    echo "Instaluji uv (správce balíčků pro Python)..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    source "$HOME/.local/bin/env" 2>/dev/null || export PATH="$HOME/.local/bin:$PATH"
fi

echo "Instaluji závislosti..."
uv sync

echo ""
echo "=========================================="
echo "  Spouštím server na http://localhost:8000"
echo "  Ukončíte pomocí Ctrl+C"
echo "=========================================="
echo ""

uv run fastapi dev src/smartassist/main.py
