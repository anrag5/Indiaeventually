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

    const { name, email, mobile, enquiry } = body;

    // ----------------------------
    // Validation
    // ----------------------------
    if (!name || !email || !mobile || !enquiry) {
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
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ----------------------------
    // Email HTML
    // ----------------------------
    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2 style="color:#0c4a6e">
          New Contact Enquiry
        </h2>

        <table
          cellpadding="10"
          cellspacing="0"
          border="1"
          style="border-collapse:collapse;width:100%"
        >
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Mobile</strong></td>
            <td>${mobile}</td>
          </tr>

          <tr>
            <td><strong>Enquiry</strong></td>
            <td>${enquiry}</td>
          </tr>

          <tr>
            <td><strong>Date</strong></td>
            <td>${new Date().toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}</td>
          </tr>
        </table>

      </div>
    `;

    // ----------------------------
    // Send Mail
    // ----------------------------
    await transporter.sendMail({
      from: `"India Eventually" <${process.env.SMTP_USER}>`,
      // to: process.env.MAIL_TO,
      to: process.env.MAIL_TO.split(","),
      replyTo: email,
      subject: "New Contact Enquiry - India Eventually",

      text: `
Name: ${name}

Email: ${email}

Mobile: ${mobile}

Enquiry:

${enquiry}
      `,

      html,
    });

    return res.status(200).json({
      success: true,
      message:
        "Thank you! Your enquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to send enquiry.",
    });
  }
};