require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Question = require('./models/question.model');
const questionsRoute = require('./routes/questions');
const aiRoute = require('./routes/ai');
const userRoute = require('./routes/user'); // Import the new user route
const authRoute = require('./routes/auth'); // Import the auth route

app.use(cors())
app.use(express.json())

app.use('/api/questions', questionsRoute)
app.use('/api/ai', aiRoute)
app.use('/api/user', userRoute); // Use the new user route
app.use('/api/auth', authRoute); // Use the auth route
app.use('/uploads', express.static('uploads'));


app.get('/', (req,res)=>{
    res.send("Welcome to the Backend of CareerBoat")
})

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL;

console.log("\n🔄 Starting MongoDB connection process...");

if (!MONGO_URL) {
    console.error("❌ MONGO_URL is not defined in .env file");
    process.exit(1);
}

const options = {
    serverSelectionTimeoutMS: 30000, 
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 2000,
    retryWrites: true,
    w: 'majority',
    family: 4 
};

mongoose.connect(MONGO_URL, options)
.then(() => {
    console.log("\n✅ Successfully connected to MongoDB!");
    console.log("\n📊 Connection Details:");
    console.log("- Database:", mongoose.connection.name);
    console.log("- Host:", mongoose.connection.host);
    console.log("- State:", mongoose.STATES[mongoose.connection.readyState]);
    
    app.listen(PORT, () => {
        console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    });
    app.use('/api/questions', questionsRoute);
})
.catch((error) => {
    console.error("\n❌ MongoDB connection error:");
    console.error("- Name:", error.name);
    console.error("- Message:", error.message);
});