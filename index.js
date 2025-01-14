import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import router from './app/router.js';
import pg from 'pg';

const PORT = process.env.PORT || 3000;
const app = express();

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

// Configuration de notre moteur de templates
app.set("views", path.join("app", "views"));
app.set("view engine", "ejs");

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static("integration"));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((req, res) => {
    res.status(404).render('error404');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
