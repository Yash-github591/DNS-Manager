const express = require("express");
const { google } = require("googleapis");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dns = google.dns("v1");
require("dotenv").config();

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/dns-manager").then(() => {
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
app.use(authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create-dns-record", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  const request = {
    // Identifies the project addressed by this request.
    project: "dns-manager-416604", // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: "my-new-zone", // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
      additions: [
        {
          name: "hi.zoneexample.com.", // Replace with your domain name
          type: "A",
          ttl: 300,
          rrdatas: ["192.168.1.1"], // Replace with your IP address
        },
      ],
      deletions: [],
    },

    auth: authClient,
  };

  try {
    const response = (await dns.changes.create(request)).data;
    // TODO: Change code below to process the `response` object:
    // console.log(JSON.stringify(response, null, 2));
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
});

app.get("/see-all-dns-records", async (req, res) => {
  console.log("see-all-dns-records");
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  const request = {
    // Identifies the project addressed by this request.
    project: "dns-manager-416604", // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: "my-new-zone", // TODO: Update placeholder value.

    auth: authClient,
  };

  try {
    const response = (await dns.resourceRecordSets.list(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
});

app.get("/delete-dns-record", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  const request = {
    // Identifies the project addressed by this request.
    project: "dns-manager-416604", // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: "my-new-zone", // TODO: Update placeholder value.

    // Identifies the record set to delete.
    name: "hi.zoneexample.com.",
    type: "A",
    ttl: 300,
    rrdatas: ["192.168.1.1"],
    auth: authClient,
  };

  try {
    const response = (await dns.resourceRecordSets.delete(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
});

// API endpoint for updating a DNS record
app.get("/update-dns-record", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  const request = {
    // Identifies the project addressed by this request.
    project: "dns-manager-416604", // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: "my-new-zone", // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
      additions: [
        {
          name: "hi.zoneexample.com.", // Replace with your domain name
          type: "AAAA",
          ttl: 300,
          rrdatas: ["2001:db8::8bd:1003"], // Replace with your new IP address
        },
      ],
      deletions: [
        {
          name: "hi.zoneexample.com.", // Replace with your domain name
          type: "A",
          ttl: 300,
          rrdatas: ["192.168.1.1"], // Replace with the old IP address
        },
      ],
    },

    auth: authClient,
  };

  try {
    const response = (await dns.changes.create(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/list-dns-zones", async (req, res) => {
  const projectId = "dns-manager-416604";
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  const request = {
    // Identifies the project addressed by this request.
    project: projectId,

    auth: authClient,
  };

  try {
    const response = (await dns.managedZones.list(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
