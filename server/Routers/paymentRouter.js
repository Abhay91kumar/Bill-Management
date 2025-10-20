const express = require('express');
const router = express.Router();
const paymentCtrl = require('../Controller/paymentCtrl');


router.post('/create', paymentCtrl.createPayment);
router.get('/', paymentCtrl.getPayments);
router.put('/:id', paymentCtrl.updatePayment);
router.delete('/:id', paymentCtrl.deletePayment);

module.exports = router;
