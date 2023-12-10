const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  admin: {
    type: String,
    required: true,
    lowercase: true,
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;