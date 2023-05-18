const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const apiRoutes = require('./routes/api')

app.use(cors())
app.use(express.json())
app.use('/api', apiRoutes)

app.post('/email', (req, res) => {
  const recievedEmail = req.body.id
  console.log(recievedEmail)
  res.json({ recievedEmail })
  // async function main() {
  //   let testAccount = await nodemailer.createTestAccount()

  //   let transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: 'mozelle70@ethereal.email',
  //       pass: 'gr779P8mayPQMpky2g',
  //     },
  //   })

  //   let info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <foo@example.com>',
  //     to: re,
  //     subject: 'Hello ✔',
  //     text: 'Hello world?',
  //     html: '<b>Hello world?</b>',
  //   })

  //   console.log('Message sent: %s', info.messageId)
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // }
  // main().catch(console.error)
})

mongoose
  .connect('mongodb://127.0.0.1:27017/studentComp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(console.error)

app.get('/', (req, res) => {
  res.send("Tix's saying Hello world")
})

app.listen(9000, () => console.log('Listening...'))
