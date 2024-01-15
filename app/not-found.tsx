import Link from "next/link";

import { ResetIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="mb-0 pt-12">
      <h2 className="mx-auto w-fit">404 | Not Found</h2>

      <div className="mx-auto mt-12 w-fit">
        <Link
          href="/"
          className={ buttonVariants( { variant: 'outline' } ) }
        >
          Go to home page
          <ResetIcon className="ml-1.5 size-4" />
        </Link>
      </div>
    </main>
  );
};

export default NotFound;