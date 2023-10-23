import Link from 'next/link';

import { ArrowRightIcon } from '@radix-ui/react-icons';

import { AuthForm } from '@/components/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import { buttonVariants } from '@/components/ui/button';

const Page = () => {
  return (
    <main>
      <AuthForm
        type="signup"
        className="w-full max-w-lg"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>Share your new urls in one-click.</CardDescription>
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
                autoComplete="new-password"
                placeholder="***"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-1.5">
            <Link
              href="/signin"
              className={ buttonVariants( { variant: 'outline' } ) }
            >
              Sign In
              <ArrowRightIcon className="ml-1.5 w-4 h-4" />
            </Link>
            <SubmitButton>Register</SubmitButton>
          </CardFooter>
        </Card>
      </AuthForm>
    </main>
  );
};

export default Page;