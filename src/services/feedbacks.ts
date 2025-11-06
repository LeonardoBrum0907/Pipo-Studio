import { FeedbacksRepository } from '@/domain/feedbacks/repository';
import { Feedback } from '@/domain/feedbacks/types';
import { WixFeedbacksRepository } from '@/infrastructure/wix/feedbacks-repository';

export class FeedbacksService {
  constructor(private repository: FeedbacksRepository) {}

  async getAllFeedbacks(): Promise<Feedback[]> {
    return this.repository.findAll();
  }
}

export const createFeedbacksService = (): FeedbacksService => {
  const repository = new WixFeedbacksRepository();
  return new FeedbacksService(repository);
};

