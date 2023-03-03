const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const dotenv = require("dotenv").config({ encoding: "latin1" });


exports.signup = (req, res, next) => {
    // Hashage du mot de passe utilisateur

    bcrypt
        .hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });

            user
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    // Verification utilisateur existant
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            // Verification mot de passe utilisateur
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }

                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                            expiresIn: "1h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};