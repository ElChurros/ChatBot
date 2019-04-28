const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var userSchema = mongoose.Schema({
        username: {
                type: String,
                trim: true,
                required: true,
        },
        email: {
                type: String,
                lowercase: true,
                trim: true,
                unique: true,
                required: true
        },
        password: {
                type: String,
                required: true
        }
},{ timestamps: { createdAt: 'created_at' }})

userSchema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	},
        checkToken: function(token) {
                return (jwt.encode(this, config.secret) == token);
        }
}

module.exports = mongoose.model('User', userSchema);
