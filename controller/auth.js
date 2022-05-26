const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

// PEGA O TOKEN ENVIADO E RETORNA TOKEN ( SEM 'Bearer' concatenado )
exports.getBearerToken = (req) => {
    const token = req.header('authorization').replace('Bearer ', '');
    return token;
};

// PEGA O ID DO USUARIO - TOKEN
exports.getClienteIdToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
};

exports.reqToken = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256']
});
