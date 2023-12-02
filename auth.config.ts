import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    providers: [],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized( { auth, request: { nextUrl } } ) {
            const isLoggedIn = !!auth?.user;
            const isOnAuthentication = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup';
            const isOnDashboard = nextUrl.pathname.startsWith( '/dashboard' );

            if ( isOnDashboard ) {
                // Redirect unauthenticated users to login page
                return isLoggedIn;
            }
            if ( isLoggedIn && isOnAuthentication ) {
                return Response.redirect( new URL( `/dashboard/${ auth.user!.name }`, nextUrl ) );
            }
            return true;
        }
    }
} satisfies NextAuthConfig;