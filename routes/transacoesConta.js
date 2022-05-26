var express = require('express');
var router = express.Router();
const { reqToken } = require('../controller/auth');
const { pagar, transferir } = require('../controller/transacoesConta');

router.put('/pagar', reqToken, pagar);
router.post('/transferir', reqToken, transferir);

module.exports = router;
