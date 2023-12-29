import { Suspense } from "react";

import { ChevronRightIcon, GearIcon, ResetIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateWhimForm } from '@/components/forms';
import { DatePicker } from "@/components/date-picker";
import { Input } from '@/components/ui/input';
import { InputPassword } from "@/components/input-password";
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';
import { WhimTable } from '@/components/whim-table';

type PageProps = {
  params: {
    customer_id: string;
  };
  searchParams: {};
}

const Page = async ( { params: { customer_id } }: PageProps ) => {
  return (
    <main>
      <CreateWhimForm className="w-full max-w-lg mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create your new Whim</CardTitle>
          </CardHeader>

          <CardContent className="mt-2 flex flex-col gap-4">
            <input
              type="hidden"
              value={ customer_id }
              id="customer_id"
              name="customer_id"
            />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="My new Whim"
              />
            </div>
            <div>
              <Label htmlFor="url">Url</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://"
              />
            </div>
            <div>
              <Label htmlFor="expiration">Expiration Date (optional)</Label>
              <DatePicker />
            </div>
            <div>
              <Label htmlFor="password">Password (optional)</Label>
              <InputPassword
                name="password"
                autocomplete="new-password"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-1.5">
            <Button
              type="reset"
              variant="outline"
            >
              Reset
              <ResetIcon className="ml-1.5 w-4 h-4" />
            </Button>
            <SubmitButton icon={ <ChevronRightIcon /> }>
              Create
            </SubmitButton>
          </CardFooter>
        </Card>
      </CreateWhimForm>

      <Suspense fallback={ <GearIcon className="w-16 h-16 mx-auto animate-spin" /> }>
        <WhimTable customerId={ customer_id } />
      </Suspense>
    </main>
  );
};

export default Page;