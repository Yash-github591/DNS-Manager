const express = require("express");
const { ListDnsZones } = require("../controllers/dnsControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/list-dns-zones", authenticateToken, ListDnsZones);

module.exports = router;
