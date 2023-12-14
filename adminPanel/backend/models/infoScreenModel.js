const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  image: {
    type: String,
    unique: true,
  },
  video: {
    type: String,
    unique: true,
  },
  text: {
    type: String,
    unique: true,
  },
  index: {
    type: Number,
    unique: true,
    required: true,
  }
});

const InfoScreen = mongoose.model('infoScreen', infoSchema);

module.exports = InfoScreen;