const express = require("express");
const { google } = require("googleapis");
const authRoutes = require("./routes/authRoutes");
const dnsRoutes = require("./routes/dnsRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dns = google.dns("v1");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(dnsRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
