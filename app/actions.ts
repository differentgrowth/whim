'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from "next/navigation";

import { z } from 'zod';
import { compareAsc } from "date-fns";
import { compare, hash } from "bcrypt";

import { createAnonymousWhim, createWhim, deleteWhim, getWhimPassword } from '@/lib/db';
import { signIn, signOut } from '@/auth';
import { AnonymousInitialState, AuthenticateInitialState, CreateInitialState } from "@/definitions/actions";

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

export const signout = async () => {
  try {
    await signOut( { redirect: false } );
  } catch ( e ) {
    console.log( e );
  }
  redirect( `/`, RedirectType.replace );
};


const createSchema = z.object(
  {
    customer_id: z.string(),
    url: z.string()
          .url(),
    name: z.string()
           .nullable(),
    expiration: z.string()
                 .transform( data => data === ''
                                     ? null
                                     : data )
                 .refine( data => data === null || compareAsc( new Date( data ), new Date() ), {
                   message: 'invalid date'
                 } ),
    password: z.string()
               .nullable()
               .transform( data => data === ''
                                   ? null
                                   : data )
               .refine( data => data === null || data.length > 5, {
                 message: 'invalid password'
               } )
  }
);

export const create = async ( _prevState: CreateInitialState, formData: FormData ) => {
  const parsed = createSchema.safeParse( Object.fromEntries( formData.entries() ) as unknown as z.infer<typeof createSchema> );

  if ( !parsed.success ) {
    if ( parsed.error.errors[ 0 ].message === 'invalid date' ) {
      return {
        error: 'Invalid date!'
      };
    }
    if ( parsed.error.errors[ 0 ].message === 'invalid password' ) {
      return {
        error: 'Invalid password! The minimum length is 6 characters.'
      };
    }
    return {
      error: 'Invalid data!'
    };
  }

  try {
    const encryptPassword = parsed.data.password
                            ? await hash( parsed.data.password, 6 )
                            : null;
    await createWhim( {
                        customerId: parsed.data.customer_id,
                        url: parsed.data.url,
                        name: parsed.data.name,
                        expiration: parsed.data.expiration,
                        password: encryptPassword
                      } );
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.'
    };
  }

  revalidatePath( `/dashboard/${ parsed.data.customer_id }`, 'page' );
  return {
    error: null
  };
};

const createAnonymousSchema = z.object(
  {
    url: z.string()
          .trim()
          .url()
  }
);

export const createAnonymous = async ( _prevState: AnonymousInitialState, formData: FormData ) => {
  const parsed = createAnonymousSchema.safeParse( Object.fromEntries( formData.entries() ) as z.infer<typeof createAnonymousSchema> );

  if ( !parsed.success ) {
    return {
      error: 'Invalid url!',
      shorted_url: null
    };
  }

  try {
    const { shorted_url } = await createAnonymousWhim( { url: parsed.data.url } );

    return {
      error: null,
      shorted_url
    };
  } catch ( e ) {
    return {
      error: 'Oops! Something went wrong.',
      shorted_url: null
    };
  }
};

const deleteSchema = z.object(
  {
    whimId: z.number()
             .int()
             .positive(),
    customerId: z.string()
                 .uuid()
  }
);
export const deleteWhimAction = async ( formData: {
  whimId: number;
  customerId: string
} ) => {
  const parsed = deleteSchema.safeParse( formData as z.infer<typeof deleteSchema> );

  if ( !parsed.success ) {
    return {
      error: 'Invalid data!'
    };
  }

  try {
    await deleteWhim( { whimId: parsed.data.whimId, customerId: parsed.data.customerId } );
  } catch ( e ) {
    return {
      error: 'Something went wrong!'
    };
  }

  revalidatePath( `/dashboard/${ parsed.data.customerId }` );
};

const checkPasswordSchema = z.object(
  {
    shorted_url: z.string(),
    password: z.string()
  }
);

export const checkProtectedWhim = async ( _prevState: CreateInitialState, formData: FormData ) => {
  const parsed = checkPasswordSchema.safeParse( Object.fromEntries( formData.entries() ) as z.infer<typeof checkPasswordSchema> );
  if ( !parsed.success ) {
    return {
      error: 'Invalid data!'
    };
  }

  let url = null;
  try {
    const whim = await getWhimPassword( { shorted_url: parsed.data.shorted_url } );

    if ( !whim || !whim?.password || !whim.url ) {
      return {
        error: 'Invalid whim!'
      };
    }

    url = whim.url;
    const passwordsMatch = await compare( parsed.data.password, whim.password );
    if ( !passwordsMatch ) {
      return {
        error: 'Invalid password!'
      };
    }
  } catch ( e ) {
    return {
      error: 'Something went wrong!'
    };
  }

  redirect( url, RedirectType.replace );
};