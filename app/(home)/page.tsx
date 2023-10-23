import Link from 'next/link';

import { CreateAnonymousWhimForm } from '@/components/form';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { SubmitButton } from '@/components/submit-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link1Icon } from '@radix-ui/react-icons';

const Page = () => {

  return (
    <main>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-4 px-4 md:px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl tracking-tighter">Welcome to whim.li</h1>
            <p
              className={ cn(
                'max-w-2xl mx-auto',
                'text-muted-foreground'
              ) }
            >
              Transform long and cumbersome links into short, shareable URLs in a snap. Ideal for social media posts,
              emails, and more. Start simplifying your links now!
            </p>
            <p
              className={ cn(
                'max-w-xl mx-auto',
                'text-muted-foreground'
              ) }
            >
              The URL shortener you can trust.
            </p>
            <Link
              className={ buttonVariants( { variant: 'default' } ) }
              href="/signup"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container w-full max-w-2xl flex flex-col gap-4 px-4 md:px-6">
          <CreateAnonymousWhimForm className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Input
              className="w-full max-w-lg flex-1 rounded-sm"
              placeholder="Enter a long URL"
              type="url"
              name="url"
            />
            <SubmitButton
              className="rounded-sm"
              icon={ <Link1Icon className="ml-1.5 w-4 h-4" /> }
            >
              Shorten URL
            </SubmitButton>
          </CreateAnonymousWhimForm>
        </div>
      </section>

      <section className="w-full mx-auto max-w-7xl py-12 md:py-24 lg:py-32">
        <h2 className="font-bold tracking-tighter mb-8">Why choose whim.li?</h2>

        <div className="container flex flex-row flex-wrap justify-center items-stretch gap-4 px-4 md:px-6">
          <Card className="p-8 w-full max-w-md">
            <CardTitle>Simplicity</CardTitle>
            <CardDescription>
              Our interface is easy to use, making URL shortening a breeze.
            </CardDescription>
          </Card>
          <Card className="p-8 w-full max-w-md">
            <CardTitle>Speed</CardTitle>
            <CardDescription>
              Get your shortened URL in seconds.
            </CardDescription>
          </Card>
          <Card className="p-8 w-full max-w-md">
            <CardTitle>Reliability</CardTitle>
            <CardDescription>
              We ensure your URLs are available when you need them.
            </CardDescription>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Page;
