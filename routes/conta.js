var express = require('express');
var router = express.Router();
var models = require('../models/index');
var cliente = require('./cliente');
const { getContasByCliente, getContaById, getExtrato } = require('../controller/conta');
const { reqToken } = require('../controller/auth');

// RETORNA TODAS AS CONTAS
router.get('/', reqToken, getContasByCliente);

// RETORNA PELO NR DA CONTA
router.get('/saldo/:nrconta', reqToken, getContaById);

// RETORNA EXTRAO DA CONTA-CLIENTE
router.get('/extrato/:nrconta', reqToken, getExtrato);

module.exports = router;
