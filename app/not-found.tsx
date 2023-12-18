import Link from "next/link";

import { ResetIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="pt-12 mb-0">
      <h2 className="w-fit mx-auto">404 | Not Found</h2>

      <div className="w-fit mx-auto mt-12">
        <Link
          href="/"
          className={ buttonVariants( { variant: 'outline' } ) }
        >
          Go to home page
          <ResetIcon className="ml-1.5 w-4 h-4" />
        </Link>
      </div>
    </main>
  );
};

export default NotFound;