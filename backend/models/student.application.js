const mongoose = require('mongoose')

const studentApplicationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'studentApplication',
  }
)

module.exports = mongoose.model(
  'StudentApplicationData',
  studentApplicationSchema
)
