import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CopyWhim } from '@/components/copy-whim';
import { DeleteWhim } from '@/components/delete-whim';
import { getCustomerWhims } from '@/lib/db';
import { cn } from '@/lib/utils';

type Props = {
  customerId: string;
}

const getData = async ( { customerId }: { customerId: string } ) => {
  const whims = await getCustomerWhims( { customer_id: customerId } );

  return {
    whims
  };
};

export const WhimTable = async ( { customerId }: Props ) => {
  const { whims } = await getData( { customerId } );

  return (
    <Table
      className={ cn(
        'container max-w-7xl mt-10'
      ) }
    >
      <TableCaption>My Whims</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-right border-r">Actions</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Whim URL</TableHead>
          <TableHead className="w-max">URL</TableHead>
          <TableHead className="text-right">Counter</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { whims.map( whim => (
          <TableRow key={ whim.id }>
            <TableCell
              className={ cn(
                'border-r',
                'flex flex-row flex-wrap justify-end items-center gap-1'
              ) }
            >
              <DeleteWhim
                whimId={ whim.id }
                customerId={ customerId }
              />
              <CopyWhim whimUrl={ whim.shorted_url } />
            </TableCell>
            <TableCell className="font-medium">{ whim.name }</TableCell>
            <TableCell>{ whim.shorted_url }</TableCell>
            <TableCell className="truncate w-max">{ whim.url }</TableCell>
            <TableCell className="text-right">{ whim.counter }</TableCell>
            <TableCell className="text-right">{ whim.created_at.toLocaleString() }</TableCell>
          </TableRow>
        ) ) }
      </TableBody>
    </Table>
  );
};