import { FC } from 'react';
import { ChatTeardropDots } from 'phosphor-react';
import { Popover } from '@headlessui/react';

export const Widget: FC = () => {
  return (
    <Popover className="absolute bottom-5 right-5">
      <Popover.Panel>Hello world</Popover.Panel>

      <Popover.Button
        className="
        bg-brand-500 text-white
          rounded-full px-3 h-12
          flex items-center
          group
        "
      >
        <ChatTeardropDots size="24" />

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
