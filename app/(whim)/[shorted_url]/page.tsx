import { notFound, permanentRedirect } from 'next/navigation';

import { getWhim, increaseWhimCounter } from '@/lib/db';
import { compareAsc } from "date-fns";

type PageProps = {
  params: {
    shorted_url: string;
  };
  searchParams: {};
}

const getData = async ( shorted_url: string ) => {
  try {
    const data = getWhim( { shorted_url } );
    const increase = increaseWhimCounter( { shorted_url } );

    const [ redirect ] = await Promise.all( [
                                              data,
                                              increase
                                            ] );

    return { ...redirect };
  } catch ( e ) {
    return {
      url: null,
      expiration: null
    };
  }
};

const Page = async ( { params: { shorted_url } }: PageProps ) => {
  const { url, expiration } = await getData( shorted_url );

  if ( !url ) {
    notFound();
  }

  if ( expiration && compareAsc( expiration, new Date() ) < 1 ) {
    permanentRedirect( '/expired' );
  }

  permanentRedirect( url );

  return null;
};

export default Page;