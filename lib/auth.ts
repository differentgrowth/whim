import { createClient } from '@supabase/supabase-js';

const supabase = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY );

export const signUp = async ( { email, password, customer_id }: {
  email: string;
  password: string;
  customer_id: string;
} ) => {
  return supabase.auth.signUp( {
    email,
    password,
    options: {
      data: {
        customer_id
      }
    }
  } );
};

export const signIn = async ( { email, password }: { email: string; password: string; } ) => {
  return supabase.auth.signInWithPassword( {
    email,
    password
  } );
};

export const signOut = async () => {
  return supabase.auth.signOut();
};