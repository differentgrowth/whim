'use client';

import { useEffect, useRef } from "react";
import { useFormState } from 'react-dom';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { type AnonymousState, type State } from '@/definitions/actions';
import { CopyWhim } from '@/components/copy-whim';

type Props =
  Omit<React.FormHTMLAttributes<HTMLFormElement>, 'action'>
  & {
    action: ( state: State | undefined, formData: FormData ) => Promise<State>;
    children: React.ReactNode;
  }

export const ActionForm = ( { action, children, ...props }: Props ) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ state, formAction ] = useFormState( action, undefined );
  const formRef = useRef<HTMLFormElement>( null );

  useEffect( () => {
    if ( state?.type !== 'success' ) return;
    formRef.current?.reset();
    searchParams.size && push( pathname );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ state, pathname ] );

  useEffect( () => {
    if ( !state?.type ) return;
    toast[ state.type ]( state?.message );
  }, [ state ] );

  return (
    <>
      <form
        action={ formAction }
        ref={ formRef }
        { ...props }
      >
        { children }
      </form>
    </>
  );
};


type AnonymousFormProps =
  Omit<React.FormHTMLAttributes<HTMLFormElement>, 'action'>
  & {
    action: ( state: AnonymousState | undefined, formData: FormData ) => Promise<AnonymousState>;
    children: React.ReactNode;
  }

export const CreateAnonymousWhimForm = ( { action, children, ...props }: AnonymousFormProps ) => {
  const [ state, formAction ] = useFormState( action, undefined );

  useEffect( () => {
    if ( !state?.type ) return;
    toast[ state.type ]( state?.message );
  }, [ state ] );

  return (
    <>
      <form action={ formAction } { ...props }>
        { children }
      </form>

      { !!state?.shorted_url
        ? (
          <div className="flex w-full max-w-2xl flex-row items-center rounded-sm">
            <span className="bg-card text-card-foreground h-9 grow rounded-sm border px-3 py-1 shadow">
              { `whim.li/${ state.shorted_url }` }
            </span>

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
