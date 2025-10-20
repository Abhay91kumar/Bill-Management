const express = require('express');
const mongoose = require('mongoose');
// const cookiesParser=require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const Port = process.env.PORT || 5000;
const app = express();

const allowedOrigin = 'https://kharti.netlify.app/';
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());
// app.use(cookiesParser());


app.listen(Port, () => {
    console.log('Server is Running....')
})


//Router
app.use('/user', require('./Routers/userRouter'))
app.use('/api/payment', require('./Routers/paymentRouter'))

//Connect MongoDB
const mongo_URI=process.env.MONGO_URI;
// console.log(mongo_URI);

mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
})

