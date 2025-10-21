const express = require('express');
const router = express.Router();
const paymentCtrl = require('../Controller/paymentCtrl');


router.post('/create', auth, paymentCtrl.createPayment);
router.get('/', auth, paymentCtrl.getPayments);
router.put('/:id', auth, paymentCtrl.updatePayment);
router.delete('/:id', auth, paymentCtrl.deletePayment);

module.exports = router;
