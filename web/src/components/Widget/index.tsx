import { FC } from 'react';
import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';

import { WidgetForm } from './Form';

export const Widget: FC = () => {
  return (
    <Popover
      className="
        absolute bottom-4 right-4 md:bottom-8 md:right-8
        flex flex-col items-end
      "
    >
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button
        className="
        bg-brand-500 text-white
          rounded-full px-3 h-12
          flex items-center
          group
        "
      >
        <ChatTeardropDots className="w-6 h-6" />

        <span
          className="
            max-w-0 overflow-hidden
            transition-all duration-500 ease-linear
            group-hover:max-w-xs
          "
        >
          <span
            className="
              pl-2
              opacity-0 transition-opacity duration-500
              group-hover:opacity-100
            "
          >
            Feedback
          </span>
        </span>
      </Popover.Button>
    </Popover>
  );
};
