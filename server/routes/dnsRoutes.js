const express = require("express");
const {
  CreateDnsRecord,
  ListDnsZones,
  SeeDnsRecords,
  DeleteDnsRecord,
  UpdateDnsRecord,
} = require("../controllers/dnsControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { generateAuthclient } = require("../middlewares/dnsMiddleware");

const router = express.Router();

router.post(
  "/create-dns-record",
  authenticateToken,
  generateAuthclient,
  CreateDnsRecord
);
router.get(
  "/list-dns-zones",
  authenticateToken,
  generateAuthclient,
  ListDnsZones
);
router.get(
  "/see-all-dns-records",
  authenticateToken,
  generateAuthclient,
  SeeDnsRecords
);
router.delete(
  "/delete-dns-record",
  authenticateToken,
  generateAuthclient,
  DeleteDnsRecord
);
router.patch(
  "/edit-dns-record",
  authenticateToken,
  generateAuthclient,
  UpdateDnsRecord
);

module.exports = router;
