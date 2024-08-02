require('dotenv').config();

const path = require('path');

const express = require('express');

const router = require('./app/router');

const PORT = process.env.PORT || 3000;

const app = express();


// Configuration de notre moteur de templates
app.set("views", path.join(__dirname, "app", "views"));
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