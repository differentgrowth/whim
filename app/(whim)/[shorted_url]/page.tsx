import {
  notFound,
  permanentRedirect,
  redirect,
  RedirectType,
} from "next/navigation";

import { compareAsc } from "date-fns";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { getWhim, increaseWhimCounter } from "@/lib/db";
import { ActionForm } from "@/components/forms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputPassword } from "@/components/input-password";
import { SubmitButton } from "@/components/submit-button";
import { checkProtectedWhim } from "@/app/actions";

type PageProps = {
  params: {
    shorted_url: string;
  };
  searchParams: {
    sk?: string;
  };
};

const getData = async (shorted_url: string) => {
  try {
    const data = getWhim({ shorted_url });
    const increase = increaseWhimCounter({ shorted_url });

    const [redirect] = await Promise.all([data, increase]);

    return { ...redirect };
  } catch (e) {
    return {
      url: null,
      expiration: null,
      secret_key: null,
    };
  }
};

const Page = async ({
  params: { shorted_url },
  searchParams: { sk },
}: PageProps) => {
  const { url, expiration, secret_key } = await getData(shorted_url);

  if (!url) {
    notFound();
  }

  if (secret_key && sk && secret_key === sk) {
    redirect(url, RedirectType.replace);
  }

  if (!secret_key && !expiration) {
    permanentRedirect(url, RedirectType.replace);
  }

  if (!secret_key && expiration && compareAsc(expiration, new Date()) < 1) {
    permanentRedirect("/expired", RedirectType.replace);
  }

  if (!secret_key) {
    redirect(url, RedirectType.replace);
  }

  return (
    <main>
      <ActionForm
        action={checkProtectedWhim}
        className="container mt-16 max-w-lg"
        noValidate
        spellCheck={false}
      >
        <Card>
          <CardHeader>
            <CardTitle>Protected Whim</CardTitle>
          </CardHeader>
          <CardContent className="mt-3 flex flex-col space-y-3">
            <input
              type="hidden"
              value={shorted_url}
              id="shorted_url"
              name="shorted_url"
            />
            <Label htmlFor="password">Password</Label>
            <InputPassword name="password" autocomplete="password" />
          </CardContent>
          <CardFooter>
            <SubmitButton className="ml-auto" icon={<DoubleArrowRightIcon />}>
              Enter
            </SubmitButton>
          </CardFooter>
        </Card>
      </ActionForm>
    </main>
  );
};

export default Page;
