import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { AuthenticateForm } from "@/components/forms";
import { InputPassword } from "@/components/input-password";

type PageProps = {
  params: {};
  searchParams: {
    value?: string;
  }
}

const Page = async ( { searchParams: { value = 'login' } }: PageProps ) => {
  return (
    <main className="mt-12 flex justify-center">
      <Tabs
        defaultValue={ value }
        className="w-full max-w-lg"
      >
        <TabsList className="flex">
          <TabsTrigger
            value="login"
            className="grow"
          >
            Log In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="grow"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <AuthenticateForm className="w-full max-w-lg">
          <Card className="w-full">
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Shorten Your URL in Seconds!</CardTitle>
                <CardDescription>
                  Welcome to the quickest and easiest way to shorten your URLs.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-3 flex flex-col gap-4">
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
                  <InputPassword
                    name="password"
                    autocomplete="password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <SubmitButton>Enter</SubmitButton>
              </CardFooter>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Share your new urls in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-3 flex flex-col gap-4">
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
                  <InputPassword
                    name="new-password"
                    autocomplete="new-password"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <SubmitButton>Register</SubmitButton>
              </CardFooter>
            </TabsContent>

          </Card>
        </AuthenticateForm>
      </Tabs>
    </main>
  );
};

export default Page;