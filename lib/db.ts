import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCustomer = async ( { email, password }: {
  email: string;
  password: string;
} ) => {
  return prisma.customer.create(
    {
      data: {
        email,
        password
      }
    }
  );
};

export const getCustomer = async ( { email }: {
  email: string
} ) => {
  return prisma.customer.findUnique( { where: { email } } );
};

export const createWhim = async ( { customerId, url, name, expiration }: {
  customerId: string;
  url: string;
  name: string | null;
  expiration: string | null;
} ) => {
  return prisma.url.create(
    {
      data: {
        name,
        url,
        shorted_url: Math.random()
                         .toString( 36 )
                         .slice( 2, 8 ),
        expiration,
        Customer: {
          connect: {
            id: customerId
          }
        }
      }
    }
  );
};

export const createAnonymousWhim = async ( { url }: {
  url: string;
} ) => {
  return prisma.url.create(
    {
      data: {
        url,
        shorted_url: Math.random()
                         .toString( 36 )
                         .slice( 2, 8 )
      }
    }
  );
};

export const getWhim = async ( { shorted_url }: {
  shorted_url: string
} ) => {
  return prisma.url.findFirst(
    {
      where: { shorted_url },
      select: {
        url: true,
        expiration: true
      }
    }
  );
};

export const getCustomerWhims = async ( { customer_id }: {
  customer_id: string
} ) => {
  return prisma.url.findMany(
    {
      where: { customer_id },
      orderBy: [
        { expiration: 'desc' },
        { created_at: 'desc' }
      ]
    }
  );
};

export const deleteWhim = async ( { whimId, customerId }: {
  whimId: number;
  customerId: string;
} ) => {
  return prisma.url.delete(
    {
      where: {
        id: whimId,
        customer_id: customerId
      }
    }
  );
};

export const increaseWhimCounter = async ( { shorted_url }: {
  shorted_url: string
} ) => {
  return prisma.url.update(
    {
      where: { shorted_url },
      data: { counter: { increment: 1 } }
    }
  );
};