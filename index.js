const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services like 'yahoo', 'hotmail', etc.
    auth: {
        user:"ahmedjamil561@gmail.com", // Your email
        pass: "znzm rjko inka slte" // Your email password or app-specific password
    }
});

// Route to send OTP
app.post('/send-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const mailOptions = {
        from: "ahmedjamil561@gmail.com",
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'OTP sent successfully', otp: otp });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
