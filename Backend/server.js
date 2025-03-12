require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')


app.use(cors())

const PORT=process.env.PORT


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to DataBase"))
.catch((err)=> console.log("Error connecting to DataBase",err.message))

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})