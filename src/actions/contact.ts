'use server';

import { createContactService } from '@/services/contact';
import { ContactFormData, EmailResult } from '@/domain/contact/types';

export async function submitContactFormAction(
  prevState: EmailResult | null,
  formData: FormData
): Promise<EmailResult> {
  try {
    const contactData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      segment: formData.get('segment') as string,
      employeeCount: formData.get('employeeCount') as string,
      brandingInvestment: formData.get('brandingInvestment') as string,
      challenges: formData.get('challenges') as string,
    };

    const contactService = createContactService();
    return await contactService.sendContactEmail(contactData);
  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error);
    
    return {
      success: false,
      error: 'Erro ao processar o formulário. Por favor, tente novamente.',
    };
  }
}

