'use client';

import { useEffect, useState } from 'react';

import { CheckCircledIcon, CopyIcon, InputIcon, SliderIcon } from '@radix-ui/react-icons';

import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Props =
  ButtonProps
  & {
    whimUrl: string;
  }

export const CopyWhim = ( { whimUrl, variant = "ghost", ...props }: Props ) => {
  const [ isCopied, setIsCopied ] = useState( false );
  const handleCopy = async ( whim: string ) => {
    navigator.clipboard.writeText( whim );
  };

  useEffect( () => {
    if ( !isCopied ) {
      return;
    }

    const timer = setTimeout( () => {
      setIsCopied( false );
    }, 3000 );

    return () => clearTimeout( timer );
  }, [ isCopied ] );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={ variant }
          { ...props }
        >
          <CopyIcon className="w-4 h-4 shrink-0" />
          <span className="sr-only">Copy Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Copy Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={ () => {
            setIsCopied( true );
            handleCopy( `${ location.origin }/${ whimUrl }` );
            toast( 'Whim copied with link style.', {
              description: `${ location.origin }/${ whimUrl }`,
              className: "bg-muted"
            } );
          } }
        >
          Link
          { isCopied
            ? <CheckCircledIcon className="ml-auto w-4 h-4" />
            : <InputIcon className="ml-auto w-4 h-4" /> }
          <span className="sr-only">Link copy</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={ () => {
            setIsCopied( true );
            handleCopy( `${ location.host }/${ whimUrl }` );
            toast( 'Whim copied with clean style', {
              description: `${ location.host }/${ whimUrl }`,
              className: "bg-muted"
            } );
          } }
        >
          Clean
          { isCopied
            ? <CheckCircledIcon className="ml-auto w-4 h-4" />
            : <SliderIcon className="ml-auto w-4 h-4" /> }
          <span className="sr-only">Clean copy</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};