import nodemailer from 'nodemailer'
import { IMail } from '../../dominio/interfaces/plugins/IMail.interface';
import { MailOptions } from '../../dominio/models/mailOptions.model';
import { envs } from './envs.plugin';


export class NodeMailer implements IMail{
  private transporter: nodemailer.Transporter;

  constructor() {
    const mailerConfig:MailOptions = {
          service: envs.MAILER_SERVICE,
          auth: {
              user: envs.MAILER_EMAIL,
              pass: envs.MAILER_SECRET_KEY
          }
      };
    this.transporter = nodemailer.createTransport(mailerConfig);
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '',
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
  async sendMailWithAttachment(to: string, subject: string, text: string, attachments: any): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '',
      to,
      subject,
      text,
      attachments,
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

