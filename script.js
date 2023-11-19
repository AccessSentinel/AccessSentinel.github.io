const nodemailer = require('nodemailer');

// Create a nodemailer transporter configured for Elastic Email's SMTP server
const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: elasticEmailApiKey,
        pass: elasticEmailApiKey,
    },
});

// ... (other server setup code)

// Handle user registration and send confirmation email
app.post('/register', (req, res) => {
    // ... (user registration logic)

    // Configure email options
    const mailOptions = {
        from: elasticEmailFromEmail,
        to: email,
        subject: 'Email Confirmation',
        text: `Thank you for registering! Your confirmation code is: ${confirmationCode}`,
    };

    // Use nodemailer to send the email
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
