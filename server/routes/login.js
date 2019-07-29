const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {
    let data = req.body;

    User.findOne({ email: data.email }, (err, document) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }

        if (!document) {
            return res.json({
                ok: false,
                error: {
                    message: "(Usuario) o contraseña incorrecto"
                }
            });
        }

        if (!bcrypt.compareSync(data.password, document.password)) {
            return res.json({
                ok: false,
                error: {
                    message: "Usuario o (contraseña) incorrecto"
                }
            });
        }

        let token = jwt.sign({
            usuario: document
        }, process.env.SEED, { expiresIn: process.env.EXPIRED_TOKEN });

        res.json({
            ok: true,
            user: document,
            token
        });

    });

});

module.exports = app;