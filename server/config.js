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

var urlDB = 'mongodb+srv://leonidas:m4OibyR58Vv5sykH@cluster0-syfyl.mongodb.net/coffe_db';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffe_db';
}

process.env.URLDB = urlDB;