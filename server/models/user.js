const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let roleValidation = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido'],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v);
            },
            message: 'no es un email válido'
        }
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleValidation
    },
    statusRegister: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    modificationDate: {
        type: Date,
        required: false
    },
    disposalDate: {
        type: Date,
        required: false
    }
});



// PATH hace referencia al campo que no cumple con la regla
/**
 * cuando no se cumplen varias reglas, el plugin mongoose retorna todos los mensajes de error
 **/
userSchema.plugin(uniqueValidator, { message: '{VALUE} ya existe en la base de datos' });

userSchema.methods.toJSON = function() {
    let user = this;
    let objUser = user.toObject();
    delete objUser.password;

    return objUser;
}

module.exports = mongoose.model('User', userSchema);