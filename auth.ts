import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { compare } from 'bcrypt';

import { authConfig } from './auth.config';
import { getCustomer } from '@/lib/db';

export const {
    auth,
    signIn,
    signOut
} = NextAuth(
    {
        ...authConfig,
        providers: [
            Credentials(
                {
                    async authorize( credentials ) {
                        const parsedCredentials = z
                            .object( {
                                         email: z.string()
                                                 .email(),
                                         password: z.string()
                                                    .min( 8 )
                                     } )
                            .safeParse( credentials );

                        if ( parsedCredentials.success ) {
                            const {
                                email,
                                password
                            } = parsedCredentials.data;
                            const customer = await getCustomer( { email } );
                            if ( !customer || !customer.password ) {
                                return null;
                            }

                            const passwordsMatch = await compare( password, customer.password );
                            if ( passwordsMatch ) {
                                return {
                                    id: customer.id,
                                    name: customer.id,
                                    email: customer.email
                                }
                            }
                        }

                        return null;
                    }
                } )
        ]
    } );