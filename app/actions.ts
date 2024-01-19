'use server';

import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from "next/navigation";

import { z } from 'zod';
import { compareAsc } from "date-fns";
import { compare, hash } from "bcrypt";

import { checkCustomerExists, createAnonymousWhim, createWhim, deleteWhim, getWhimPassword } from '@/lib/db';
import { signIn, signOut } from '@/auth';
import { AnonymousState, type State } from "@/definitions/actions";

export const authenticate = async ( _prevState: State | undefined, formData: FormData ) => {
  try {
    const { email, password, type } = Object.fromEntries( formData.entries() ) as {
      email: string;
      password: string;
      type: 'login' | 'signup'
    };
    if ( type === 'login' ) {
      const data = await checkCustomerExists( { email } );
      if ( !data ) {
        return {
          type: 'warning' as const,
          message: 'This user doesn\'t exist'
        };
      }
    }
    await signIn( 'credentials', { email, password, redirect: false } );
  } catch ( error: any ) {
    if ( error.type === 'CredentialsSignin' ) {
      return {
        type: 'error' as const,
        message: 'Invalid Credentials'
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
          .trim()
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

export const create = async ( _prevState: State | undefined, formData: FormData ) => {
  const parsed = createSchema.safeParse( Object.fromEntries( formData.entries() ) as unknown as z.infer<typeof createSchema> );

  if ( !parsed.success ) {
    const errors = Object.keys( parsed.error.flatten().fieldErrors );
    if ( errors.includes( 'url' ) ) {
      return {
        type: 'error' as const,
        message: 'Invalid URL!'
      };
    }
    if ( errors.includes( 'expiration' ) ) {
      return {
        type: 'warning' as const,
        message: 'Invalid date!'
      };
    }
    if ( errors.includes( 'password' ) ) {
      return {
        type: 'warning' as const,
        message: 'Invalid password! The minimum length is 6 characters.'
      };
    }
    return {
      type: 'warning' as const,
      message: 'Invalid data!'
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
      type: 'error' as const,
      message: 'Oops! Something went wrong.'
    };
  }

  revalidatePath( `/dashboard/${ parsed.data.customer_id }`, 'page' );
  return {
    type: 'success' as const,
    message: 'Whim created successfully'
  };
};

const createAnonymousSchema = z.object(
  {
    url: z.string()
          .trim()
          .url()
  }
);

export const createAnonymous = async ( _prevState: AnonymousState | undefined, formData: FormData ) => {
  const parsed = createAnonymousSchema.safeParse( Object.fromEntries( formData.entries() ) as z.infer<typeof createAnonymousSchema> );

  if ( !parsed.success ) {
    return {
      type: 'error' as const,
      message: 'Invalid url!',
      shorted_url: null
    };
  }

  try {
    const { shorted_url } = await createAnonymousWhim( { url: parsed.data.url } );

    return {
      type: 'success' as const,
      message: 'Whim created successfully',
      shorted_url
    };
  } catch ( e ) {
    return {
      type: 'error' as const,
      message: 'Oops! Something went wrong.',
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
export const deleteWhimAction = async ( _prevState: State | undefined, formData: FormData ) => {
  const data = { ...Object.fromEntries( formData.entries() ) };
  const parsed = deleteSchema.safeParse( { ...data, whimId: +data.whimId } as unknown as z.infer<typeof deleteSchema> );

  if ( !parsed.success ) {
    return {
      type: 'error' as const,
      message: 'Invalid data!'
    };
  }

  try {
    await deleteWhim( { whimId: parsed.data.whimId, customerId: parsed.data.customerId } );
  } catch ( e ) {
    return {
      type: 'error' as const,
      message: 'Something went wrong!'
    };
  }

  revalidatePath( `/dashboard/${ parsed.data.customerId }` );
  return {
    type: 'success' as const,
    message: 'Whim deleted successfully'
  };
};

const checkPasswordSchema = z.object(
  {
    shorted_url: z.string(),
    password: z.string()
  }
);

export const checkProtectedWhim = async ( _prevState: State | undefined, formData: FormData ) => {
  const parsed = checkPasswordSchema.safeParse( Object.fromEntries( formData.entries() ) as z.infer<typeof checkPasswordSchema> );
  if ( !parsed.success ) {
    return {
      type: 'error' as const,
      message: 'Invalid data!'
    };
  }

  let url = null;
  try {
    const whim = await getWhimPassword( { shorted_url: parsed.data.shorted_url } );

    if ( !whim || !whim?.password || !whim.url ) {
      return {
        type: 'error' as const,
        message: 'Invalid whim!'
      };
    }

    url = whim.url;
    const passwordsMatch = await compare( parsed.data.password, whim.password );
    if ( !passwordsMatch ) {
      return {
        type: 'error' as const,
        message: 'Invalid password!'
      };
    }
  } catch ( e ) {
    return {
      type: 'error' as const,
      message: 'Something went wrong!'
    };
  }

  redirect( url, RedirectType.replace );
};