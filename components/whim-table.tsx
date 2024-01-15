import { compareAsc, format } from "date-fns";

import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  try {
    const whims = await getCustomerWhims( { customer_id: customerId } );

    return {
      whims
    };
  } catch ( e ) {
    return {
      whims: []
    };
  }
};

export const WhimTable = async ( { customerId }: Props ) => {
  const { whims } = await getData( { customerId } );

  return (
    <Table
      className={ cn(
        'container mt-10 max-w-7xl'
      ) }
    >
      <TableCaption>My Whims</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] border-r text-right">Actions</TableHead>
          <TableHead className="min-w-24 max-w-24">Whim</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-max">URL</TableHead>
          <TableHead className="min-w-32 max-w-32 text-right">Counter</TableHead>
          <TableHead className="min-w-32 max-w-32 text-right">Created</TableHead>
          <TableHead className="min-w-32 max-w-32 text-right">Expiration</TableHead>
          <TableHead className="w-6" />
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
                secretKey={ whim.secret_key }
              />
            </TableCell>

            <TableCell className="min-w-24 max-w-24">{ whim.shorted_url }</TableCell>
            <TableCell className="font-medium">{ whim.name }</TableCell>
            <TableCell className="w-max truncate">{ whim.url }</TableCell>
            <TableCell className="min-w-32 max-w-32 text-right">{ whim.counter }</TableCell>
            <TableCell className="min-w-32 max-w-32 text-right">{ format( whim.created_at, "LLL dd, y" ) }</TableCell>
            <TableCell
              className={ cn(
                "w-52 text-right",
                ( whim.expiration && compareAsc( whim.expiration, new Date() ) < 0 )
                && 'line-through'
              ) }
            >
              { whim.expiration
                ? format( whim.expiration, "LLL dd, y" )
                : '' }
            </TableCell>

            <TableCell className="w-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    { whim.password
                      ? <LockClosedIcon className="size-4" />
                      : <LockOpen2Icon className="size-4" /> }
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      { whim.password
                        ? 'Protected'
                        : 'Public' }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ) ) }
      </TableBody>
    </Table>
  );
};