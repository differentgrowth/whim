import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter( { subsets: [ 'latin' ] } );

export const metadata: Metadata = {
  title: 'Whim',
  description: 'URL shortener made by Different Growth',
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [ 'URl shortener' ],
  authors: [ { name: 'Alejandro RG', url: 'https://www.differentgrowth.com' } ],
  colorScheme: 'light',
  creator: 'Different Growth',
  publisher: 'Different Growth',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://www.whim.li')
};

const RootLayout = ( { children }: { children: React.ReactNode } ) => {
  return (
    <html lang="en">
    <body className={ inter.className }>
    { children }
    </body>
    </html>
  );
};

export default RootLayout;
