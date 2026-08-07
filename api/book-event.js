const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    // Allow only POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed",
        });
    }

    try {

        const body =
            typeof req.body === "string"
                ? JSON.parse(req.body)
                : (req.body || {});

        const { name, email, mobile, eventDate, eventType, guestCount, enquiry } = body;

        // ----------------------------
        // Validation
        // ----------------------------
        if (!name || !email || !mobile || !eventDate || !eventType || !guestCount || !enquiry) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address.",
            });
        }

        // ----------------------------
        // Environment Variables Check
        // ----------------------------
        if (
            !process.env.SMTP_HOST ||
            !process.env.SMTP_PORT ||
            !process.env.SMTP_USER ||
            !process.env.SMTP_PASS ||
            !process.env.MAIL_TO
        ) {
            return res.status(500).json({
                success: false,
                message: "Email configuration is missing.",
            });
        }

        // ----------------------------
        // SMTP Transport
        // ----------------------------
        console.log("SMTP_USER:", process.env.SMTP_USER);
        console.log("SMTP_PASS length:", process.env.SMTP_PASS?.length);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });

        // ----------------------------
        // Email HTML
        // ----------------------------
        const html = `
        <div style="font-family:Arial,sans-serif;color:#333;line-height:1.8">

            <h2 style="color:#B17014">New Book Event Request</h2>

            <p>Hello Team,</p>

            <p> You have received a new event booking request from the <strong>India Eventually</strong> website.</p>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Mobile:</strong> ${mobile}</p>

            <p><strong>Event Date:</strong> ${eventDate}</p>

            <p><strong>Event Type:</strong> ${eventType}</p>

            <p><strong>Guest Count:</strong> ${guestCount}</p>

            <p><strong>Message:</strong></p>

            <p style="padding:12px; background:#f8f8f8; border-left:4px solid #B17014;">
                ${enquiry}
            </p>

            <br>

            <p>
                <strong>Submitted On:</strong>
                ${new Date().toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                })}
            </p>

            <br>

            <p>
                Regards,<br><strong>India Eventually Website</strong>
            </p>

        </div>
        `;

        // ----------------------------
        // Send Mail
        // ----------------------------
        await transporter.sendMail({
            from: `"India Eventually" <${process.env.SMTP_USER}>`,
            to: process.env.MAIL_TO.split(","),
            replyTo: email,
            subject: "New Book Event Request - India Eventually",

            text: `
                New Book Event Request

                Name: ${name}

                Email: ${email}

                Mobile: ${mobile}

                Event Date: ${eventDate}

                Event Type: ${eventType}

                Guest Count: ${guestCount}

                Message:

                ${enquiry}
`,

            html,

        });

        return res.status(200).json({
            success: true,
            message:
                "Thank you! Your event booking request has been submitted successfully."
        });
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
            code: error.code,
            responseCode: error.responseCode,
            response: error.response
        });

}
};