const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/user');
const { validateToken } = require('../middlewares/authentication');
const { verifyRol } = require('../middlewares/verification');
const app = express();

/**
 * Los midleweare son funciones que se ejecutan cuando se quiera usar un api
 * reciben 3 parámetros req, res, next -> este ultimo se llama para que continue el script del api
 */

app.get('/usuarios', validateToken, (req, res) => {
    const data = req.query;
    const skip = (data.page - 1) * 5;

    let User = Usuario;
    //filter      //projection         //options paginate    
    User.find({ statusRegister: true }, ['name', 'email', 'registrationDate'], { skip, limit: 5 })
        .exec((err, documents) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            User.countDocuments({ statusRegister: true }, (err, total) => {
                res.json({
                    ok: true,
                    usuarios: documents,
                    total
                });
            });

        });
});

app.post('/usuario/add', [validateToken, verifyRol], (req, res) => { //cuando se envía a travez de body

    // Una vez validado el token los datos de usuario los tenemos en req.usuario

    const data = req.body;

    let User = new Usuario({
        name: data.nameUser,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10)
    });
    User.save((err, document) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            usuario: document
        });
    });


});

app.put('/usuario/update', [validateToken, verifyRol], (req, res) => {
    const data = req.body; //  _.pluck(req.body, ['name','email','role']); el pluck se usa para extraer los campos que se requieran
    let User = Usuario;
    let update = {
        name: data.nameUser,
        email: data.email,
        modificationDate: new Date()
    };
    User.findByIdAndUpdate(data.id, update, { new: true, runValidators: true, context: 'query' }, (err, document) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json(document);
    })
});

app.delete('/usuario/delete', [validateToken, verifyRol], (req, res) => {
    const data = req.body;
    let User = Usuario;
    let update = {
        statusRegister: false,
        disposalDate: new Date()
    };

    User.updateOne({ '_id': data.id }, update, null, (err, document) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json(document);
    });

});

module.exports = app;