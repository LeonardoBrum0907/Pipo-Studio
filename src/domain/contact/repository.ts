import { ContactFormData, EmailResult } from './types';

export interface EmailRepository {
  sendContactEmail(data: ContactFormData): Promise<EmailResult>;
}

