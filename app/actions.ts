'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { createAnonymousWhim, createCustomer, createWhim, getCustomer } from '@/lib/db';
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

const schema = z.object( {
  customer_id: z.string(),
  url: z.string()
        .url(),
  name: z.string()
         .nullable()
} );

export const createAnonymous = async ( _prevState: {
  error: string | null,
  shorted_url: string | null
}, formData: FormData ) => {
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

export const signin = async ( _prevState: {
  error: string | null,
  redirect: string | null
}, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof signInSchema>;

    const parsed = signInSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid data!',
        redirect: null
      };
    }

    if ( parsed.success ) {
      const exists = await getCustomer( { email: parsed.data.email } );

      if ( !exists ) {
        return {
          error: 'This user is not registered!',
          redirect: null
        };
      }

      const { data, error } = await signIn( {
        email: parsed.data.email,
        password: parsed.data.password
      } );

      if ( error || !data.user?.user_metadata.customer_id ) {
        return {
          error: 'This user is not available!',
          redirect: null
        };
      }

      if ( !error && data.user?.user_metadata.customer_id ) {
        return {
          error: null,
          redirect: `/dashboard/${ data.user.user_metadata.customer_id }`
        };
      }
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.',
      redirect: null
    };
  }
};

export const signup = async ( _prevState: {
  error: string | null,
  redirect: string | null
}, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof signUpSchema>;

    const parsed = signUpSchema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid data!',
        redirect: null
      };
    }

    if ( parsed.success ) {
      const customer = await createCustomer( { email: parsed.data.email } );

      if ( !customer ) {
        return {
          error: 'Imposible create user right now! Try again later.',
          redirect: null
        };
      }

      const { data: { user }, error } = await signUp( {
        email: parsed.data.email,
        password: parsed.data.password,
        customer_id: customer.id
      } );
      if ( error || !user?.user_metadata.customer_id ) {
        return {
          error: 'Imposible sign up right now! Try again later.',
          redirect: null
        };
      }

      await signIn( {
        email: parsed.data.email,
        password: parsed.data.password
      } );

      redirect(`/dashboard/${ customer.id }`)
      return {
        error: null,
        redirect: `/dashboard/${ customer.id }`
      };
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.',
      redirect: null
    };
  }
};

export const create = async ( _prevState: { error: string | null; }, formData: FormData ) => {
  try {
    const entries = Object.fromEntries( formData.entries() ) as z.infer<typeof schema>;

    const parsed = schema.safeParse( entries );

    if ( !parsed.success ) {
      return {
        error: 'Invalid data!',
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
        error: null,
      };
    }
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.',
    };
  }
};
