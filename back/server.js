/* Import des modules necessaires */
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ encoding: "latin1" });

mongoose.set('strictQuery', false);

/* Connection BDD mongoose */
mongoose
    .connect(process.env.DBP6CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // Demarrage serveur
    .then(() =>
        app.listen(process.env.SERVERPORT, () => {
            console.log(
                `Le serveur est lancé sur le port ${process.env.SERVERPORT}.!`
            );
        })
    )
    // Arret du serveur si connection impossible
    .catch(() => console.log("Le server n'est pas connecté !"));

