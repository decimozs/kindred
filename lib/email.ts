import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env?.GMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env?.GMAIL_USER,
    pass: process.env?.GMAIL_PASS,
  },
});

export default transporter;
