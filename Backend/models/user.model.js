const mongoose=require('mongoose')


const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum: ["user","admin"],
        default: "user"
    },
    createdAt: {type:Date,default: Date.now}
})


const User=mongoose.model("User",UserModel)
module.exports=User