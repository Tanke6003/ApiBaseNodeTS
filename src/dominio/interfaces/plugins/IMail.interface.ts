
export interface IMail {
    sendMail(to: string, subject: string, text: string): Promise<void>;
    sendMailWithAttachment(to: string, subject: string, text: string, attachments: any): Promise<void>;
}