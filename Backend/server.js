require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes=require('./routes/authRoute')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL;

console.log("\n🔄 Starting MongoDB connection process...");


app.use('/auth',authRoutes)

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
})
.catch((error) => {
    console.error("\n❌ MongoDB connection error:");
    console.error("- Name:", error.name);
    console.error("- Message:", error.message);
});