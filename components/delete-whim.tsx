import { revalidatePath } from 'next/cache';

import { TrashIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { deleteWhim } from '@/lib/db';

type Props = {
  whimId: number; customerId: string;
}

export const DeleteWhim = ( { whimId, customerId }: Props ) => {
  const action = async () => {
    'use server';

    try {
      await deleteWhim( { whimId } );

      revalidatePath( `/dashboard/${ customerId }` );
    } catch ( e ) {
      console.error( e );
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <form
          action={ action }
          noValidate
        >
          <TooltipTrigger>
            <Button
              size="icon"
              variant="ghost"
              type="submit"
              aria-label="remove"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete immediately</p>
          </TooltipContent>
        </form>
      </Tooltip>
    </TooltipProvider>
  );
};