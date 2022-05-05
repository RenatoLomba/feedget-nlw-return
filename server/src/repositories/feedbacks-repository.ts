import { FeedbackTypes } from '../domain/enums';

export interface ICreateFeedbackData {
  type: FeedbackTypes;
  comment: string;
  screenshot?: string;
}

export interface ICreateFeedbackResultData {
  id: string;
  type: FeedbackTypes;
  comment: string;
  screenshot?: string;
  createdAt: Date;
}

export interface IFeedbacksRepository {
  create: (data: ICreateFeedbackData) => Promise<ICreateFeedbackResultData>;
}
