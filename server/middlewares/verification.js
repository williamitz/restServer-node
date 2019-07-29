/**
 *middleware para verification del rol 
 *
 */

let verifyRol = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'No tiene permiso a crear usuarios'
            }
        });
    }


    next();
};

module.exports = {
    verifyRol
};