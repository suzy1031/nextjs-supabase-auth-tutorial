import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません｡" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります｡" }),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります｡" }),
    confirmation: z
      .string()
      .min(6, { message: "6文字以上入力する必要があります。" }),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "新しいパスワードと確認用パスワードが一致しません。",
    path: ["confirmation"], // エラーメッセージが適用されるフィールド
  });

export const emailSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません｡" }),
});

export const singupSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません｡" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります｡" }),
});

export const profileSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  introduce: z.string().min(0),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;
export type SignUpSchema = z.infer<typeof singupSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
