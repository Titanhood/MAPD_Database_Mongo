const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: String
    },
    dob: {
        required: true,
        type: String

    },
    condition: {
        required: true,
        type: String
    },
    oxygenLevel: {
        required: true,
        type: String
    },
    bloodPressure: {
        required: true,
        type: String
    },
    sugar: {
        required: true,
        type: String
    }, 
    
})
module.exports = mongoose.model('Data', dataSchema)