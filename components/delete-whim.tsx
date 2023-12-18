import { Cross1Icon, TrashIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/submit-button";
import { deleteWhimAction } from "@/app/actions";

type Props = {
  whimId: number;
  customerId: string;
}

export const DeleteWhim = ( { whimId, customerId }: Props ) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Remove Whim</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your whim from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
            >
              Cancel
              <Cross1Icon className="ml-1.5 w-4 h-4" />
            </Button>
          </DialogClose>
          <form
            action={ deleteWhimAction.bind( null, { whimId, customerId } ) }
            noValidate
          >
            <DialogClose asChild>
              <SubmitButton icon={ <TrashIcon /> }>
                Delete
              </SubmitButton>
            </DialogClose>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};