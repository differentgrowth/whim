'use server';

import { z } from 'zod';

import { createAnonymousWhim, createCustomer, getCustomer } from '@/lib/db';
import { signIn, signUp } from '@/lib/auth';

const anonymousWhimSchema = z.object( {
  url: z.string()
        .url()
} );

const signInSchema = z.object( {
  email: z.string()
          .email(),
  password: z.string()
} );

const signUpSchema = z.object( {
  email: z.string()
          .email(),
  password: z.string()
             .min( 8 )
} );

export const createAnonymous = async ( prevState: any, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof anonymousWhimSchema>;

    const parsed = anonymousWhimSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid url!'
      };
    }

    const { url } = anonymousWhimSchema.parse( entries );

    if ( parsed.success ) {
      const { shorted_url } = await createAnonymousWhim( { url } );

      return {
        error: null,
        shorted_url
      };
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.'
    };
  }
};

export const signin = async ( prevState: any, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof signInSchema>;

    const parsed = signInSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid data!'
      };
    }

    if ( parsed.success ) {
      const { email, password } = signInSchema.parse( entries );
      const exists = await getCustomer( { email } );

      if ( !exists ) {
        return {
          error: 'This user is not registered!'
        };
      }

      const { data, error } = await signIn( { email, password } );

      if ( error || !data.user?.user_metadata.customer_id ) {
        console.error( error );
        return {
          error: 'This user is not available!'
        };
      }

      if ( !error && data.user?.user_metadata.customer_id ) {
        return {
          redirect: `/dashboard/${ data.user.user_metadata.customer_id }`
        };
      }
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.'
    };
  }
};

export const signup = async ( prevState: any, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof signUpSchema>;

    const parsed = signUpSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid data!'
      };
    }

    if ( parsed.success ) {
      const { email, password } = signUpSchema.parse( entries );
      const customer = await createCustomer( { email } );

      if ( !customer ) {
        return {
          error: 'Imposible create user right now! Try again later.'
        };
      }

      const { data: { user }, error } = await signUp( { email, password, customer_id: customer.id } );
      if ( error || !user?.user_metadata.customer_id ) {
        return {
          error: 'Imposible sign up right now! Try again later.'
        };
      }

      await signIn( { email, password } );

      return {
        redirect: `/dashboard/${ customer.id }`
      };
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.'
    };
  }
};