import { IMailAdapter } from '../adapters/mail-adapter';
import { ApplicationError } from '../domain/app-error';
import { ApplicationResult } from '../domain/app-result';
import { ApplicationSuccess } from '../domain/app-success';
import { ErrorMessages, FeedbackTypes } from '../domain/enums';
import {
  ICreateFeedbackResultData,
  IFeedbacksRepository,
} from '../repositories/feedbacks-repository';

interface ICreateFeedbackUseCaseParams {
  type: FeedbackTypes;
  comment: string;
  screenshot?: string;
}

export class CreateFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: IFeedbacksRepository,
    private readonly mailAdapter: IMailAdapter,
  ) {}

  async execute(
    params: ICreateFeedbackUseCaseParams,
  ): Promise<ApplicationResult<ICreateFeedbackResultData>> {
    try {
      if (
        params.screenshot &&
        !params.screenshot.startsWith('data:image/png;base64')
      ) {
        return new ApplicationError({
          message: ErrorMessages.INVALID_SCREENSHOT_FORMAT,
        });
      }

      const feedback = await this.feedbacksRepository.create(params);

      await this.mailAdapter.sendMail({
        subject: `Novo feedback ${feedback.id}`,
        body: [
          '<div style="font-family: sans-serif;font-size: 16px; color: #111;">',
          '<h1 style="font-size: 24px; color: #8257e6">Feedget</h1>',
          `<p>Tipo do feedback: ${feedback.type}</p>`,
          `<p>Comentário: ${feedback.comment}</p>`,
          '</div>',
        ].join('\n'),
      });

      return new ApplicationSuccess(feedback);
    } catch (error) {
      return new ApplicationError(error);
    }
  }
}
