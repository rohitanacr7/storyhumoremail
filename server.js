const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configure your email transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Endpoint to send the email with companyName
app.post('/send-email-with-company', async (req, res) => {
    console.log('Received request with company:', req.body); // Log the request body

    const { to, subject, message, phoneNo, name, companyName, email } = req.body;

    try {
        // Render the email template with dynamic data
        const html = await ejs.renderFile(__dirname + '/views/email-template.ejs', { name, email, to, subject, message, phoneNo, companyName });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error); // Log error
        res.status(500).send('Error sending email');
    }
});

// Endpoint to send the email with referral
app.post('/send-email-with-referral', async (req, res) => {
    console.log('Received request with referral:', req.body); // Log the request body

    const { to, subject, message, phoneNo, name, referral, email } = req.body;

    try {
        // Render the email template with dynamic data
        const html = await ejs.renderFile(__dirname + '/views/email-template2.ejs', { name, email, to, subject, message, phoneNo, referral });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error); // Log error
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
