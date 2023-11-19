const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

// Replace these with your Elastic Email API credentials
const elasticEmailApiKey = 'F3B4348786774E8FF1AAD3AE3D80DA2AC16EEA90B38971E8FF2EA757CA006C17F70CFDB90C1B0271FF974DD8D2D344B8';
const elasticEmailFromEmail = 'no-reply@AccessSentinel.github.io';

const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: no-reply@AccessSentinel.github.io,
        pass: 8E45967DD337E441EE782A438F4CBFE65A31,
    },
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email.includes('@') || !password) {
        res.status(400).json({ success: false, message: 'Invalid email or password.' });
        return;
    }

    // You would typically generate a unique confirmation code/token here
    const confirmationCode = Math.random().toString(36).substring(7);

    users.push({ email, password, confirmationCode });

    const mailOptions = {
        from: no-reply@accesssentinel.github.io,
        to: email,
        subject: 'Email Confirmation',
        text: `Thank you for registering! Your confirmation code is: ${confirmationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, message: 'Failed to send confirmation email.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true, message: 'Registration successful. Confirmation email sent.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
