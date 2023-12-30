import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <main className="pt-12 mb-0">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            This Whim has expired
          </CardTitle>
        </CardHeader>
      </Card>
    </main>
  );
};

export default Page;