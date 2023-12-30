import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = ( ...inputs: ClassValue[] ) => {
  return twMerge( clsx( inputs ) );
};

export const createShortedUrl = () => {
  return Math.random()
             .toString( 36 )
             .slice( 2, 8 );
};

export const createSecretKey = () => {
  return Math.random()
             .toString( 36 )
             .slice( 2, 6 );
};