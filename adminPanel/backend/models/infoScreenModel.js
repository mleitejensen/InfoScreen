const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    type: {type: String},
    value: {type: String},
    duration: {type: Number},
    order: {type: Number,},
    topText: {type: String},
    bottomText: {type: String},
}, {unique: true});

const InfoScreen = mongoose.model('info-element', infoSchema);

module.exports = InfoScreen;