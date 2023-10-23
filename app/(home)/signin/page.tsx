import Link from 'next/link';

import { ArrowRightIcon } from '@radix-ui/react-icons';

import { AuthForm } from '@/components/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { SubmitButton } from '@/components/submit-button';

const Page = () => {
  return (
    <main>
      <AuthForm
        type="signin"
        className="w-full max-w-lg"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Shorten Your URL in Seconds!</CardTitle>
            <CardDescription>
              Welcome to the quickest and easiest way to shorten your URLs.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-2 flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="me@email.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="***"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-1.5">
            <Link
              href="/signup"
              className={ buttonVariants( { variant: 'outline' } ) }
            >
              Sign Up
              <ArrowRightIcon className="ml-1.5 w-4 h-4" />
            </Link>

            <SubmitButton>Enter</SubmitButton>
          </CardFooter>
        </Card>
      </AuthForm>
    </main>
  );
};

export default Page;