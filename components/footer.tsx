import { HeartFilledIcon } from '@radix-ui/react-icons';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 p-2">
      <div className="flex justify-end">
        <a
          target="_blank"
          href="https://www.differentgrowth.com"
          className="text-sm hover:underline"
        >
          Made by Different Growth with love <HeartFilledIcon className="inline-flex items-center ml-0.5" />
        </a>
      </div>
    </footer>
  );
};