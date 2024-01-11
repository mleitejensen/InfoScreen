const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    value: {type: String},
})

const BackgroundMusic = mongoose.model('music', musicSchema);

module.exports = BackgroundMusic;