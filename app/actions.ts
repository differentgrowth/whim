"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

import { compare, hash } from "bcrypt";
import { z, ZodError } from "zod";

import { signIn, signOut } from "@/auth";
import { AnonymousState, type State } from "@/definitions/actions";
import {
  checkCustomerExists,
  createAnonymousWhim,
  createWhim,
  deleteWhim,
  getWhimPassword,
} from "@/lib/db";

import {
  checkPasswordSchema,
  createAnonymousSchema,
  createSchema,
  deleteWhimSchema,
} from "@/lib/zod";

export const authenticate = async (
  _prevState: State | undefined,
  formData: FormData,
) => {
  try {
    const { email, password, type } = Object.fromEntries(
      formData.entries(),
    ) as {
      email: string;
      password: string;
      type: "login" | "signup";
    };
    if (type === "login") {
      const data = await checkCustomerExists({ email });
      if (!data) {
        return {
          type: "warning" as const,
          message: "This user doesn't exist",
        };
      }
    }

    await signIn("credentials", { email, password, redirect: false });
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return {
        type: "error" as const,
        message: "Invalid Credentials",
      };
    }
    throw error;
  }

  redirect(`/login`, RedirectType.replace);
};

export const signout = async () => {
  try {
    await signOut({ redirect: false });
  } catch (e) {
    console.log(e);
  }
  redirect(`/`, RedirectType.replace);
};

export const create = async (
  _prevState: State | undefined,
  formData: FormData,
) => {
  let c_id: string | null = null;

  try {
    const { password, customer_id, url, name, expiration } =
      await createSchema.parseAsync(
        Object.fromEntries(formData.entries()) as unknown as z.infer<
          typeof createSchema
        >,
      );
    const encryptPassword = password ? await hash(password, 6) : null;
    c_id = customer_id;

    await createWhim({
      customerId: customer_id,
      url: url,
      name: name,
      expiration: expiration,
      password: encryptPassword,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = Object.keys(error.flatten().fieldErrors);
      if (errors.includes("url")) {
        return {
          type: "error" as const,
          message: "Invalid URL!",
        };
      }
      if (errors.includes("expiration")) {
        return {
          type: "warning" as const,
          message: "Invalid date!",
        };
      }
      if (errors.includes("password")) {
        return {
          type: "warning" as const,
          message: "Invalid password! The minimum length is 6 characters.",
        };
      }
      return {
        type: "warning" as const,
        message: "Invalid data!",
      };
    }

    return {
      type: "error" as const,
      message: "Oops! Something went wrong.",
    };
  }

  revalidatePath(`/dashboard/${c_id}`, "page");
  return {
    type: "success" as const,
    message: "Whim created successfully",
  };
};

export const createAnonymous = async (
  _prevState: AnonymousState | undefined,
  formData: FormData,
) => {
  try {
    const { url } = await createAnonymousSchema.parseAsync(
      Object.fromEntries(formData.entries()) as z.infer<
        typeof createAnonymousSchema
      >,
    );
    const { shorted_url } = await createAnonymousWhim({ url });

    return {
      type: "success" as const,
      message: "Whim created successfully",
      shorted_url,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        type: "warning" as const,
        message: "Invalid url!",
        shorted_url: null,
      };
    }

    return {
      type: "error" as const,
      message: "Oops! Something went wrong.",
      shorted_url: null,
    };
  }
};

export const deleteWhimAction = async (
  _prevState: State | undefined,
  formData: FormData,
) => {
  let c_id: string | null = null;

  try {
    const data = { ...Object.fromEntries(formData.entries()) };
    const { whimId, customerId } = await deleteWhimSchema.parseAsync({
      ...data,
      whimId: +data.whimId,
    } as unknown as z.infer<typeof deleteWhimSchema>);

    if (!customerId) {
      return {
        type: "error" as const,
        message: "Invalid data!",
      };
    }

    c_id = customerId;

    await deleteWhim({ whimId, customerId });
  } catch (e) {
    return {
      type: "error" as const,
      message: "Something went wrong!",
    };
  }

  revalidatePath(`/dashboard/${c_id}`);
  return {
    type: "success" as const,
    message: "Whim deleted successfully",
  };
};

export const checkProtectedWhim = async (
  _prevState: State | undefined,
  formData: FormData,
) => {
  let url = null;

  try {
    const { shorted_url, password } = await checkPasswordSchema.parseAsync(
      Object.fromEntries(formData.entries()) as z.infer<
        typeof checkPasswordSchema
      >,
    );
    const whim = await getWhimPassword({ shorted_url });

    if (!whim || !whim?.password || !whim.url) {
      return {
        type: "error" as const,
        message: "Invalid whim!",
      };
    }

    url = whim.url;
    const passwordsMatch = await compare(password, whim.password);
    if (!passwordsMatch) {
      return {
        type: "error" as const,
        message: "Invalid password!",
      };
    }
  } catch (error) {
    return {
      type: "error" as const,
      message: "Invalid data!",
    };
  }

  redirect(url, RedirectType.replace);
};
