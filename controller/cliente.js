const { response } = require('express');
const models = require('../models/index');
const crypto = require("crypto");
const { getBearerToken, getUserIdToken } = require('../controller/auth');

exports.create = (req, res) => {
    const { nome, email } = req.body;
    var senha = crypto.randomBytes(3).toString('hex');
    models.cliente.create({ nome, email, senha })
        .then(cliente => res.json({
            cliente,
            senha,
            message: 'Novo cliente cadastrado com sucesso!'
        }))
        .catch(error => res.json({ error }));
};

exports.getClienteLogado = (req, res) => {
    const token = getBearerToken(req);
    const id = getUserIdToken(token);

    models.cliente.findOne({where: { 'id': id}})
        .then(cliente => res.json({
            cliente
        }))
        .catch(error => res.json({ error }));
};
