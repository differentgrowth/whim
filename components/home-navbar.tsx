'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EnterIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className={ cn(
        'flex flex-row flex-wrap items-center p-2 mt-1.5',
        pathname === '/'
        ? 'justify-end'
        : 'justify-between'
      ) }
    >
      { pathname !== '/'
        ? (
          <Link
            href="/"
            className="flex flex-row justify-center items-center"
          >
            <HomeIcon className="mr-1.5 w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Whim</span>
          </Link>
        )
        : null }

      { pathname !== '/login'
        ? (
          <NavigationMenu>
            <NavigationMenuList className="m-0">
              <NavigationMenuItem className="mt-0">
                <Link
                  href="/login"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={ navigationMenuTriggerStyle() }>
                    Log In
                    <EnterIcon className="ml-1.5 w-4 h-4" />
                  </NavigationMenuLink>
                </Link>
                <Link
                  href="/login?value=signup"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className={ navigationMenuTriggerStyle() }>
                    Sign Up
                    <PersonIcon className="ml-1.5 w-4 h-4" />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )
        : null }
    </nav>
  );
};