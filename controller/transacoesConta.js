const { response } = require('express');
const models = require('../models/index');
const { getBearerToken, getClienteIdToken } = require('../controller/auth');
const { saldoPagar, saldoReceber } = require('./conta');

// REALIZAR PAGAMENTO 
// REQ BODY JSON { NR_CONTA, VALOR }
exports.pagar = async (req, res) => {
    const token = getBearerToken(req);
    const id = getClienteIdToken(token);

    const { nr_conta, valor } = req.body;
    const conta = await saldoPagar({ nr_conta, valor }, id);
    
    models.transacoesConta.create(
        { 'conta_id':conta.id, 'tipo_transacao':'PAGAR', 'valor':valor, 'data_transacao':new Date()}
    )
    .then(transacoesConta => res.json({ message:'Pagamento realizado com sucesso!' }))
    .catch(error => res.json({ error }));
};

// TRANSFERIR VALOR DE UMA CONTA PARA OUTRA
// REQ BODY JSON { NR_CONTA, NR_CONTA_RECEBER, VALOR }
exports.transferir = async (req, res) => {
    const token = getBearerToken(req);
    const id = getClienteIdToken(token);
    const { nr_conta, nr_conta_receber, valor } = req.body;

    try {
        const conta_pagar = await saldoPagar({ nr_conta, valor }, id);
        await models.transacoesConta.create(
            { 'conta_id':conta_pagar.id, 'tipo_transacao':'TRANSFERIANCIA - SAIDA', 'valor':valor, 'data_transacao':new Date()}
        );

        const conta_receber = await saldoReceber({ nr_conta_receber, valor });
        await models.transacoesConta.create(
            { 'conta_id':conta_receber.id, 'tipo_transacao':'TRANSFERIANCIA - ENTRADA', 'valor':valor, 'data_transacao':new Date()}
        );

        res.json({ message:'Transferência realiza com sucesso.' });
    } catch(error) {
        console.log(error);
        res.json({ message:'Ocorreu um erro ao fazer a transferência.' });
    }
};
