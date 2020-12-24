const nodemailer = require('nodemailer')
const express = require('express')
require('dotenv').config()
const router = new express.Router()

router.post('/sendmail', async (req, res) => {
  try {
    await nodemailer.createTestAccount()
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD
      }
    })
    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.USER_EMAIL, // sender address
      to: req.body.destination, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
    })
    res.status(201).send('Message envoyé')
  } catch (e) {
    res.status(400).send(e)
  }
})
module.exports = router