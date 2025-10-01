import { CasesRepository } from '@/domain/cases/repository';
import { Case, CaseFilters } from '@/domain/cases/types';
import { WixCasesRepository } from '@/infrastructure/wix/cases-repository';

// Serviço de aplicação - pode conter lógica de negócio adicional
export class CasesService {
  constructor(private repository: CasesRepository) {}

  async getAllCases(filters?: CaseFilters): Promise<Case[]> {
    return this.repository.findAll(filters);
  }

  async getCaseBySlug(slug: string): Promise<Case | null> {
    return this.repository.findBySlug(slug);
  }

  async getCaseById(id: string): Promise<Case | null> {
    return this.repository.findById(id);
  }

  async getFeaturedCases(limit: number = 4): Promise<Case[]> {
    return this.repository.findAll({ limit });
  }
}

// Factory para criar a instância do serviço
// Aqui você pode trocar facilmente a implementação do repositório
export const createCasesService = (): CasesService => {
  const repository = new WixCasesRepository();
  return new CasesService(repository);
};

