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
        required: false // Made optional for OAuth users
    },
    authMethod: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    role:{
        type:String,
        enum: ["user","admin"],
        default: "user"
    },
    testHistory: [{
        date: { type: Date, default: Date.now },
        recommendations: [
            {
                title: String,
                description: String,
                education_requirements: String,
                job_outlook: [String],
                career_paths: [String],
                required_skills: [String],
                best_companies: [String]
            }
        ]
    }],
    profilePicture: {
        type: String,
        default: '' // Default empty string or a placeholder URL
    },
    createdAt: {type:Date,default: Date.now}
})


const User=mongoose.model("User",UserModel)
module.exports=User