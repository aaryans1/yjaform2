const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
    DOB: {
        type: String,
        required: true,
      },
    phoneNumber: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      }, 
      state: {
        type: String,
        required: true,
      },
      zipcode: {
        type: Number,
        required: true,
      },
      jainCenter: {
        type: String,
        required: true,
      },
      dietaryPreferences: {
        type: String,
        required: true,
      },
      specialNeeds: {
        type: String,
        required: true,
      },
})

const UserS = mongoose.model('User', UserSchema)

module.exports = UserS
