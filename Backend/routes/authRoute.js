const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../models/user.model')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()


const router=express.Router()

router.post('/signup',async (req,res)=>{

    console.log(req.body)

    const {name,email,password}=req.body

    try {

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        
        const existingUser= await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message: "User Already Exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=new User({name,email,password: hashedPassword})

        await newUser.save()

        const token=jwt.sign({id: newUser._id,name: newUser.name,email: newUser.email},process.env.JWT_SECRECT_KEY,{expiresIn:"1h"})

        res.status(201).json({ user: { id: newUser._id, name: newUser.name, email: newUser.email }, token });

        console.log("token", token)

    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal server error"})
    }
})



router.get("/user", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log("Received Token:",token)
  
      if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRECT_KEY);
      const user = await User.findById(decoded.id).select("-password"); // Don't send password
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ user });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  });

router.post('/login',async (req,res)=>{
    const {email,password}=req.body

    console.log(email)
    console.log(password)

    try{
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user=await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message: "Wrong password"})
        }

        const token=jwt.sign({
            id: user._id,name:user.name,email: user.email
        },process.env.JWT_SECRECT_KEY,{expiresIn: "1hr"})

        return res.status(200).json({user:{id: user._id,name: user.name, email:user.email},token})

    }catch(error){
        return res.status(500).json({message: "Something went wrong.. Try again!!"})
    }
})
  

module.exports=router