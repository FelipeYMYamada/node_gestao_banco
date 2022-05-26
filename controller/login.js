const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const { response } = require('express');
const models = require('../models/index');

// LOGIN
// REQ JSON BODY PARAMS { EMAIL, SENHA }
// BUSCA POR USUARIO COM EMAIL E SENHA ? RETORNA TOKEN : MENSAGEM EMAIL SENHA INVALIDA
// BEARER TOKEN JWT - ASSINA COM ID DO CLIENTE + JWT_SECRET(.ENV)
exports.login = async (req, res) => {
    const { email, senha } = req.body;
    const cliente = await models.cliente.findOne({where: { email, senha }});
    
    if(cliente === null) {
        return res.status(400).json({message: 'E-mail e/ou senha inválido(s)'});
    } else {
        var id = cliente.id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.json({token});
    }    
};

exports.reqToken = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256']
});
