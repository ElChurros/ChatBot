const passwordHash = require("password-hash");

const jwt = require('jwt-simple');
const config = require('../../config/config');

const User = require('../../schema/userSchema');
const Message = require('../../schema/messageSchema');

function register(req, res) {
        if (!req.body.username || !req.body.email || !req.body.password) {
                //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                res.status(400).json({
                        "text": "Invalid request"
        })
        } else {
                var user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: passwordHash.generate(req.body.password)
                }
                var findUser = new Promise(function (resolve, reject) {
                        User.findOne({
                                email: user.email
                        }, function (err, result) {
                                if (err) {
                                        reject(500);
                                } else {
                                        if (result) {
                                                reject(204)
                                        } else {
                                                resolve(true)
                                        }
                                }
                        })
                })

                findUser.then(function () {
                        var _u = new User(user);
                        _u.save(function (err, user) {
                                if (err) {
                                        res.status(500).json({
                                                "text": "Erreur interne"
                                        })
                                } else {
                                        res.status(200).json({
                                                "text": "Succès",
                                                "token": user.getToken()
                                        })
                                }
                        })
                }, function (error) {
                        switch (error) {
                                case 500:
                                res.status(500).json({
                                        "text": "Erreur interne"
                                })
                                break;
                                case 204:
                                res.status(204).json({
                                        "text": "L'adresse email existe déjà"
                                })
                                break;
                                default:
                                res.status(500).json({
                                        "text": "Erreur interne"
                                })
                        }
                })
        }
}

function login(req, res) {
        if (!req.body.email || !req.body.password) {
                //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                res.status(400).json({
                        "text": "Requête invalide"
                })
        } else {
                User.findOne({
                        email: req.body.email
                }, function (err, user) {
                        if (err) {
                                res.status(500).json({
                                        "text": "Erreur interne"
                                })
                        } else if (!user) {
                                res.status(401).json({
                                        "text": "L'utilisateur n'existe pas"
                                })
                        } else {
                                if (user.authenticate(req.body.password)) {
                                        res.status(200).json({
                                                "token": user.getToken(),
                                                "text": "Authentification réussi"
                                        })
                                } else {
                                        res.status(401).json({
                                                "text": "Mot de passe incorrect"
                                        })
                                }
                        }
                })
        }
}

function getMessages(req, res) {
        console.log(req.decoded_token);
        Message.find({user_id: req.decoded_token._id}, function (err, messages) {
                if (err) {
                        res.status(500).json({
                                "text": "Erreur interne"
                        })
                } else {
                        res.send(messages);
                }
        })
}

function addMessage(req, res) {
        console.log(req.user);
        var message = {
                user_id: req.user,
                text: req.body.new_message,
                generated: false
        };

        var _m = new Message(message);
        _m.save(function (err, message) {
                console.log(message);
                if (err) {
                        res.status(500).json({
                                "text": "Erreur interne"
                        })
                } else {
                        res.status(200).json({
                                "text": "Message POST successful",
                                "new_message": message
                        })
                }
        })
}

function requireAuth(req, res, next) {
        if (!req.body.token) {
                res.status(401).json({
                        "text": "Authentication needed"
                })
        } else {
                req.decoded_token = jwt.decode(req.body.token, config.secret);
                User.findOne({
                        email: req.decoded_token.email
                }, function (err, user) {
                        if (err) {
                                res.status(500).json({
                                        "text": "Erreur interne"
                                })
                        } else if (!user || !user.checkToken(req.body.token)) {
                                res.status(401).json({
                                        "text": "Bad Token"
                                })
                        } else {
                                req.user = user;
                                next();
                        }
                })
        }
}

exports.login = login;
exports.register = register;
exports.requireAuth = requireAuth;
exports.getMessages = getMessages;
exports.addMessage = addMessage;
