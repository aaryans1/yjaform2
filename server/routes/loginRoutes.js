const UserS = require('../models/UserSchema')
const express = require('express')
const router = express.Router()
const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path')
const fields = ['fullName','DOB','phoneNumber', 'email', 'address', 'city', 'state', 'zipcode', 'jainCenter', 'dietaryPreferences', 'specialNeeds'];

router.post('/register', async (req, res) => {
  var {fullName,DOB,phoneNumber, email, address, city, state, zipcode, jainCenter, dietaryPreferences, specialNeeds} =req.body;
  if (!fullName || !DOB || !phoneNumber || !email || !address || !city || !state || !zipcode || !jainCenter || !dietaryPreferences || !specialNeeds)
    return res.status(400).json({ msg: 'Every field is required' })

  if (zipcode < 5) {
    return res
      .status(400)
      .json({ msg: 'Zipcode should be at least 5 digits' })
  }

  const user = await UserS.findOne({ email }) // finding user in db to make sure no duplicates
  if (user) return res.status(400).json({ msg: 'User already exists' })

  const newUser = new UserS({fullName,DOB,phoneNumber, email, address, city,state, zipcode, jainCenter, dietaryPreferences, specialNeeds })
  newUser.save();
  res.status(201).json({message: "User registered succesfully"})
})

router.use('/download', function (req, res) {
  UserS.find({createdAt: mdq.lastYear()}, function (err, form) {
    if (err) {
      return res.status(500).json({ err });
    }
    else {
      let csv
      try {
        csv = json2csv(form, { fields });
      } catch (err) {
        return res.status(500).json({ err });
      }
      const dateTime = moment().format('YYYYMMDDhhmmss');
      const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
      fs.writeFile(filePath, csv, function (err) {
        if (err) {
          return res.json(err).status(500);
        }
        else {
          setTimeout(function () {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
          }, 30000)
          return res.json("/exports/csv-" + dateTime + ".csv");
        }
      })

    }
  })
})



module.exports = router