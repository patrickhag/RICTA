const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', apiRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/studentComp', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error)

app.get('/', (req, res) => {
	res.send("👋😊 Mr Tix's saying Hello world 🌍")
})

app.listen(9000, () => console.log('Listening...'))