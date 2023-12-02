'use client';

import { useFormState } from 'react-dom';

import { CopyWhim } from '@/components/copy-whim';
import { Card, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { authenticate, create, createAnonymous, signup } from '@/app/actions';
import {
    AnonymousInitialState,
    AuthenticateInitialState,
    CreateInitialState,
    SignUpInitialState
} from '@/interfaces/actions';

type Props = {
    className?: string;
    children?: React.ReactNode;
}

const anonymousInitialState: AnonymousInitialState = {
    error: null,
    shorted_url: null
};
export const CreateAnonymousWhimForm = ( {
                                             className,
                                             children
                                         }: Props ) => {
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

const createInitialState: CreateInitialState = {
    error: null
};
export const CreateWhimForm = ( {
                                    className,
                                    children
                                }: Props ) => {
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


const signupInitialState: SignUpInitialState = {
    error: null
};
export const SignupForm = ( {
                                className,
                                children
                            }: Props ) => {
    const [ state, formAction ] = useFormState( signup, signupInitialState );

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

const authInitialState: AuthenticateInitialState = {
    error: null
};
export const AuthenticateForm = ( {
                                      className,
                                      children
                                  }: Props ) => {
    const [ state, formAction ] = useFormState( authenticate, authInitialState );

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