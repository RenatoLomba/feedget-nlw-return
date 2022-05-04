import { FC } from 'react';

import { WidgetCloseButton } from '../CloseButton';

import { FeedbackKey, feedbackTypes } from '../../../utils/feedbackTypes';

interface SelectFeedbackTypeStepProps {
  onFeedbackTypeChanged: (feedbackTypeKey: FeedbackKey) => void;
}

export const SelectFeedbackTypeStep: FC<SelectFeedbackTypeStepProps> = ({
  onFeedbackTypeChanged,
}) => {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <WidgetCloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([feedbackKey, feedbackValues]) => (
          <button
            type="button"
            key={feedbackKey}
            onClick={() => onFeedbackTypeChanged(feedbackKey as FeedbackKey)}
            className="
          bg-zinc-800 rounded-lg py-5 w-24
            flex-1 flex flex-col items-center gap-2
            border-2 border-transparent focus:border-brand-500
            focus:outline-none hover:border-brand-500
          "
          >
            <img
              src={feedbackValues.image.source}
              alt={feedbackValues.image.alt}
            />
            <span>{feedbackValues.title}</span>
          </button>
        ))}
      </div>
    </>
  );
};
