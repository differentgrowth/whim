import { HeartFilledIcon } from '@radix-ui/react-icons';
import { buttonVariants } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 inset-x-0 flex flex-col gap-4 p-2">
      <div className="flex justify-end">
        <a
          href="https://www.differentgrowth.com"
          className={ buttonVariants( { variant: 'link', size: 'sm' } ) }
          target="_blank"
        >
          Made by Different Growth with love <HeartFilledIcon className="ml-1 w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};