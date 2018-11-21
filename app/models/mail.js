const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new mongoose.Schema({
    emisor: { type: Schema.ObjectId, ref: 'User' },
    receptor: [{ type: Schema.ObjectId, ref: 'User' }],
    asunto: String,
    mensaje: String
});


module.exports = mongoose.model('Mail', mailSchema);