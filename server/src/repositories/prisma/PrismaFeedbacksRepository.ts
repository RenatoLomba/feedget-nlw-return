import { prisma } from '../../prisma';
import {
  ICreateFeedbackData,
  ICreateFeedbackResultData,
  IFeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create(data: ICreateFeedbackData): Promise<ICreateFeedbackResultData> {
    const feedback = await prisma.feedback.create({
      data,
    });

    return feedback as ICreateFeedbackResultData;
  }
}
