import { notFound, permanentRedirect, redirect, RedirectType } from 'next/navigation';

import { compareAsc } from "date-fns";

import { getWhim, increaseWhimCounter } from '@/lib/db';
import { ProtectedWhimForm } from "@/components/forms";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputPassword } from "@/components/input-password";
import { SubmitButton } from "@/components/submit-button";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

type PageProps = {
  params: {
    shorted_url: string;
  };
  searchParams: {
    pw?: string;
  };
}

const getData = async ( shorted_url: string ) => {
  try {
    const data = getWhim( { shorted_url } );
    const increase = increaseWhimCounter( { shorted_url } );

    const [ redirect ] = await Promise.all( [
                                              data,
                                              increase
                                            ] );

    return { ...redirect };
  } catch ( e ) {
    return {
      url: null,
      expiration: null,
      password: null
    };
  }
};

const Page = async ( { params: { shorted_url }, searchParams: { pw } }: PageProps ) => {
  const { url, expiration, password } = await getData( shorted_url );

  if ( !url ) {
    notFound();
  }

  if ( password && pw && password === pw ) {
    redirect( url, RedirectType.replace );
  }

  if ( !password && !expiration ) {
    permanentRedirect( url, RedirectType.replace );
  }

  if ( !password && expiration && compareAsc( expiration, new Date() ) < 1 ) {
    permanentRedirect( '/expired', RedirectType.replace );
  }

  if ( !password ) {
    redirect( url, RedirectType.replace );
  }

  return (
    <main>
      <ProtectedWhimForm className="container max-w-lg mt-16">
        <Card>
          <CardHeader>
            <CardTitle>
              Protected Whim
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 flex flex-col space-y-3">
            <input
              type="hidden"
              value={ shorted_url }
              id="shorted_url"
              name="shorted_url"
            />
            <Label htmlFor="password">Password</Label>
            <InputPassword
              name="password"
              autocomplete="password"
            />
          </CardContent>
          <CardFooter>
            <SubmitButton
              className="ml-auto"
              icon={ <DoubleArrowRightIcon /> }
            >
              Enter
            </SubmitButton>
          </CardFooter>
        </Card>
      </ProtectedWhimForm>
    </main>
  );
};

export default Page;