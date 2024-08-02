const { exec } = require('child_process');

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error('DB_URL is not defined');
    process.exit(1);
}

const command = `psql ${dbUrl} -f backup.sql`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors de l'exécution : ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Erreur : ${stderr}`);
        return;
    }
    console.log(`Sortie : ${stdout}`);
});