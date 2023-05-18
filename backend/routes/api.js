const express = require("express");
const StudentData = require("../models/student.model");
const StudentApplicationData = require("../models/student.application");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await StudentData.create({
      names: req.body.names,
      regno: req.body.regno,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate Regno" });
  }
});

router.post("/login", async (req, res) => {
  const user = await StudentData.findOne({
    regno: req.body.regno,
  });
  if (!user) return { status: "error", error: "Invalid Login" };
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (user) {
    const token = jwt.sign(
      {
        names: user.names,
        regno: user.regno,
      },
      "secrecy123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.get(
  "/students/:id",
  asyncHandler(async (req, res) => {
    const student = await StudentApplicationData.findById(req.params.id);
    res.json({ status: "ok", student });
  })
);

router.delete("/students/delete/:id", async (req, res) => {
  const result = await StudentApplicationData.findByIdAndDelete(req.params.id);
  res.json({ status: "ok" });
});

router.post(
  "/application",
  async (req, res, next) => {
    req.student = new StudentApplicationData();
    next();
  },
  saveStudentAndRedirect()
);

router.get("/students/edit/:id", async (req, res) => {
  const student = await StudentApplicationData.findById(req.params.id);
  res.json({ status: "ok", student: student });
});

router.get("/admin", async (req, res) => {
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
    req.student = await StudentApplicationData.findById(req.params.id);
    next();
  },
  saveStudentAndRedirect()
);

function saveStudentAndRedirect() {
  return async (req, res) => {
    let student = req.student;
    student.email = req.body.email;
    student.description = req.body.description;
    student.address = req.body.address;
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
      callback(req, res);
    } catch (err) {
      res.status(500).json({
        error: err.message,
        statusCode: 500,
        success: false,
      });
    }
  };
}

module.exports = router;
