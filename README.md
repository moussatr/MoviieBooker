# MoviieBooker

# 🎬 Movie Reservation API

Une API REST construite avec **NestJS**, **TypeORM** et **PostgreSQL**, permettant :

- l'authentification des utilisateurs (JWT),
- la réservation de films,
- la consultation et la recherche de films,
- la gestion des genres.


## 🚀 Lancer le projet

# Cloner le projet
git clone https://github.com/moussatr/MoviieBooker.git
cd movie-reservation-api

# Installer les dépendances
npm install

# Lancer en développement
npm run start:dev

> 🛠️ N'oublie pas d’ajouter un fichier `.env` avec les bonnes variables (voir `.env.example` si dispo).


## 📚 Documentation Swagger

Accès à la documentation interactive :

http://localhost:3000/api

Générée automatiquement avec `@nestjs/swagger`.


## 🔐 Authentification (`/auth`)

| Méthode | Endpoint         | Description                      |
|---------|------------------|----------------------------------|
| POST    | `/auth/register` | Enregistrement d’un utilisateur  |
| POST    | `/auth/login`    | Connexion d’un utilisateur       |

## 🎟️ Réservations (`/reservation`)

| Méthode | Endpoint           | Description                             | Auth |
|---------|--------------------|-----------------------------------------|------|
| POST    | `/reservation`     | Crée une réservation                    | ✅   |
| GET     | `/reservation`     | Liste toutes les réservations           | ✅  |
| POST    | `/reservation/:id` | Supprime une réservation (via query id) | ✅   |


## 📽️ Films (`/movie`)

| Méthode | Endpoint                      | Description                                |
|---------|-------------------------------|--------------------------------------------|
| GET     | `/movie/movies`               | Liste des films (pagination / tri)         |
| GET     | `/movie/movie/now_playing`    | Films actuellement à l’affiche             |
| GET     | `/movie/search/movie`         | Recherche un film                          |
| GET     | `/movie/movie/:movie_id`      | Détail d’un film par ID (via query)        |
| GET     | `/movie`                      | Liste des genres disponibles               |


## 🛠 Stack Technique

- **Framework** : NestJS
- **ORM** : TypeORM
- **Base de données** : PostgreSQL
- **Documentation API** : Swagger (OpenAPI)
- **Sécurité** : JWT + `@UseGuards(JwtAuthGuard)`

## 🔒 Authentification JWT

- Génération de token JWT à la connexion.
- Routes protégées par `JwtAuthGuard`.
- Token à inclure dans l’en-tête `Authorization: Bearer <token>`.


## 🧠 Sources et inspirations

- 🔐 [Building a Login and Registration System Using NestJS with TypeORM and PostgreSQL](https://dev.to/buildwithgagan/building-a-login-and-registration-system-using-nestjs-with-typeorm-and-postgresql-19hh)
- 📘 [NestJS Swagger (OpenAPI)](https://docs.nestjs.com/openapi/introduction)
- 🇫🇷 [Types et paramètres Swagger dans NestJS](https://nestjs.fr/openapi/types-and-parameters/)
- 🌐 [Utilisation d’Axios avec le module HTTP](https://docs.nestjs.com/techniques/http-module#using-axios-directly)


## ✅ À faire

- [ ] Ajout des tests unitaires

## 🤝 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit (`git commit -am 'Ajout de ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request
