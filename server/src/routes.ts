import { Router } from 'express';

import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { FeedbackTypes } from './domain/enums';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { CreateFeedbackUseCase } from './usecases/create-feedback';

const router = Router();

interface ICreateFeedbackBody {
  type: FeedbackTypes;
  comment: string;
  screenshot?: string;
}

router.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body as ICreateFeedbackBody;

  const createFeedbackUseCase = new CreateFeedbackUseCase(
    new PrismaFeedbacksRepository(),
    new NodemailerMailAdapter(),
  );

  const result = await createFeedbackUseCase.execute({
    comment,
    type,
    screenshot,
  });

  if (!result.isValid()) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json({ data: result.data });
});

export { router };
