import { ChevronRightIcon, ResetIcon } from '@radix-ui/react-icons';

import { WhimTable } from '@/components/whim-table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { CreateWhimForm } from '@/components/forms';

type PageProps = {
    params: {
        customer_id: string;
    };
    searchParams: {};
}

const Page = async ( { params: { customer_id } }: PageProps ) => {
    return (
        <main>
            <CreateWhimForm className="w-full max-w-lg">
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
                    </CardContent>

                    <CardFooter className="flex justify-end gap-1.5">
                        <Button
                            type="reset"
                            variant="outline"
                        >
                            Reset
                            <ResetIcon className="ml-1.5 w-4 h-4" />
                        </Button>
                        <SubmitButton icon={ <ChevronRightIcon className="ml-1.5 w-4 h-4" /> }>
                            Create
                        </SubmitButton>
                    </CardFooter>
                </Card>
            </CreateWhimForm>

            <WhimTable customerId={ customer_id } />
        </main>
    );
};

export default Page;