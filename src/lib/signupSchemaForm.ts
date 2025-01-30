import { z } from "zod";

export const signupSchemaForm = z.object({
  username: z
    .string()
    .min(2, { message: "Must be at least 2 character long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 character long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
    .regex(/[0-9]/, { message: "Be at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character",
    }),
});

export type FormSate =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | undefined;
