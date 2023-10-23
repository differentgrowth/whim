'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ExitIcon, ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

export const DashboardNavbar = () => {
  const { replace } = useRouter();
  const [ isLoading, setIsLoading ] = useState( false );

  const onClick = async () => {
    setIsLoading( true );
    await signOut();
    replace( `/` );
  };

  return (
    <nav className="flex flex-row flex-wrap justify-end items-center py-4 px-2">
      <Button
        variant="ghost"
        onClick={ onClick }
      >
        Sign Out
        { isLoading
          ? <ReloadIcon className="ml-1.5 w-4 h-4 animate-spin" />
          : <ExitIcon className="ml-1.5 w-4 h-4" /> }
      </Button>
    </nav>
  );
};