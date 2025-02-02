const mongoose = require('mongoose');


const CostSchema = new mongoose.Schema({
    descriptions: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    userid: {
        type: Number,
        required: true
    },
    sum: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    } 
});




const Cost = mongoose.model('Cost', CostSchema);

module.exports = Cost;

