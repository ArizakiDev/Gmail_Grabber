const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
const nodemailer = require('nodemailer');

const clientId = 'votre_client_id';
const clientSecret = 'votre_client_secret';
const redirectUri = 'votre_uri_de_redirection';
const refreshToken = 'votre_refresh_token';

const oAuth2Client = new OAuth2Client(
  clientId,
  clientSecret,
  redirectUri
);

oAuth2Client.setCredentials({
  refresh_token: refreshToken
});

async function grabbeurGmail() {
  const gmail = google.gmail({version: 'v1', auth: oAuth2Client});

  const messages = await gmail.users.messages.list({
    userId: 'me',
  });

  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'votre_adresse_gmail',
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: oAuth2Client.getAccessToken(),
    },
  });

  const mailOptions = {
    from: 'votre_adresse_gmail',
    to: 'adresse_email_destinataire',
    subject: 'Messages Gmail',
    text: JSON.stringify(messages),
  };

  await mailTransport.sendMail(mailOptions);
}

grabbeurGmail();
