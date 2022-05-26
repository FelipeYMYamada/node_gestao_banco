var express = require('express');
var router = express.Router();
const { login, reqToken } = require('../controller/login');

router.get('/', login);

module.exports = router;
