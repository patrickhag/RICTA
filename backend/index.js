const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const apiRoutes = require("./routes/api")

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use("/api", apiRoutes)

mongoose
  .connect("mongodb://127.0.0.1:27017/studentComp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Successfully!"))
app.get("/", (req, res) => {
  res.send("Tix's saying Hello world")
})

app.listen(9000, () => console.log("Listening..."))
