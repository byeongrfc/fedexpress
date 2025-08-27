import nodemailer from "nodemailer";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_PASS, // your 16-char app password
  },
  tls: {
    rejectUnauthorized: false, // 👈 fixes self-signed cert issue
  },
});

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const info = await transporter.sendMail({
    from: `"FedExpress Delivery" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });

  logger.info("Email sent", { info: info });
  return info;
}
