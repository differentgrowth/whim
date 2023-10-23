import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/interfaces/supabase';

export async function middleware( req: NextRequest ) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>( { req, res } );

  const { data: { session } } = await supabase.auth.getSession();
  if ( !session && req.url.startsWith( '/dashboard' ) ) {
    return NextResponse.redirect( new URL( `/signin`, req.url ) );
  }
  if ( !!session && ( req.url.startsWith( '/signin' ) || req.url.startsWith( '/signup' ) ) ) {
    return NextResponse.redirect( new URL( `/dashboard/${ session.user.user_metadata.customer_id }`, req.url ) );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin/:path*',
    '/signup/:path*'
  ]
};