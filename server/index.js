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
  res.send("Hello World");
});

// app.get("/create-dns-record", async (req, res) => {
//   const auth = new google.auth.GoogleAuth({
//     scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//   });

//   const authClient = await auth.getClient();
//   const request = {
//     // Identifies the project addressed by this request.
//     project: "dns-manager-416604", // TODO: Update placeholder value.

//     // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
//     managedZone: "my-new-zone", // TODO: Update placeholder value.

//     resource: {
//       // TODO: Add desired properties to the request body.
//       additions: [
//         {
//           name: "hiYash.zoneexample.com.", // Replace with your domain name
//           type: "A",
//           ttl: 300,
//           rrdatas: ["192.168.1.1"], // Replace with your IP address
//         },
//       ],
//       deletions: [],
//     },

//     auth: authClient,
//   };

//   try {
//     const response = (await dns.changes.create(request)).data;
//     // TODO: Change code below to process the `response` object:
//     // console.log(JSON.stringify(response, null, 2));
//     res.send(JSON.stringify(response, null, 2));
//   } catch (err) {
//     console.error(err);
//   }
// });
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
