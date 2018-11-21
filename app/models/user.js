const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: String,
    ciudad: String,
    provincia: String,
    pais: String
});


userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); //para cifrar contraseña antes de guardarla en db
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);