import { IMail } from "../../dominio/interfaces/plugins/IMail.interface";

export class MailService {
    private mailPlugin: IMail;
    constructor(mailPlugin: IMail) {
        this.mailPlugin = mailPlugin;
    }
    async sendMail(to: string, subject: string, text: string): Promise<void> {
        await this.mailPlugin.sendMail(to, subject, text);
    }
    async sendMailWithAttachment(to: string, subject: string, text: string, attachments: any): Promise<void> {
        await this.mailPlugin.sendMailWithAttachment(to, subject, text, attachments);
    }
}