import { ExitIcon } from '@radix-ui/react-icons';

import { SubmitButton } from "@/components/submit-button";
import { signOut } from "@/auth";

export const DashboardNavbar = () => {
    return (
        <nav className="flex flex-row flex-wrap justify-end items-center p-2 mt-1.5">
            <form
                action={ async () => {
                    'use server';
                    await signOut( { redirect: true, redirectTo: '/login' } );
                } }
            >
                <SubmitButton icon={ <ExitIcon className="ml-1.5 w-4 h-4" /> }>
                    Sign Out
                </SubmitButton>
            </form>
        </nav>
    );
};