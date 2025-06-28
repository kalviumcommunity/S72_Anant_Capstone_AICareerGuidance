const mongoose=require('mongoose')


const QuestionModel=new mongoose.Schema({
    text:{
        type:String,
        required: true,
        unique: true
    },
    type:{
        type:String,
        enum:["mcq","text"],
        default:"mcq"
    },
    options:{
        type: [String]
    },
    category:{
        type:String,
        required: true
    },
    createdAt: {type:Date,default: Date.now}
})


const Question=mongoose.model("Question",QuestionModel)
module.exports=Question