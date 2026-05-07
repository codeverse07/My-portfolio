"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const { name, email, phone, subject, message } = formData;

  // Create a transporter using your email service (e.g., Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "work.sachiin@gmail.com", // Destination email
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #000;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="white-space: pre-wrap;"><strong>Message:</strong><br />${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Nodemailer error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
