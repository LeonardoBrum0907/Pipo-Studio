import nodemailer, { Transporter } from 'nodemailer';
import { EmailRepository } from '@/domain/contact/repository';
import { ContactFormData, EmailResult } from '@/domain/contact/types';

const getSmtpConfig = () => {
   const host = process.env.SMTP_HOST || 'smtp.gmail.com';
   const port = parseInt(process.env.SMTP_PORT || '587', 10);
   const user = process.env.SMTP_USER;
   const password = process.env.SMTP_PASS;
   const to = process.env.SMTP_TO || user;
   const from = process.env.SMTP_FROM || user;

   if (!user || !password) {
      throw new Error('SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables.');
   }

   return {
      host,
      port,
      secure: port === 465,
      auth: {
         user,
         pass: password,
      },
      to,
      from,
   };
};

export class NodemailerEmailRepository implements EmailRepository {
   private transporter: Transporter;

   constructor() {
      const config = getSmtpConfig();
      this.transporter = nodemailer.createTransport({
         host: config.host,
         port: config.port,
         secure: config.secure,
         auth: config.auth,
      });
   }

   async sendContactEmail(data: ContactFormData): Promise<EmailResult> {
      try {
         const config = getSmtpConfig();

         const htmlContent = this.formatEmailContent(data);

         await this.transporter.sendMail({
            from: `"Pipo Studio Contact Form" <${config.from}>`,
            to: config.to,
            replyTo: data.email,
            subject: `Nova proposta de investimento - ${data.company}`,
            text: this.formatEmailText(data),
            html: htmlContent,
            headers: {
               'X-Priority': '1',
               'X-MSMail-Priority': 'High',
               'Importance': 'High',
            }
         });

         return {
            success: true,
            message: 'Email enviado com sucesso!',
         };
      } catch (error) {
         console.error('Erro ao enviar email:', error);

         const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao enviar email';

         return {
            success: false,
            error: errorMessage,
         };
      }
   }

   private formatEmailText(data: ContactFormData): string {
      return `
Nova proposta de investimento recebida

Nome: ${data.name}
Email: ${data.email}
Empresa: ${data.company}
Segmento: ${data.segment}
Número de funcionários: ${data.employeeCount}
Investimento em branding: ${data.brandingInvestment}
Desafios: ${data.challenges}
    `.trim();
   }

   private formatEmailContent(data: ContactFormData): string {
      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-radius: 3px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Nova proposta de investimento recebida</h2>
    </div>
    
    <div class="field">
      <div class="label">Nome completo:</div>
      <div class="value">${this.escapeHtml(data.name)}</div>
    </div>
    
    <div class="field">
      <div class="label">Email:</div>
      <div class="value">${this.escapeHtml(data.email)}</div>
    </div>
    
    <div class="field">
      <div class="label">Empresa:</div>
      <div class="value">${this.escapeHtml(data.company)}</div>
    </div>
    
    <div class="field">
      <div class="label">Segmento:</div>
      <div class="value">${this.escapeHtml(data.segment)}</div>
    </div>
    
    <div class="field">
      <div class="label">Número de funcionários:</div>
      <div class="value">${this.escapeHtml(data.employeeCount)}</div>
    </div>
    
    <div class="field">
      <div class="label">Investimento em branding:</div>
      <div class="value">${this.escapeHtml(data.brandingInvestment)}</div>
    </div>
    
    <div class="field">
      <div class="label">Principais desafios:</div>
      <div class="value">${this.escapeHtml(data.challenges)}</div>
    </div>
    
    <div class="footer">
      <p>Este email foi enviado automaticamente através do formulário de contato do site Pipo Studio.</p>
      <p>Para responder, use o endereço: ${this.escapeHtml(data.email)}</p>
    </div>
  </div>
</body>
</html>
    `.trim();
   }

   private escapeHtml(text: string): string {
      const map: Record<string, string> = {
         '&': '&amp;',
         '<': '&lt;',
         '>': '&gt;',
         '"': '&quot;',
         "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
   }
}

