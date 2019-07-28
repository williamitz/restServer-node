require('./server/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true }, (err, resp) => {
    if (err) throw err;

    console.log('Conexion con éxito');
});


app.use(require('./server/routes/user'));


app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto ', process.env.PORT);
});

//module.exports = app;