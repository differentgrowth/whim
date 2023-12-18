'use client';

import { useFormState } from 'react-dom';

import { CopyWhim } from '@/components/copy-whim';
import { Card, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { authenticate, create, createAnonymous } from '@/app/actions';
import { AnonymousInitialState } from '@/interfaces/actions';

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const anonymousInitialState: AnonymousInitialState = {
  error: null,
  shorted_url: null
};
export const CreateAnonymousWhimForm = ( { className, children }: Props ) => {
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
            <div className="w-full max-w-2xl flex flex-row items-center">
              <p className="px-3 py-1 border text-muted-foreground grow rounded-sm">
                { `whim.li/${ state.shorted_url }` }
              </p>
              <CopyWhim
                size="icon"
                variant="default"
                className="ml-1.5 rounded-sm grow-0"
                whimUrl={ state.shorted_url }
              />
            </div>
          )
          : null }
    </>
  );
};

export const CreateWhimForm = ( { className, children }: Props ) => {
  const [ state, formAction ] = useFormState( create, undefined );

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
              'mt-4 p-4 w-full max-w-lg mx-auto',
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
export const AuthenticateForm = ( { className, children }: Props ) => {
  const [ state, formAction ] = useFormState( authenticate, undefined );

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
              'mt-4 p-4 w-full max-w-lg mx-auto',
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