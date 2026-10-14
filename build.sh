#!/usr/bin/env bash
# exit on error
set -o errexit

echo "==> Installing Python dependencies..."
pip install -r requirements.txt

echo "==> Building frontend if node is available..."
if command -v npm &> /dev/null; then
    npm install
    npm run build
fi

echo "==> Build complete!"
