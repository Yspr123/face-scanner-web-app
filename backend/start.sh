#!/usr/bin/env bash
set -euo pipefail

# setup_render.sh
# Creates a Render Blueprint (render.yaml) for deploying:
#  - A Flask backend (Web Service)
#
# Usage:
#   bash setup_render.sh
#
# After running, commit and push render.yaml to GitHub, then
# use "New + > Blueprint" on Render to deploy from your repo.
#
# You can customize the backend service name with env vars:
#   BACKEND_NAME=face-scanner-api bash setup_render.sh

BACKEND_NAME="${BACKEND_NAME:-face-scanner-backend}"

# Detect repo root (directory containing this script)
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_ROOT"

cat > render.yaml <<'YAML'
services:
  # -------------------------------
  # Backend: Flask (Web Service)
  # -------------------------------
  - type: web
    name: ${BACKEND_NAME}
    env: python
    rootDir: backend
    # Optional: set your Python version if needed
    # pythonVersion: 3.11.8
    buildCommand: |
      pip install --upgrade pip
      pip install -r requirements.txt
      pip install gunicorn
    startCommand: |
      gunicorn app:app --workers=3 --bind=0.0.0.0:10000
    plan: free
    autoDeploy: true
    envVars:
      # REQUIRED: Set these in Render dashboard after first deploy or in this file.
      - key: SECRET_KEY
        sync: false
      - key: JWT_SECRET_KEY
        sync: false
      - key: DATABASE_URL
        sync: false
      # Optional defaults
      - key: FLASK_DEBUG
        value: "0"
      - key: JWT_ACCESS_TOKEN_EXPIRES
        value: "3600"  # seconds
YAML

# Replace placeholders with user-provided or default service name
if command -v envsubst >/dev/null 2>&1; then
  mv render.yaml render.yaml.template
  BACKEND_NAME="$BACKEND_NAME" envsubst < render.yaml.template > render.yaml
  rm render.yaml.template
else
  sed -i.bak "s/\${BACKEND_NAME}/$BACKEND_NAME/g" render.yaml
  rm -f render.yaml.bak
fi

echo "✅ Created render.yaml for backend service:"
echo "   - Backend: $BACKEND_NAME (Python Web Service)"
echo
echo "Next steps:"
echo "  1) Commit the blueprint:   git add render.yaml && git commit -m \"chore: add Render backend blueprint\" && git push"
echo "  2) On Render: New + > Blueprint, select your repo."
echo "  3) Set required env vars on the backend service: SECRET_KEY, JWT_SECRET_KEY, DATABASE_URL."
echo "     - For DATABASE_URL, create a Render PostgreSQL instance and copy its Internal Database URL."
echo "  4) Trigger deploy. Enjoy 🎉"
