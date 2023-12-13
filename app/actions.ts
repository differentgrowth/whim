'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from "next/navigation";

import { z } from 'zod';

import { createAnonymousWhim, createWhim } from '@/lib/db';
import { signIn, signOut } from '@/auth';
import { AnonymousInitialState, AuthenticateInitialState, CreateInitialState } from "@/interfaces/actions";

const anonymousWhimSchema = z.object( {
                                        url: z.string()
                                              .url()
                                      } );

const createSchema = z.object( {
                                 customer_id: z.string(),
                                 url: z.string()
                                       .url(),
                                 name: z.string()
                                        .nullable()
                               } );

export const createAnonymous = async ( _prevState: AnonymousInitialState, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof anonymousWhimSchema>;
    const parsed = anonymousWhimSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid url!',
        shorted_url: null
      };
    }

    if ( parsed.success ) {
      const { shorted_url } = await createAnonymousWhim( { url: parsed.data.url } );

      return {
        error: null,
        shorted_url
      };
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.',
      shorted_url: null
    };
  }
};

export const authenticate = async ( _prevState: AuthenticateInitialState, formData: FormData ) => {
  try {
    const { email, password } = Object.fromEntries( formData.entries() );
    await signIn( 'credentials', { email, password, redirect: false } );
  } catch ( error: any ) {
    if ( error.type === 'CredentialsSignin' ) {
      return {
        error: 'Invalid Credentials'
      };
    }
    throw error;
  }
  redirect( `/login`, RedirectType.replace );
};

export const create = async ( _prevState: CreateInitialState, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof createSchema>;

    const parsed = createSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid data!'
      };
    }
    await createWhim( {
                        customerId: parsed.data.customer_id,
                        url: parsed.data.url,
                        name: parsed.data.name
                      } );

    revalidatePath( `/dashboard/${ parsed.data.customer_id }`, 'page' );
    return {
      error: null
    };
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.'
    };
  }
};

export const signout = async () => {
  try {
    await signOut( { redirect: false } );
  } catch ( e ) {
    console.log( e );
  }
  redirect( `/`, RedirectType.replace );
};
