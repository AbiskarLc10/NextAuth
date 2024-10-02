import  z from "zod"


export const verifyCodeSchema = z.object({

    verifyCode: z.string().length(6,"Code must be of 6 digits").regex(/^[\d]{6}$/,"Invalid Code")
})