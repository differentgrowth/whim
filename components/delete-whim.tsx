"use client";

import { useState } from "react";

import { TrashIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SubmitButton } from "@/components/submit-button";
import { deleteWhimAction } from "@/app/actions";
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

type Props = {
  whimId: number;
  customerId: string;
}

export const DeleteWhim = ( { whimId, customerId }: Props ) => {
  const [ open, setOpen ] = useState( false );
  const isDesktop = useMediaQuery( "(min-width: 768px)" );

  if ( isDesktop ) {
    return (
      <Dialog
        open={ open }
        onOpenChange={ setOpen }
      >
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
          >
            <TrashIcon className="size-4" />
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
          <DialogFooter className="mt-6">
            <form
              action={ deleteWhimAction.bind( null, { whimId, customerId } ) }
              noValidate
            >
              <div className="ml-auto flex w-full max-w-md flex-row justify-end space-x-3">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <SubmitButton icon={ <TrashIcon /> }>
                    Delete
                  </SubmitButton>
                </DialogClose>
              </div>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={ open }
      onOpenChange={ setOpen }
    >
      <DrawerTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <TrashIcon className="size-4" />
          <span className="sr-only">Remove Whim</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your whim from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <form
            action={ deleteWhimAction.bind( null, { whimId, customerId } ) }
            noValidate
          >
            <div className="ml-auto flex w-full max-w-md flex-row justify-end space-x-3">
              <DrawerClose>
                <Button
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
              </DrawerClose>

              <DrawerClose asChild>
                <SubmitButton icon={ <TrashIcon /> }>
                  Delete
                </SubmitButton>
              </DrawerClose>
            </div>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};