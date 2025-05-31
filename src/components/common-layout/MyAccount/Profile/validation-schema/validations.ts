import { z } from "zod";

const buyerValidationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty({ message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email is required" }),
  phone: z.string({ required_error: "Phone is required" }).optional(),
});

const shippingValidationSchema = z.object({
  countryId: z
    .string({ required_error: "Country is required" })
    .nonempty({ message: "Country is required" }),
  state: z
    .string({ required_error: "State is required" })
    .nonempty({ message: "State is required" }),
  city: z
    .string({ required_error: "City is required" })
    .nonempty({ message: "City is required" }),
  address_line: z
    .string({ required_error: "Address line is required" })
    .nonempty({ message: "Address line is required" }),
});

export const profileValidationSchema = z.object({
  buyer: buyerValidationSchema,
  shipping_info: shippingValidationSchema.optional(),
});
