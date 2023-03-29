const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    names: {
        type: String, 
        required: true,
    },
    regno: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
},
    { 
        collection: 'student' 
    }
)

module.exports = mongoose.model('StudentData', studentSchema)
