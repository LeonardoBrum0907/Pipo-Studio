import { FeedbacksRepository } from "@/domain/feedbacks/repository";
import { Feedback } from "@/domain/feedbacks/types";
import { getWixClient } from "./client";

interface WixFeedbackDTO {
  customerName: string;
  feedbackTextEn: string;
  feedbackTextPt: string;
  companyName: string;
  avatar: string;
  _id: string;
}

const mapWixFeedbackToFeedback = (item: WixFeedbackDTO): Feedback => {
  return {
    id: item._id,
    avatarUrl: item.avatar,
    customerName: item.customerName,
    feedbackTextEn: item.feedbackTextEn,
    feedbackTextPt: item.feedbackTextPt,
    companyName: item.companyName,
  };
};

export class WixFeedbacksRepository implements FeedbacksRepository {
  private readonly collectionName = 'CustomerFeedbacks';

  async findAll(): Promise<Feedback[]> {
    const wixClient = await getWixClient();
    const { items } = await wixClient.items.query(this.collectionName).find();

    return (items as WixFeedbackDTO[]).map(mapWixFeedbackToFeedback);
  }
}

