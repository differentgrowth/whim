'use client';

import { useEffect, useState } from 'react';

import { CheckCircledIcon, CopyIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

type Props = {
  whimUrl: string;
}

export const CopyWhim = ( { whimUrl }: Props ) => {
  const [ isCopied, setIsCopied ] = useState( false );
  const onClick = async () => {
    const blob = new Blob( [ `whim.li/${ whimUrl }` ], { type: 'text/plain' } );
    const data = [ new ClipboardItem( { [ 'text/plain' ]: blob } ) ];

    try {
      await navigator.clipboard.write( data );
      setIsCopied( true );
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
    <Button
      size="icon"
      variant="ghost"
      onClick={ onClick }
    >
      { isCopied
        ? <CheckCircledIcon className="w-4 h-4" />
        : <CopyIcon className="w-4 h-4" /> }
    </Button>
  );
};