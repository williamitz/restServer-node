// =========================
//  configurando el puerto
// ==========================

process.env.PORT = process.env.PORT || 3000;

// =========================
//  configurando el entorno
// ==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**
 * Vencimiento del web token
 * 60 segundos x 60 minutos x 24 horas x 30 días
 */

process.env.EXPIRED_TOKEN = 60 * 60 * 24 * 30;



/**
 * SEED de autenticación del token
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// =========================
//  configurando la cadena de conexion
// ==========================

var urlDB = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffe_db';
}

process.env.URLDB = urlDB;