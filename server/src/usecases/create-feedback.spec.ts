import { ErrorMessages, FeedbackTypes } from '../domain/enums';
import {
  ICreateFeedbackData,
  ICreateFeedbackResultData,
} from '../repositories/feedbacks-repository';
import { CreateFeedbackUseCase } from './create-feedback';

const createData = (): ICreateFeedbackData => {
  return {
    comment: 'test-comment',
    type: FeedbackTypes.BUG,
  };
};

const createReturnValue = (): ICreateFeedbackResultData => {
  return {
    id: '123456',
    comment: 'test-comment',
    type: FeedbackTypes.BUG,
    createdAt: new Date(),
  };
};

interface ICreateInstanceParams {
  createFeedbackRepositoryFn: jest.Mock;
  sendMailProviderFn: jest.Mock;
}

const createInstanceOfUseCase = ({
  createFeedbackRepositoryFn,
  sendMailProviderFn,
}: ICreateInstanceParams): CreateFeedbackUseCase => {
  return new CreateFeedbackUseCase(
    {
      create: createFeedbackRepositoryFn,
    },
    { sendMail: sendMailProviderFn },
  );
};

describe('Create feedback', () => {
  it('should return success when trying to create a feedback', async () => {
    // Given
    const createFeedbackRepositoryFn = jest
      .fn()
      .mockReturnValue(createReturnValue());
    const sendMailProviderFn = jest.fn();
    const createFeedback = createInstanceOfUseCase({
      createFeedbackRepositoryFn,
      sendMailProviderFn,
    });
    const data = createData();

    // When
    const result = await createFeedback.execute(data);

    // Then
    expect(result.isValid()).toBeTruthy();
    expect(result.data).toHaveProperty('id');
    expect(result.error).toBeFalsy();
    expect(createFeedbackRepositoryFn).toHaveBeenCalled();
    expect(sendMailProviderFn).toHaveBeenCalled();
  });

  it('should return error when trying to create a feedback with an invalid screenshot format', async () => {
    // Given
    const createFeedbackRepositoryFn = jest
      .fn()
      .mockReturnValue(createReturnValue());
    const sendMailProviderFn = jest.fn();
    const createFeedback = createInstanceOfUseCase({
      createFeedbackRepositoryFn,
      sendMailProviderFn,
    });
    const data = {
      ...createData(),
      screenshot: 'data:image/gif;',
    };

    // When
    const result = await createFeedback.execute(data);

    // Then
    expect(result.isValid()).toBeFalsy();
    expect((result.error as Record<string, unknown>).message).toEqual(
      ErrorMessages.INVALID_SCREENSHOT_FORMAT,
    );
    expect(result.data).toBeFalsy();
    expect(createFeedbackRepositoryFn).not.toHaveBeenCalled();
    expect(sendMailProviderFn).not.toHaveBeenCalled();
  });

  it('should return error when fail to execute use case', async () => {
    // Given
    const createFeedbackRepositoryFn = jest
      .fn()
      .mockRejectedValue('Internal server error');
    const sendMailProviderFn = jest.fn();
    const createFeedback = createInstanceOfUseCase({
      createFeedbackRepositoryFn,
      sendMailProviderFn,
    });
    const data = createData();

    // When
    const result = await createFeedback.execute(data);

    // Then
    expect(result.isValid()).toBeFalsy();
    expect(result.error).toEqual('Internal server error');
    expect(result.data).toBeFalsy();
    expect(createFeedbackRepositoryFn).toHaveBeenCalled();
    expect(sendMailProviderFn).not.toHaveBeenCalled();
  });
});
