import { notFound, permanentRedirect } from 'next/navigation';

import { getWhim, increaseWhimCounter } from '@/lib/db';

type PageProps = {
  params: {
    shorted_url: string;
  };
  searchParams: {};
}

const Page = async ( { params: { shorted_url } }: PageProps ) => {
  const data = getWhim( { shorted_url } );
  const increase = increaseWhimCounter( { shorted_url } );

  const [ redirect ] = await Promise.all( [
    data,
    increase
  ] );

  if ( !redirect?.url ) {
    notFound();
  }

  permanentRedirect( redirect.url );

  return null;
};

export default Page;