const { Customer, Account } = require('../models');
const { toLocale } = require('../helpers/tolocale');
const { firstBalance } = require('../helpers/firstbalance');

class CustomersController {
    static getCustomers = (req, res) => {
        Customer.findAll({order: [['fullName', 'ASC']]})
        .then(output => res.render('customer-list', {output}))
        .catch(err => res.send(err));
    }
    static addCustomerGet = (req, res) => {
        const error = req.query.err ? req.query.err.substring(44).replace(/[\n\r]/g,' ').split(', notNull Violation: ').join(' , ').split(', Validation error: ').join(' , ') : null;
        res.render('customer-add', {error});
    }
    static addCustomerPost = (req, res) => {
        for (let key in req.body) {
            if (!req.body[key]) {
                req.body[key] = null;
            }
        }
        const { identityNumber, fullName, address, birthDate, gender } = req.body;
        Customer.create({ identityNumber, fullName, address, birthDate, gender })
        .then(_=> res.redirect('/customers'))
        .catch(err => res.redirect(`/customers/register?err=${err}`));
    }
    static editCustomerGet = (req, res) => {
        const idCustomer = req.params.idCustomer;
        const error = req.query.err ? req.query.err.substring(44).replace(/[\n\r]/g,' ').split(', notNull Violation: ').join(' , ').split(', Validation error: ').join(' , ') : null;
        Customer.findByPk(idCustomer)
        .then(output => res.render('customer-edit', {output, error}))
        .catch(err => res.send(err));
    }
    static editCustomerPost = (req, res) => {
        const id = req.params.idCustomer;
        for (let key in req.body) {
            if (!req.body[key]) {
                req.body[key] = null;
            }
        }
        const { identityNumber, fullName, address, birthDate, gender } = req.body;
        Customer.update({identityNumber, fullName, address, birthDate, gender }, {where: {id}})
        .then(_=> res.redirect('/customers'))
        .catch(err => res.redirect(`/customers/${id}/editProfile?err=${err}`));
    }
    static getAndAddAccountsGet = (req, res) => {
        const id = req.params.idCustomer;
        const error = req.query.err ? req.query.err.substring(44) : null;
        Customer.findByPk(id, {include: Account})
        .then(output => {
            res.render('list-account', {output, error, toLocale})
        })
        .catch(err => res.send(err));
    }
    static getAndAddAccountsPost = (req, res) => {
        const CustomerId = req.params.idCustomer;
        const type = req.body.type;
        const balance = firstBalance(req.body.balance);
        Account.create({type, balance, CustomerId})
        .then(_=> res.redirect(`/customers/${CustomerId}/accounts`))
        .catch(err => res.redirect(`/customers/${CustomerId}/accounts?err=${err}`));
    }
    static transferAccountGet = (req, res) => {
        const error = req.query.err ? req.query.err.substring(7) : null;
        const idAccount = req.params.idAccount;
        Promise.all([Account.findByPk(idAccount), Account.findAll({include: Customer})])
        .then(output => {
            let output2 = output[1];
            output = output[0];
            res.render('transfer', {output, output2, error, toLocale})
        })
        .catch(err => res.send(err));
    }
    static transferAccountPost = (req, res) => {
        const idAccount = req.params.idAccount;
        const CustomerId = req.params.CustomerId;
        const { amount, id } = req.body;
        Account.findByPk(idAccount)
        .then(output => {
            output.balance = +output.balance - +amount;
            output = { balance: output.balance }
            return Account.update(output, {where: {id: idAccount}});
        })
        .then(_=> {
            return Account.findByPk(id)
        })
        .then(output => {
            output.balance = +output.balance + +amount;
            output = { balance: output.balance }
            return Account.update(output, {where: {id}})
        })
        .then(_ => {
            res.redirect(`/customers/${CustomerId}/accounts/${idAccount}/transfer`);
        })
        .catch(err => {
            res.redirect(`/customers/${CustomerId}/accounts/${idAccount}/transfer?err=${err}`);
        })
    }
}

module.exports = CustomersController;