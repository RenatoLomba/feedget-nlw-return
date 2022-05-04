import { FC, useState } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';

import { Loading } from '../Loading';

interface ScreenshotButtonProps {
  screenshot: null | string;
  onScreenshotTaken?: (screenshotTaken: string | null) => void;
}

export const ScreenshotButton: FC<ScreenshotButtonProps> = ({
  screenshot,
  onScreenshotTaken,
}) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    if (isTakingScreenshot) return;

    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64Image = canvas.toDataURL('image/png');

    onScreenshotTaken?.(base64Image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTaken?.(null)}
        className="
        text-zinc-400 p-1 w-10 h-10 rounded-md border-transparent
        hover:text-zinc-100 flex justify-end items-end transition-colors
        "
        style={{
          backgroundImage: `url('${screenshot}')`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="
        focus:ring-brand-500 focus:outline-none focus:ring-2
        bg-zinc-800 p-2 rounded-md border-transparent transition-colors
        focus:ring-offset-zinc-900 focus:ring-offset-2 hover:bg-zinc-700
      "
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  );
};
