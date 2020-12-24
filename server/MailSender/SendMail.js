const handlebars          = require("handlebars")
const fs                  = require("fs")
const path                = require('path');
const nodemailer          = require('nodemailer')
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "./mailAdmin.hbs"), "utf8")
const template = handlebars.compile(emailTemplateSource)

require('dotenv').config()
const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
});

const AdminMail = {
  schema: 'sendmail(name: String, subject: String, email: String, message: String): String',
  resolver: (_, { subject, name, email, message }) => {
    const htmlToSend = template({ subject: subject, name: name, email: email, message: message })
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      html: htmlToSend
    }

    contactEmail.sendMail(mailOptions, function (error, response) {
      if (error) {
        return "Erreur envoi";
      } else {
        console.log("Successfully sent email.");
        return "Successfully sent email.";
      }
    })

  },
}

module.exports = {
  AdminMail
}