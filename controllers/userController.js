var express = require('express');
var router = express.Router();

const account = require('./account/lib.js');

router.post('/login', account.login);
router.post('/register', account.register);

module.exports = router;
