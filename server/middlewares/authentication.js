/**
 * Definiremos un middleware que se dispare cuando se quiera utilizar un api
 * con ella validaremos el token
 */

const jwt = require('jsonwebtoken');

let validateToken = (req, res, next) => {
    // para extraer los headers se utiliza req.get('var')
    let token = req.get('Authorization');

    // la funcion verify me sirve para decodificar el token
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                error: err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};

module.exports = {
    validateToken
}