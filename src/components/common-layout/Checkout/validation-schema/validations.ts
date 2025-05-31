import { z } from "zod";

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
  contact_no: z
    .string({ required_error: "Contact number is required" })
    .optional(),
});

export const orderValidationSchema = z.object({
  buyer_name: z
    .string({ required_error: "Name is required" })
    .nonempty({ message: "Name is required" }),
  buyer_email: z
    .string({ required_error: "Email is required" })
    .nonempty({ message: "Email is required" }),
  buyer_phone: z.string({ required_error: "Phone is required" }),
  shipping_info: shippingValidationSchema,
});
