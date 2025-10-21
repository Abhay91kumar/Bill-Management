const Payment = require('../Models/paymentModel');
const { sendSMS } = require('../Middleware/sendSMS');

const paymentCtrl = {
    createPayment: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { name, fatherName, amount, mode, phone } = req.body;

            console.log("req.user:", req.user);
            console.log("Form data received:", { name, fatherName, amount, mode, phone });
            
            if (!name || !fatherName || !amount || !mode || !phone) {
                return res.status(400).json({ success: false, msg: "Please fill all required fields." });
            }
            
            const paymentData = { name, fatherName, amount, mode ,phone,user: user_id};
            console.log("Saving payment:", paymentData);
            
            const newPayment = new Payment(paymentData);
            await newPayment.save();

            // Send SMS automatically
            const smsResult = await sendSMS(phone, paymentData);

            res.json({
                success: true,
                msg: "✅ Payment added successfully and SMS sent!",
                data: newPayment,
                smsResult
            });

        } catch (err) {
      console.error("Create Payment Error:", err);
      res.status(500).json({ success: false, msg: err.message });
    }
},

    getPayments: async (req, res) => {
        try {
            const user_id = req.user.id;
            const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
            res.json(payments);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    // ✏️ Update payment
    updatePayment: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { name, fatherName, amount, mode } = req.body;

            const updated = await Payment.findByIdAndUpdate(
                req.params.id,
                { name, fatherName, amount, mode },
                { new: true }
            );

            if (!updated) return res.status(404).json({ msg: "Payment not found." });

            res.json({
                msg: "✅ Payment updated successfully!",
                payment: updated
            });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    // ❌ Delete payment
    deletePayment: async (req, res) => {
        try {
            const deleted = await Payment.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ msg: "Payment not found." });

            res.json({ msg: "🗑️ Payment deleted successfully!" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = paymentCtrl;
