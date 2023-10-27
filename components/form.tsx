'use client';

import { useFormState } from 'react-dom';
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
        : !!state.shorted_url
          ? (
            <Card className="w-full max-w-2xl rounded-sm">
              <CopyWhim whimUrl={ state.shorted_url } />
              <span className="ml-2 text-muted-foreground">
                { `whim.li/${ state.shorted_url }` }
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
