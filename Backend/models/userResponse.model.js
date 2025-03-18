const mongoose=require('mongoose')


const UserResponseModel=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    responses:[{
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            required: true
        },
        answer:{
            type:String,
            required:true
        }
    }],
    createdAt: {type:Date,default: Date.now}
})


const UserResponse=mongoose.model("UserResponse",ResponseModel)
module.exports=UserResponse