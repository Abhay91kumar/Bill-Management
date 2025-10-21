const express = require('express');
const router = express.Router();
const paymentCtrl = require('../Controller/paymentCtrl');
const auth = require('../Middleware/auth'); 


router.post('/create', auth, paymentCtrl.createPayment);
router.get('/', auth, paymentCtrl.getPayments);
router.put('/:id', auth, paymentCtrl.updatePayment);
router.delete('/:id', auth, paymentCtrl.deletePayment);

module.exports = router;
