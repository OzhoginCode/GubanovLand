import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_PASSWORD,
  },
});

export default async (text) => {
  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Новая заявка на сайте!',
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw new Error(error);
  }
};
