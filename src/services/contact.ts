import { EmailRepository } from '@/domain/contact/repository';
import { ContactFormData, EmailResult } from '@/domain/contact/types';
import { NodemailerEmailRepository } from '@/infrastructure/email/email-service';

export class ContactService {
  constructor(private emailRepository: EmailRepository) {}

  async sendContactEmail(data: ContactFormData): Promise<EmailResult> {
    if (!this.validateContactData(data)) {
      return {
        success: false,
        error: 'Dados do formulário inválidos',
      };
    }

    return this.emailRepository.sendContactEmail(data);
  }

  private validateContactData(data: ContactFormData): boolean {
    return !!(
      data.name?.trim() &&
      data.email?.trim() &&
      data.company?.trim() &&
      data.segment?.trim() &&
      data.employeeCount &&
      data.brandingInvestment &&
      data.challenges?.trim()
    );
  }
}

export const createContactService = (): ContactService => {
  const emailRepository = new NodemailerEmailRepository();
  return new ContactService(emailRepository);
};

