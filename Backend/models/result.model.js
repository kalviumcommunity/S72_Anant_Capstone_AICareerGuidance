const mongoose=require('mongoose')


const ResultModel=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    careerTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    education_requirements:{
        type:String,
        required:true
    },
    best_companies:{
        type:[String],
        required:true
    },
    career_paths:{
        type:[String],
        required:true
    },
    required_skills:{
        type:[String],
    },
    job_outlook:{
        type:[String]
    },
    createdAt: {type:Date,default: Date.now}
})


const Result=mongoose.model("Result",ResultModel)
module.exports=Result