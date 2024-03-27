const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const walletController = require('../controllers/walletController');

router.post('/customer', customerController.createCustomer);
router.get('/customers', customerController.getAllCustomers);
router.patch('/customer/:customerId', customerController.updateCustomer);
router.delete('/customer/:customerId', customerController.deleteCustomer);
router.patch('/wallet/update/:customerId', walletController.updateWallet);

module.exports = router;