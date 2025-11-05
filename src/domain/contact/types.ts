export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  segment: string;
  employeeCount: string;
  brandingInvestment: string;
  challenges: string;
}

export interface EmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

