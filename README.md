# O'Coffee Déploiement

Déploiement d'un site web avec Docker
Introduction

Ce document explique les étapes nécessaires pour déployer un site web utilisant Node.js, Express et PostgreSQL avec Docker. Le processus implique la configuration de l'environnement, la préparation des fichiers Docker, et le déploiement de l'application.
Étapes de déploiement

## 1. Préparation de l'environnement Docker

But: Mettre en place l'infrastructure nécessaire pour exécuter des conteneurs Docker.
Installer Docker Desktop
Configurer WSL (Windows Subsystem for Linux) si nécessaire
Vérifier l'installation avec
```
docker --version
docker-compose --version
```

## 2. Configuration du projet

But: Préparer les fichiers nécessaires pour la conteneurisation de l'application.


### Création du Dockerfile


```
FROM node:14 AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:14
WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "start"]
```

### Création du docker-compose.yml

```
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: ocoffee
      POSTGRES_USER: ocoffeeadmin
      POSTGRES_PASSWORD: ocofffee
```

## 3. Configuration de la base de données

But: Établir la connexion entre l'application et la base de données PostgreSQL.

- Créer un fichier .env avec les informations de connexion :

```
PG_URL=postgres://ocoffeeadmin:ocofffee@db:5432/ocoffee
```

## 4. Modification du code source

But: Adapter le code de l'application pour fonctionner dans un environnement Docker.

```
// Configuration de la connexion à la base de données
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.PG_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Tester la connexion à la base de données
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erreur de connexion à la base de données:', err.stack);
    }
    console.log('Connecté à la base de données');
    release();
});

// Rendre le pool de connexion disponible dans l'application
app.locals.db = pool;
```

## 5. Construction et démarrage des conteneurs

But: Créer et lancer les conteneurs Docker.

```
docker-compose build
docker-compose up
```

## 6. Dépannage

But: Résoudre les problèmes courants lors du déploiement.

Vérifier les logs des conteneurs :

```
docker-compose logs
```

Résoudre les problèmes de connexion SSL à la base de données : 

```
# Postgres Database URL
PG_URL=postgres://ocoffeeadmin:ocofffee@db:5432/ocoffee?sslmode=disable
```

## 7. Vérification du déploiement

But: S'assurer que l'application fonctionne correctement.

Connecter la base de données sur DockerDesktop.

Accéder à l'application via Docker Desktop

Tester les fonctionnalités principales