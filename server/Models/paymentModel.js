const mongoose=require('mongoose')

const paymentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    mode:{
        type:String,
        enum:['Online','Cash'],
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User", required: true 
        }
},{ timestamps: true })
module.exports=mongoose.model('Payment',paymentSchema)
