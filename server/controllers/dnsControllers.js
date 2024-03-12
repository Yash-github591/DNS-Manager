const { google } = require("googleapis");
const dns = google.dns("v1");

const ListDnsZones = async (req, res) => {
  const authClient = req.authClient;
  const projectId = req.user.projectId;
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
  const authClient = req.authClient;
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
  const authClient = req.authClient;
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

const UpdateDnsRecord = async (req, res) => {
  const authClient = req.authClient;
  const projectId = req.user.projectId;
  const { zone, record, recordTobeEdited } = req.body;
  // console.log("new record:", record);
  // console.log("Record to be edited:", recordTobeEdited);
  // console.log("Zone:", zone);
  const request = {
    // Identifies the project addressed by this request.
    project: projectId, // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: zone.name, // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
      additions: [
        {
          name: record.name, // Replace with your domain name
          type: record.type,
          ttl: record.ttl,
          rrdatas: record.rrdatas, // Replace with your new IP address
        },
      ],
      deletions: [
        {
          name: recordTobeEdited.name, // Replace with your domain name
          type: recordTobeEdited.type,
          ttl: recordTobeEdited.ttl,
          rrdatas: recordTobeEdited.rrdatas, // Replace with the old IP address
        },
      ],
    },

    auth: authClient,
  };

  try {
    const response = (await dns.changes.create(request)).data;
    res.send(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error("error line 135", err.response.data.error.message);
    res.status(500).send("Internal Server Error");
  }
};

const CreateDnsRecord = async (req, res) => {
  const authClient = req.authClient;
  const projectId = req.user.projectId;
  const zone = req.body.zone.name,
    record = req.body.record;

  console.log("Record to be added:", record);
  console.log("Zone:", zone);
  const request = {
    // Identifies the project addressed by this request.
    project: projectId, // TODO: Update placeholder value.

    // Identifies the managed zone addressed by this request. Can be the managed zone name or id.
    managedZone: zone, // TODO: Update placeholder value.

    resource: {
      // TODO: Add desired properties to the request body.
      additions: [
        {
          name: record.name, // Replace with your domain name
          type: record.type,
          ttl: parseInt(record.ttl),
          rrdatas: record.rrdatas, // Replace with your IP address
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
    console.error("error adding record ", err.response.data.error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  CreateDnsRecord,
  ListDnsZones,
  SeeDnsRecords,
  DeleteDnsRecord,
  UpdateDnsRecord,
};
