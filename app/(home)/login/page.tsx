import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { AuthenticateForm } from "@/components/forms";

type PageProps = {
  params: {};
  searchParams: {
    value?: string;
  }
}

const Page = async ( { searchParams: { value = 'login' } }: PageProps ) => {
  return (
    <main>
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
            </TabsContent>
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Share your new urls in one-click.
                </CardDescription>
              </CardHeader>
            </TabsContent>

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

            <TabsContent value="login">
              <CardFooter className="flex justify-end">
                <SubmitButton>Enter</SubmitButton>
              </CardFooter>
            </TabsContent>
            <TabsContent value="signup">
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