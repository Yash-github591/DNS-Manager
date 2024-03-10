const express = require("express");
const {
  ListDnsZones,
  SeeDnsRecords,
} = require("../controllers/dnsControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/list-dns-zones", authenticateToken, ListDnsZones);
router.get("/see-all-dns-records", authenticateToken, SeeDnsRecords);

module.exports = router;
