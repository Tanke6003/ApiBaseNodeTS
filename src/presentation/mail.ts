import nodemailer from 'nodemailer';
export const mailerConfig = {
    host: 'localhost', // o la dirección IP del contenedor SMTP
    port: 1025,
    secure: false,
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
  };
  


export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig);
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'your_email@example.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}

