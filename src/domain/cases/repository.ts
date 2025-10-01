import { Case, CaseFilters } from './types';

// Interface do repositório - contrato que qualquer implementação deve seguir
export interface CasesRepository {
  findAll(filters?: CaseFilters): Promise<Case[]>;
  findBySlug(slug: string): Promise<Case | null>;
  findById(id: string): Promise<Case | null>;
}

