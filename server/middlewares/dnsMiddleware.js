const { google } = require("googleapis");

async function generateAuthclient(req, res, next) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const authClient = await auth.getClient();
  req.authClient = authClient;
  next();
}

module.exports = {
  generateAuthclient,
};
