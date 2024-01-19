import { PrismaClient } from '@prisma/client';
import { createSecretKey, createShortedUrl } from "@/lib/utils";

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

export const checkCustomerExists = async ( { email }: {
  email: string
} ) => {
  return prisma.customer.findUnique( { where: { email }, select: { id: true } } );
};

export const createWhim = async ( { customerId, url, name, expiration, password }: {
  customerId: string;
  url: string;
  name: string | null;
  expiration: string | null;
  password: string | null;
} ) => {
  return prisma.url.create(
    {
      data: {
        name,
        url,
        shorted_url: createShortedUrl(),
        expiration,
        password,
        secret_key: password
                    ? createSecretKey()
                    : null,
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
        shorted_url: createShortedUrl()
      }
    }
  );
};

export const getWhim = async ( { shorted_url }: {
  shorted_url: string
} ) => {
  return prisma.url.findUnique(
    {
      where: { shorted_url },
      select: {
        url: true,
        expiration: true,
        secret_key: true
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

export const getWhimPassword = async ( { shorted_url }: {
  shorted_url: string;
} ) => {
  return prisma.url.findUnique(
    {
      where: { shorted_url },
      select: {
        password: true,
        url: true
      }
    }
  );
};
