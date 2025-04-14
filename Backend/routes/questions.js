const express=require('express')
const router=express.Router()
const Question=require('../models/question.model')


router.get("/", async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error message:-", error.message);
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports=router