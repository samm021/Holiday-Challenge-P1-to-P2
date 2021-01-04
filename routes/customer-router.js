const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customer-controller');

router.get('/', CustomersController.getCustomers);
router.get('/register', CustomersController.addCustomerGet);
router.post('/register', CustomersController.addCustomerPost);
router.get('/:idCustomer/editProfile', CustomersController.editCustomerGet);
router.post('/:idCustomer/editProfile', CustomersController.editCustomerPost);
router.get('/:idCustomer/accounts', CustomersController.getAndAddAccountsGet);
router.post('/:idCustomer/accounts', CustomersController.getAndAddAccountsPost);
router.get('/:idCustomer/accounts/:idAccount/transfer', CustomersController.transferAccountGet);
router.post('/:idCustomer/accounts/:idAccount/transfer', CustomersController.transferAccountPost);

module.exports = router;
