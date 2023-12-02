'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';
import { hash } from "bcrypt";

import { createAnonymousWhim, createCustomer, createWhim } from '@/lib/db';
import { signIn } from '@/auth';
import {
    AnonymousInitialState,
    AuthenticateInitialState,
    CreateInitialState,
    SignUpInitialState
} from "@/interfaces/actions";

const anonymousWhimSchema = z.object( {
                                          url: z.string()
                                                .url()
                                      } );

const signUpSchema = z.object( {
                                   email: z.string()
                                           .email(),
                                   password: z.string()
                                              .min( 8 )
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
        await signIn( 'credentials', formData );
    } catch ( error ) {
        if ( ( error as Error ).message.includes( 'CredentialsSignin' ) ) {
            return {
                error: 'CredentialSignin'
            };
        }
        throw error;
    }
};

export const signup = async ( _prevState: SignUpInitialState, formData: FormData ) => {
    try {
        const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof signUpSchema>;
        const parsed = signUpSchema.safeParse( entries );

        if ( !parsed.success ) {
            return {
                error: 'Invalid data!'
            };
        }

        if ( parsed.success ) {
            const encryptPassword = await hash( parsed.data.password, 10 );
            const customer = await createCustomer( {
                                                       email: parsed.data.email,
                                                       password: encryptPassword
                                                   } );

            if ( !customer ) {
                return {
                    error: 'Create user not possible right now! Try again later.'
                };
            }

            await signIn( 'credentials', formData );
        }
    } catch ( e ) {
        return {
            error: 'Oops! Something went wrong.'
        };
    }
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
        if ( parsed.success ) {
            await createWhim( {
                                  customerId: parsed.data.customer_id,
                                  url: parsed.data.url,
                                  name: parsed.data.name
                              } );

            revalidatePath( `/dashboard/${ parsed.data.customer_id }`, 'page' );
            return {
                error: null
            };
        }
    } catch ( e ) {
        return {
            error: 'Oops! Something went wrong.'
        };
    }
};
