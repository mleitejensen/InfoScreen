const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    type: {type: String},
    value: {type: String},
    order: {type: Number,}
}, {unique: true});

const InfoScreen = mongoose.model('info-element', infoSchema);

module.exports = InfoScreen;