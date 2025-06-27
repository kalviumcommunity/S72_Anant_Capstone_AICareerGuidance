const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    dateTaken: {
        type: Date,
        default: Date.now
    }
});

const Test = mongoose.model('Test', TestSchema);
module.exports = Test;