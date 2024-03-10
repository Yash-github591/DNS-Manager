const { google } = require("googleapis");
const dns = google.dns("v1");

const ListDnsZones = async (req, res) => {
  const projectId = req.user.projectId;
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
};

const SeeDnsRecords = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();

  const currProjectId = req.user.projectId;
  const currZone = req.query.zone;

  const request = {
    // Identifies the project addressed by this request.
    project: currProjectId, // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: currZone, // TODO: Update placeholder value.

    auth: authClient,
  };

  try {
    const response = (await dns.resourceRecordSets.list(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
};

const DeleteDnsRecord = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();

  const projectId = req.user.projectId,
    zone = req.query.zone.name,
    record = req.query.record;

  const request = {
    // Identifies the project addressed by this request.
    project: projectId, // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: zone, // TODO: Update placeholder value.

    // Identifies the record set to delete.
    name: record.name,
    type: record.type,
    ttl: record.ttl,
    rrdatas: record.rrdatas,
    kind: record.kind,
    auth: authClient,
  };

  try {
    const response = (await dns.resourceRecordSets.delete(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).json(err).send("Internal Server Error");
  }
};

module.exports = { ListDnsZones, SeeDnsRecords, DeleteDnsRecord };
