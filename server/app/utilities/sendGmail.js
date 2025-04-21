const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

async function sendGmailToUser(to, subject, text) {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        return { message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

module.exports = sendGmailToUser;