import { ArrowLeft } from 'phosphor-react';
import { FC, FormEvent, useState } from 'react';

import { api } from '../../../lib/api';
import { FeedbackKey, feedbackTypes } from '../../../utils/feedbackTypes';
import { Loading } from '../../Loading';
import { WidgetCloseButton } from '../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

interface IFeedbackContentStepProps {
  feedbackType: FeedbackKey;
  onFeedbackReturnClick: () => void;
  onFeedbackSent?: () => void;
}

export const FeedbackContentStep: FC<IFeedbackContentStepProps> = ({
  feedbackType,
  onFeedbackReturnClick,
  onFeedbackSent,
}) => {
  const [comment, setComment] = useState('');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const canSendFeedback = !!comment.trim();

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault();

    if (!canSendFeedback || isSendingFeedback) return;

    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment: comment.trim(),
      screenshot,
    });

    setIsSendingFeedback(false);

    onFeedbackSent?.();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackReturnClick}
          className="
            top-5 left-5 absolute
            text-zinc-400 hover:text-zinc-100
          "
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <WidgetCloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="
            min-w-[304px] w-full min-h-[112px] sm:min-w-[258px]
            text-zinc-100 text-sm placeholder-zinc-400
            border-zinc-600 bg-transparent
            focus:border-brand-500 focus:outline-none rounded-md
            focus:ring-brand-500 focus:ring-1 resize-none
            scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
          "
          placeholder={feedbackTypeInfo.placeholderText}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />

          <button
            type="submit"
            disabled={!canSendFeedback || isSendingFeedback}
            className="
            hover:bg-brand-300 focus:outline-none focus:ring-2
            bg-brand-500 p-2 rounded-md border-transparent flex
            focus:ring-brand-500 focus:ring-offset-2 transition-colors
            focus:ring-offset-zinc-900 flex-1 justify-center items-center
            disabled:hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
};
