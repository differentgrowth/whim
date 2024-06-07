import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <main className="mb-0 pt-12">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>This Whim has expired</CardTitle>
        </CardHeader>
      </Card>
    </main>
  );
};

export default Page;
