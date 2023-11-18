'use client';

import { useFormState } from 'react-dom';

import { CopyWhim } from '@/components/copy-whim';
import { Card, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { create, createAnonymous, signin, signup } from '@/app/actions';
import { redirect } from 'next/navigation';

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const anonymousInitialState: {
  error: null | string;
  shorted_url: null | string;
} | undefined = {
  error: null,
  shorted_url: null
};
export const CreateAnonymousWhimForm = ( { className, children }: Props ) => {
  // @ts-expect-error
  const [ state, formAction ] = useFormState( createAnonymous, anonymousInitialState );

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

      { !!state?.error
        ? <span className="mt-4 text-destructive">{ state.error }</span>
        : !!state?.shorted_url
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


const authInitialState: {
  error: null | string;
  redirect: null | string;
} | undefined = {
  error: null,
  redirect: null
};
export const AuthForm = ( { className, type, children }: Props & { type: 'signin' | 'signup' } ) => {
  // @ts-expect-error
  const [ signInState, signInFormAction ] = useFormState( signin, authInitialState );
  // @ts-expect-error
  const [ signUpState, signUpFormAction ] = useFormState( signup, authInitialState );

  if ( signInState?.redirect ) {
    redirect( signInState.redirect );
  }
  if ( signUpState?.redirect ) {
    redirect( signUpState.redirect );
  }

  return (
    <>
      <form
        action={ type === 'signin'
                 ? signInFormAction
                 : signUpFormAction }
        className={ className }
        noValidate
        spellCheck={ false }
      >
        { children }
      </form>

      { !!signInState?.error
        ? (
          <Card
            className={ cn(
              'mt-4 p-4 w-full max-w-lg',
              'border-destructive bg-destructive/10'
            ) }
          >
            <CardDescription className="text-destructive text-center">
              { signInState.error }
            </CardDescription>
          </Card>
        )
        : null }

      { !!signUpState?.error
        ? (
          <Card
            className={ cn(
              'mt-4 p-4 w-full max-w-lg',
              'border-destructive bg-destructive/10'
            ) }
          >
            <CardDescription className="text-destructive text-center">
              { signUpState.error }
            </CardDescription>
          </Card>
        )
        : null }
    </>
  );
};

const createInitialState: {
  error: string | null;
} | undefined = {
  error: null
};
export const CreateWhimForm = ( { className, children }: Props ) => {
  // @ts-expect-error
  const [ state, formAction ] = useFormState( create, createInitialState );

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

      { !!state?.error
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