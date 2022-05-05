import nodemailer, { Transporter } from 'nodemailer';

import { IMailAdapter, ISendMailData } from '../mail-adapter';

export class NodemailerMailAdapter implements IMailAdapter {
  private transport: Transporter | null = null;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '003c549ec44b88',
        pass: 'd9d18955845316',
      },
    });
  }

  async sendMail(data: ISendMailData): Promise<void> {
    await this.transport?.sendMail({
      from: 'Equipe Feedget <noreply@feedget.com>',
      to: 'Renato Lomba <rntlomba@gmail.com>',
      subject: data.subject,
      html: data.body,
    });
  }
}
