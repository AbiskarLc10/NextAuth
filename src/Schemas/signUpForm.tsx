import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters" })
    .regex(/^[a-zA-Z0-9]{3,}$/, {
      message: "Username must not contain special Character",
    }),
  email: z
    .string()
    .regex(/^[a-zA-Z]+(?:[a-zA-Z0-9]*[\W]*)*\@[a-zA-Z]{2,}\.[a-zA-Z]{2,4}$/, {
      message: "Please enter a Valid Email",
    }),
    password: z.string().min(5,{message:"Password must be at least 5 characters long"}).regex(/^(?=.*[A-Z])(?=.*[\W]).{5,}$/, { message: "Password must have at least 1 uppercase letter, 1 special character" }),
  phone: z
    .string()
    .length(10, { message: "Number must have 10 digits" })
    .regex(/(?=98|97[\d]).{10}/, { message: "Not a valid number" }),
});
