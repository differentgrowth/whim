import { Suspense } from "react";

import { ChevronRightIcon, GearIcon } from "@radix-ui/react-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActionForm } from "@/components/forms";
import { DatePicker } from "@/components/date-picker";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/input-password";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { WhimTable } from "@/components/whim-table";
import { create } from "@/app/actions";

type PageProps = {
  params: {
    customer_id: string;
  };
  searchParams: {};
};

const Page = async ({ params: { customer_id } }: PageProps) => {
  return (
    <main className="space-y-6">
      <Accordion type="single" collapsible className="container max-w-lg">
        <AccordionItem value="new-whim">
          <AccordionTrigger>New Whim</AccordionTrigger>
          <AccordionContent>
            <ActionForm
              action={create}
              noValidate
              spellCheck={false}
              className="mx-auto w-full max-w-lg"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Create your new Whim</CardTitle>
                </CardHeader>

                <CardContent className="mt-3 flex flex-col gap-4">
                  <input
                    type="hidden"
                    value={customer_id}
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
                    <Label htmlFor="expiration">
                      Expiration Date (optional)
                    </Label>
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

                <CardFooter className="flex justify-end">
                  <SubmitButton icon={<ChevronRightIcon />}>
                    Create
                  </SubmitButton>
                </CardFooter>
              </Card>
            </ActionForm>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Suspense
        fallback={<GearIcon className="mx-auto size-16 animate-spin" />}
      >
        <WhimTable customerId={customer_id} />
      </Suspense>
    </main>
  );
};

export default Page;
