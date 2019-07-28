// =========================
//  configurando el puerto
// ==========================

process.env.PORT = process.env.PORT || 3000;

// =========================
//  configurando el entorno
// ==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =========================
//  configurando la cadena de conexion
// ==========================

var urlDB = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffe_db';
}

process.env.URLDB = urlDB;