import { compareAsc, format } from "date-fns";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CopyWhim } from '@/components/copy-whim';
import { DeleteWhim } from '@/components/delete-whim';
import { getCustomerWhims } from '@/lib/db';
import { cn } from '@/lib/utils';

type Props = {
  customerId: string;
}

const getData = async ( { customerId }: {
  customerId: string
} ) => {
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
          <TableHead className="w-24">Whim URL</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-max">URL</TableHead>
          <TableHead className="w-24 text-right">Counter</TableHead>
          <TableHead className="w-52 text-right">Created At</TableHead>
          <TableHead className="w-52 text-right">Expiration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { whims.map( whim => (
          <TableRow key={ whim.id }>
            <TableCell
              className={ cn(
                'border-r',
                'flex flex-row items-center space-x-1.5'
              ) }
            >
              <DeleteWhim
                whimId={ whim.id }
                customerId={ customerId }
              />
              <CopyWhim
                size="icon"
                whimUrl={ whim.shorted_url }
              />
            </TableCell>
            <TableCell className="w-24">{ whim.shorted_url }</TableCell>
            <TableCell className="font-medium">{ whim.name }</TableCell>
            <TableCell className="truncate w-max">{ whim.url }</TableCell>
            <TableCell className="text-right w-24">{ whim.counter }</TableCell>
            <TableCell className="text-right w-52">{ format( whim.created_at, "LLL dd, y" ) }</TableCell>
            <TableCell
              className={ cn(
                "text-right w-52",
                ( whim.expiration && compareAsc( whim.expiration, new Date() ) < 0 )
                && 'line-through'
              ) }
            >
              { whim.expiration
                ? format( whim.expiration, "LLL dd, y" )
                : '' }
            </TableCell>
          </TableRow>
        ) ) }
      </TableBody>
    </Table>
  );
};