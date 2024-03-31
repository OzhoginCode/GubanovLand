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

const createEmailText = (data) => {
  const {
    name, phone, message, formType, applicationType,
  } = data;

  return `${name}\nPhone: ${phone}\n\n${message}\n${formType}, ${applicationType}`;
};

export default async (data) => {
  const mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Новая заявка на сайте!',
    text: createEmailText(data),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw new Error(error);
  }
};
