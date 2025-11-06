import { Feedback } from "./types";

export interface FeedbacksRepository {
  findAll(): Promise<Feedback[]>;
}

