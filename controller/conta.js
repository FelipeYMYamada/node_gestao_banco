const { response } = require('express');
const models = require('../models/index');
const { getBearerToken, getClienteIdToken } = require('../controller/auth');

// BUSCA TODAS AS CONTAS DO CLIENTE
exports.getContasByCliente = (req, res) => {
    const token = getBearerToken(req);
    const id = getClienteIdToken(token);

    models.conta.findAll({ 
        where:{ 'cliente_id': id }, 
        attributes: ['nr_conta', 'saldo']
    })
        .then(conta => res.json({ conta }))
        .catch(error => res.json({ error }));
};

// BUSCA CONTA DO CLIENTE PELO NUMERO DA CONTA
exports.getContaById = (req, res) => {
    const token = getBearerToken(req);
    const id = getClienteIdToken(token);

    models.conta.findOne({
        where: { 'nr_conta': req.params.nrconta, 'cliente_id': id },
        attributes: ['nr_conta', 'saldo']
    })
        .then(conta => res.json({ conta }))
        .catch(error => res.json({ error }));
};

// BUSCA EXTRATO DA CONTA POR NUMERO DA CONTA E ID DO CLIENTE
exports.getExtrato = async (req, res) => {
    const token = getBearerToken(req);
    const id = getClienteIdToken(token);

    const sql = 'SELECT t.tipo_transacao, t.valor, t.data_transacao FROM transacoes_conta t '
    + 'INNER JOIN conta c ON c.id = t.conta_id '
    + 'WHERE c.nr_conta= \'' + req.params.nrconta + '\' AND c.cliente_id = ' + id + ' ORDER BY t.id DESC';

    const extrato = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
    res.json({ nr_conta: req.params.nrconta, extrato });
};

// DECREMENTAR SALDO TODA VEZ QUE FOR REALIZADO UM PAGAMENTO
// PARAMS (req, id) = REQUEST E ID DO CLIENTE
// REQ BODY { NR_CONTA, VALOR }
exports.saldoPagar = async ({ nr_conta, valor }, id) => {
    await models.conta.decrement('saldo', {
        by: valor,
        where: { 'nr_conta': nr_conta, 'cliente_id': id }
    });

    const conta = await models.conta.findOne({ where: { 'nr_conta':nr_conta, 'cliente_id':id } });
    return conta;
}

// INCREMENTAR SALDO
// PARAMS (req) = REQUEST
// REQ BODY { NR_CONTA, VALOR }
exports.saldoReceber = async ({ nr_conta_receber, valor }) => {
    await models.conta.increment('saldo', {
        by: valor,
        where: { 'nr_conta': nr_conta_receber }
    });

    const conta = await models.conta.findOne({ where: { 'nr_conta':nr_conta_receber } });
    return conta;
}
