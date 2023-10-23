'use client';

import { useEffect, useState } from 'react';
// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom';
import { redirect } from 'next/navigation';

import { createAnonymous, signin, signup } from '@/app/actions';
import { CopyWhim } from '@/components/copy-whim';
import { Card, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children?: React.ReactNode;
}

export const CreateAnonymousWhimForm = ( { className, children }: Props ) => {
  const [ state, formAction ] = useFormState( createAnonymous, { error: null } );
  const [ whim, setWhim ] = useState<null | string>( null );

  useEffect( () => {
    if ( !state.shorted_url ) {
      return;
    }

    const url = new URL( state.shorted_url, location.origin );
    setWhim( url.host + url.pathname );
  }, [ state ] );

  return (
    <>
      <form
        action={ formAction }
        noValidate
        spellCheck={ false }
        className={ className }
      >
        { children }
      </form>

      { !!state.error
        ? <span className="mt-4 text-destructive">{ state.error }</span>
        : !!whim
          ? (
            <Card className="w-full max-w-2xl rounded-sm">
              <CopyWhim whimUrl={ state.shorted_url } />
              <span className="ml-2 text-muted-foreground">
                { whim }
              </span>
            </Card>
          )
          : null }
    </>
  );
};

export const AuthForm = ( { className, type, children }: Props & { type: 'signin' | 'signup' } ) => {
  const [ state, formAction ] = useFormState( type === 'signin'
                                              ? signin
                                              : signup, { error: null } );

  if ( state.redirect ) {
    redirect( state.redirect );
  }

  return (
    <>
      <form
        action={ formAction }
        className={ className }
        noValidate
        spellCheck={ false }
      >
        { children }
      </form>

      { !!state.error
        ? (
          <Card
            className={ cn(
              'mt-4 p-4 w-full max-w-lg',
              'border-destructive bg-destructive/10'
            ) }
          >
            <CardDescription className="text-destructive text-center">
              { state.error }
            </CardDescription>
          </Card>
        )
        : null }
    </>
  );
};
