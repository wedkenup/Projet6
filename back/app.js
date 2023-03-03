const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const sauceRoutes = require("./routes/sauce.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    })
);

app.use(
    rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
        message:
            "Vous avez effectué plus de 100 requêtes dans une limite de 10 minutes!",
        headers: true,
    })
);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;