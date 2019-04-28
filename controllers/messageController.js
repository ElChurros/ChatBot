var express = require('express');
var router = express.Router();

const account = require('./account/lib.js');

router.post('/', account.requireAuth, account.getMessages);
router.post('/new', account.requireAuth, account.addMessage);

module.exports = router;
