import { compareAsc } from "date-fns";
import { number, object, string } from "zod";

export const checkPasswordSchema = object({
  shorted_url: string(),
  password: string(),
});

export const deleteWhimSchema = object({
  whimId: number().int().positive(),
  customerId: string().uuid(),
});

export const createAnonymousSchema = object({
  url: string().trim().url(),
});

export const createSchema = object({
  customer_id: string(),
  url: string().trim().url(),
  name: string().nullable(),
  expiration: string()
    .transform((data) => (data === "" ? null : data))
    .refine((data) => data === null || compareAsc(new Date(data), new Date()), {
      message: "invalid date",
    }),
  password: string()
    .nullable()
    .transform((data) => (data === "" ? null : data))
    .refine((data) => data === null || data.length > 5, {
      message: "invalid password",
    }),
});
