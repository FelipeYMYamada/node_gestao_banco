var express = require('express');
var router = express.Router();
const { create, getClienteLogado } = require('../controller/cliente');
const { reqToken } = require('../controller/auth');

// CRIAR NOVO CLIENTE
router.post('/novo', reqToken, create);

// INFORMACOES DO USUARIO LOGADO
router.get('/info', reqToken, getClienteLogado);

module.exports = router;
