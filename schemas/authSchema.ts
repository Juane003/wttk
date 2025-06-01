import { z } from "zod";

const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type AuthFormSchema = z.infer<typeof authSchema>;

export { AuthFormSchema, authSchema };
