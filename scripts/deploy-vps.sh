#!/bin/bash
set -e

export PATH="$HOME/.nvm/versions/node/v24.12.0/bin:$PATH"

SITE_DIR="$HOME/personal-website"

echo "==> Pulling latest code..."
cd "$SITE_DIR"
git pull origin main

echo "==> Installing dependencies..."
npm ci --prefer-offline

echo "==> Building..."
npm run build

echo "==> Restarting PM2..."
pm2 restart website

echo "==> Done. Status:"
pm2 list | grep website
