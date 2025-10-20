/*const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


const sendSMS = async (to, paymentData) => {
  try {
    const { name, fatherName, amount, mode } = paymentData;
    const messageBody = `Hello ${name} (Father: ${fatherName}), your payment of ₹${amount} via ${mode} has been received successfully.`;

    const msg = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });

    console.log('Message sent! SID:', msg.sid);
    return { success: true, sid: msg.sid };

  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};

module.exports = { sendSMS };*/


// Middleware/sendSMS.js
const axios = require('axios');

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID || 'TESTSMS';

const sendSMS = async (to, paymentData) => {
  try {
    const { name, fatherName, amount, mode } = paymentData;
    const messageBody = `Hello ${name} (Father: ${fatherName}), your payment of ₹${amount} via ${mode} has been received successfully.`;

    const phone = to.replace(/\D/g, '').slice(-10); // last 10 digits
    const url = `https://api.msg91.com/api/sendhttp.php?authkey=${MSG91_AUTH_KEY}&mobiles=${phone}&message=${encodeURIComponent(messageBody)}&sender=${MSG91_SENDER_ID}&route=4&country=91`;

    const res = await axios.get(url, { timeout: 10000 });
    console.log('MSG91 API response:', res.data);

    return { success: true, response: res.data };
  } catch (err) {
    console.error('MSG91 error:', err.response?.data || err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendSMS };
