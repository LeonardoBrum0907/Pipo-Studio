'use server';

import { createCasesService } from "@/services/cases";
import { Case } from "@/domain/cases/types";

export async function getAllCasesAction(): Promise<{ cases: Case[] }> {
   const casesService = createCasesService();
   const cases = await casesService.getAllCases();
   return { cases };
}