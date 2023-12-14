'use client';

import { useEffect, useState } from 'react';

import { CheckCircledIcon, CopyIcon, InputIcon, SliderIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button, ButtonProps } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props =
  ButtonProps
  & {
  whimUrl: string;
}

export const CopyWhim = ( { whimUrl, variant = "ghost", ...props }: Props ) => {
  const { toast } = useToast();
  const [ isCopied, setIsCopied ] = useState( false );
  const handleCopy = async ( whim: string ) => {
    const blob = new Blob( [ whim ], { type: 'text/plain' } );
    const data = [ new ClipboardItem( { [ 'text/plain' ]: blob } ) ];

    try {
      await navigator.clipboard.write( data );
    } catch ( e ) {
      console.error( e );
    }
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
            handleCopy( `https://whim.li/${ whimUrl }` );
            toast( {
                     title: "Whim copied with link style",
                     description: `https://whim.li/${ whimUrl }`,
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
            handleCopy( `whim.li/${ whimUrl }` );
            toast( {
                     title: "Whim copied with clean style",
                     description: `whim.li/${ whimUrl }`,
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