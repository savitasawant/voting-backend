const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, default: null },
  role: { type: String, default: null },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null, select: false },
});

userSchema.methods.hashedPassword = function (password) {
  const salt = process.env.SALT;
  return crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function (password) {
  const salt = process.env.SALT;
  const hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');

  return hashed_password == this.password;
}

userSchema.methods.generateJWT = function () {
  // Set to token expiry to 7 days from now
  const token_expiry = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7);
  return jwt.sign({
      email: this.email,
      id: this._id,
      exp: token_expiry
  }, process.env.SECRET);
}

userSchema.methods.toAuthJSON = function () {
  return {
      _id: this._id,
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      token: this.generateJWT(),
  };
};

// Encrypt the password before storing it
userSchema.pre('save', function (next) {
  if (this.password) this.password = this.hashedPassword(this.password);
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  // Hashed the password before storing it
  if (this._update.password) this._update.password = this.model.schema.methods.hashedPassword(this._update.password);

  // Set the `updated_at` with current timestamp
  this._update.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);