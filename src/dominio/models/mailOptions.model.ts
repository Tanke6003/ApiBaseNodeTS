

  export interface MailOptions {
    host?: string;
    service?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user: string;
      pass: string;
    };
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
    attachments?: any;
    requireTLS?: boolean;
  }
