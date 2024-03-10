const express = require("express");
const {
  ListDnsZones,
  SeeDnsRecords,
  DeleteDnsRecord,
  UpdateDnsRecord,
} = require("../controllers/dnsControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/list-dns-zones", authenticateToken, ListDnsZones);
router.get("/see-all-dns-records", authenticateToken, SeeDnsRecords);
router.delete("/delete-dns-record", authenticateToken, DeleteDnsRecord);
router.patch("/edit-dns-record", authenticateToken, UpdateDnsRecord);

module.exports = router;
