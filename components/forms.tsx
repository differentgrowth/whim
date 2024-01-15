'use client';

import { useRef } from "react";
import { useFormState } from 'react-dom';

import { AnonymousInitialState } from '@/definitions/actions';
import { Card, CardDescription } from '@/components/ui/card';
import { CopyWhim } from '@/components/copy-whim';
import { authenticate, checkProtectedWhim, create, createAnonymous } from '@/app/actions';
import { cn } from '@/lib/utils';

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
  const formRef = useRef<HTMLFormElement>( null );

  return (
    <>
      <form
        ref={ formRef }
        action={ async ( formData ) => {
          formAction( formData );
          formRef.current?.reset();
        } }
        noValidate
        spellCheck={ false }
        className={ className }
      >
        { children }
      </form>

      { !!state?.error
        ? <span className="text-destructive mt-6">{ state.error }</span>
        : !!state?.shorted_url
          ? (
            <div className="flex w-full max-w-2xl flex-row items-center">
              <p className="text-muted-foreground grow rounded-sm border px-3 py-1">
                { `whim.li/${ state.shorted_url }` }
              </p>
              <CopyWhim
                size="icon"
                variant="default"
                className="ml-1.5 grow-0 rounded-sm"
                whimUrl={ state.shorted_url }
                secretKey={ null }
              />
            </div>
          )
          : null }
    </>
  );
};

export const CreateWhimForm = ( { className, children }: Props ) => {
  const [ state, formAction ] = useFormState( create, undefined );
  const formRef = useRef<HTMLFormElement>( null );

  return (
    <>
      <form
        ref={ formRef }
        action={ async ( formData ) => {
          formAction( formData );
          formRef.current?.reset();
        } }
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
              'mx-auto mt-6 w-full max-w-lg p-4',
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

export const ProtectedWhimForm = ( { className, children }: Props ) => {
  const [ state, formAction ] = useFormState( checkProtectedWhim, undefined );

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
              'mx-auto mt-6 w-full max-w-lg p-4',
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
              'mx-auto mt-6 w-full max-w-lg p-4',
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