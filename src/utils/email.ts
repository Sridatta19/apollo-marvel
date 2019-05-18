import nodemailer from 'nodemailer';

const sendEmail = async (options: { [key: string]: string }): Promise<any> => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
    },
  });

  return transporter.sendMail(options);
};

export default sendEmail;
