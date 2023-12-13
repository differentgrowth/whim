import { ExitIcon } from '@radix-ui/react-icons';

import { SubmitButton } from "@/components/submit-button";
import { signout } from "@/app/actions";

export const DashboardNavbar = () => {
  return (
    <nav className="flex flex-row flex-wrap justify-end items-center p-2 mt-1.5">
      <form action={ signout }>
        <SubmitButton
          variant="ghost"
          icon={ <ExitIcon /> }
        >
          Sign Out
        </SubmitButton>
      </form>
    </nav>
  );
};