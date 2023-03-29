const mongoose = require('mongoose')
const slugify = require('slugify')

const studentApplicationSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    date: { 
        type: Date,
        default: Date.now
      },
      address: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
},
    { 
        collection: 'studentApplication' 
    }
)


module.exports = mongoose.model('StudentApplicationData', studentApplicationSchema)
