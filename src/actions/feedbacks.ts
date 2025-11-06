'use server';

import { createFeedbacksService } from "@/services/feedbacks";
import { Feedback } from "@/domain/feedbacks/types";

export async function getAllFeedbacksAction(): Promise<{ feedbacks: Feedback[] }> {
  const feedbacksService = createFeedbacksService();
  const feedbacks = await feedbacksService.getAllFeedbacks();
  return { feedbacks };
}

