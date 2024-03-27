const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/customers', customerController.getAllCustomers);
router.post('/customer', customerController.createCustomer);
router.delete('/customer/:customerId', customerController.deleteCustomer);

module.exports = router;