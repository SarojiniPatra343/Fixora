const nodemailer = require("nodemailer");

async function sendMail() {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sarojinipatra343@gmail.com",
                pass: "bwwgrihjwwtcrmfz"
            }
        });

        let info = await transporter.sendMail({
            from: "My App <sarojinipatra343@gmail.com>",
            to: "bijayanipatra1@gmail.com",
            subject: "Test Email",
            text: "This is a test mail",
            html: "<h2>Hello!</h2><p>This is a test mail</p>"
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

sendMail();