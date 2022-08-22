require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const loginRouter = require('./routes/loginRoutes')

const app = express()
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
// This is where the API is making its initial connection to the database
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  
})


app.use(cors(corsOptions))
app.use(express.json())

// ROUTERS
app.use('/api', loginRouter)

// START SERVER on Port 5001
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app