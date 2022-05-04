import { FC, useState } from 'react';

import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';
import { SelectFeedbackTypeStep } from './Steps/SelectFeedbackTypeStep';

import { FeedbackKey } from '../../utils/feedbackTypes';

export const WidgetForm: FC = () => {
  const [selectedFeedbackType, setSelectedFeedbackType] =
    useState<FeedbackKey | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function restartFeedback() {
    setSelectedFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div
      className="
      bg-zinc-900 shadow-lg
        p-4 mb-4 rounded-2xl relative
        flex flex-col items-center
        w-[calc(100vw-2rem)] sm:w-auto
      "
    >
      {feedbackSent ? (
        <FeedbackSuccessStep onSendAnotherFeedbackClick={restartFeedback} />
      ) : !selectedFeedbackType ? (
        <SelectFeedbackTypeStep
          onFeedbackTypeChanged={setSelectedFeedbackType}
        />
      ) : (
        <FeedbackContentStep
          feedbackType={selectedFeedbackType}
          onFeedbackReturnClick={restartFeedback}
          onFeedbackSent={() => setFeedbackSent(true)}
        />
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{' '}
        <a
          target="_blank"
          href="https://rocketseat.com.br"
          className="underline underline-offset-2"
          rel="noreferrer"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
};
