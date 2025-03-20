require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL;

console.log("\n🔄 Starting MongoDB connection process...");

if (!MONGO_URL) {
    console.error("❌ MONGO_URL is not defined in .env file");
    process.exit(1);
}

// Enhanced connection options
const options = {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
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