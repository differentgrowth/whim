import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';

import { Toaster } from "@/components/ui/sonner";

import './globals.css';
import { TailwindIndicator } from "@/components/tailwind-indicator";

export const metadata: Metadata = {
  title: 'Whim',
  description: 'URL shortener made by Different Growth',
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [ 'URl shortener' ],
  authors: [ { name: 'Alejandro RG', url: 'https://www.differentgrowth.com' } ],
  creator: 'Different Growth',
  publisher: 'Different Growth',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL( 'https://www.whim.li' )
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light',
  themeColor: '#fafaf9'
};

const RootLayout = ( { children }: {
  children: React.ReactNode
} ) => {
  return (
    <html
      lang="en"
      className={ GeistSans.className }
    >
    <body>
    { children }
    <Toaster richColors />
    <TailwindIndicator />
    </body>
    </html>
  );
};

export default RootLayout;
