const express = require("express")
const StudentData = require("../models/student.model")
const StudentApplicationData = require("../models/student.application")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const { verifyToken } = require("../middlewares/auth")
require("dotenv").config()

router.post("/register", async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 10)
  try {
    await StudentData.create({
      names: req.body.names,
      regno: req.body.regno,
      password: newPassword,
      role: req.body.role,
    })
    res.status(201).json({ status: "ok", msg: "User registered successfully" })
  } catch (error) {
    res.json({ status: "error", error: "Duplicate Regno" })
  }
})

router.post("/login", async (req, res) => {
  const { regno, password } = req.body
  try {
    const user = await StudentData.findOne({ regno })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }
    // JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({ token, role: user.role })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
})

router.get(
  "/students/:id",
  asyncHandler(async (asdreq, res) => {
    const student = await StudentApplicationData.findById(req.params.id)
    res.json({ status: "ok", student })
  })
)

router.delete("/students/delete/:id", async (req, res) => {
  const result = await StudentApplicationData.findByIdAndDelete(req.params.id)
  res.json({ status: "ok" })
})

router.post(
  "/application",
  async (req, res, next) => {
    req.student = new StudentApplicationData()
    next()
  },
  saveStudentAndRedirect()
)

router.get("/students/edit/:id", async (req, res) => {
  const student = await StudentApplicationData.findById(req.params.id)
  res.json({ status: "ok", student: student })
})

router.get("/admin", verifyToken, async (req, res) => {
  try {
    const student = await StudentApplicationData.find()
    res.json({ student })
  } catch (e) {
    res.json(e.message)
  }
})

router.patch(
  "/students/update/:id",
  async (req, res, next) => {
    req.student = await StudentApplicationData.findById(req.params.id)
    next()
  },
  saveStudentAndRedirect()
)

function saveStudentAndRedirect() {
  return async (req, res) => {
    let student = req.student
    student.email = req.body.email
    student.description = req.body.description
    student.address = req.body.address
    student.department = req.body.department
    student.level = req.body.level
    try {
      await student.save()
      res.json({ status: "ok", student })
    } catch (e) {
      res.json(e.message)
    }
  }
}

function asyncHandler(callback) {
  return (req, res) => {
    try {
      callback(req, res)
    } catch (err) {
      res.status(500).json({
        error: err.message,
        statusCode: 500,
        success: false,
      })
    }
  }
}

router.post("/accept", (req, res) => {
  const recipient = req.body.email
  const REDIRECT_URI = "https://developers.google.com/oauthplayground"
  const CLIENT_SECRET = "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"
  const CLIENT_ID =
    "628547592351-ukmj0j4qspc7cjj7f51qg5umr3j5jc5g.apps.googleusercontent.com"
  const REFRESH_TOKEN =
    "1//04XPR0fG3J0U1CgYIARAAGAQSNwF-L9IrHPTWSeQUlX9V-gpCMf5yTjNi5qYMeCC1yhrnJPibk4bNPgltVqSCqNnl2XH2LMjL8o8"

  const oAuth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  )
  oAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN })

  async function sendEmail() {
    try {
      const ACCESS_TOKEN = await oAuth2client.getAccessToken()
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "patrickhag09@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: ACCESS_TOKEN,
        },
      })
      const mailOptions = {
        from: "mrTix | Admin <patrickhag09@gmail.com>",
        to: recipient,
        subject: "200 status code",
        text: "This is to inform you that you have been selected to as a participant in the competition.",
        html: `<h1>This is to inform you that you have been selected to as a participant in the competition.</h1>`,
      }
      const result = await transport.sendMail(mailOptions)
      return result
    } catch (error) {
      console.error(error)
    }
  }

  sendEmail()
    .then(res => console.log("Email sent...", res))
    .catch(err => console.log(err.message))
})

module.exports = router
