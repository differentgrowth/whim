'use client';

// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { ArrowTopRightIcon, UpdateIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

type Props = {
  className?: string;
  icon?: React.ReactNode
  children: React.ReactNode;
}

export const SubmitButton = ( { className, children, icon }: Props ) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={ className }
      type="submit"
      aria-disabled={ pending }
    >
      { children }

      { pending
        ? <UpdateIcon className="ml-1.5 w-4 h-4 animate-spin" />
        : icon || <ArrowTopRightIcon className="ml-1.5 w-4 h-4" />
      }
    </Button>
  );
};