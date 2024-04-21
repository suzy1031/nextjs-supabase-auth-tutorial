import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
    introduce: z.string().min(0),
    email: z.string().email({ message: "メールアドレスの形式ではありません｡" }),
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

type Schema = z.infer<typeof schema>;

export type LoginSchema = Pick<Schema, "email" | "password">;
export type ProfileSchema = Pick<Schema, "name" | "introduce">;
export type EmailSchema = Pick<Schema, "email">;
export type SingUpSchema = Pick<Schema, "name" | "email" | "password">;
export type PasswordSchema = Pick<Schema, "password" | "confirmation">;

export const resolver = zodResolver(schema);
