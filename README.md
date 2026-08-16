# Exxo

Application full-stack avec une interface React/Vite et une API FastAPI.

## Prérequis

- Node.js 20.19+ ou 22.12+
- Python 3.10 ou plus récent

## Développement local

### API

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r backend/requirements.txt
python -m uvicorn app.main:app --app-dir backend --reload
```

L'API est disponible sur `http://localhost:8000` et sa documentation sur `http://localhost:8000/docs`.

Les valeurs par défaut autorisent uniquement `localhost` et `127.0.0.1`. Le fichier `.env.example` documente les variables disponibles ; l'application lit ces valeurs depuis l'environnement du processus.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le site est disponible sur l'adresse affichée par Vite (généralement `http://localhost:5173`).

## Construire le frontend pour la production

```bash
cd frontend
npm ci
npm run build
```

Le résultat se trouve dans `frontend/dist`. Les polices sont intégrées au build : aucune requête vers Google Fonts n'est effectuée par les visiteurs.

Le fichier `public/_headers`, copié dans `dist`, configure CSP, HSTS et les principaux en-têtes de sécurité sur les hébergeurs compatibles avec ce format. Sur un autre hébergeur, recopiez ces mêmes valeurs dans sa configuration HTTP.

## Déployer l'API

L'API n'est pas utilisée par le frontend dans cette V1. Ne la déployez que si elle est nécessaire.

Pour un déploiement reproductible :

```bash
python -m pip install -r backend/requirements.lock
```

Variables de production :

```text
EXXO_ENVIRONMENT=production
EXXO_ALLOWED_HOSTS=api.example.com
EXXO_CORS_ORIGINS=https://example.com
EXXO_ENABLE_API_DOCS=false
```

- `EXXO_ALLOWED_HOSTS` est obligatoire en production et accepte une liste séparée par des virgules.
- `EXXO_CORS_ORIGINS` peut rester vide lorsque le frontend n'appelle pas l'API ou lorsque les deux utilisent la même origine.
- La documentation OpenAPI est active par défaut en développement et désactivée par défaut en production.
- Le HTTPS et la redirection HTTP vers HTTPS doivent être assurés par le reverse proxy ou la plateforme d'hébergement.

Exemple de démarrage derrière un reverse proxy HTTPS :

```bash
python -m uvicorn app.main:app --app-dir backend --host 0.0.0.0 --port 8000
```

N'utilisez jamais l'option `--reload` en production.
