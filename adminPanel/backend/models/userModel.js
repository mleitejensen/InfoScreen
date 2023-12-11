const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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

userSchema.statics.signup = async function(username, password) {
    if (!username || !password) {
      throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ username })

    if (exists) {
      throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, admin: "no" })

    console.log(`[userModel] ${user.username} created`)
    return user
}

const User = mongoose.model('user', userSchema);

module.exports = User;