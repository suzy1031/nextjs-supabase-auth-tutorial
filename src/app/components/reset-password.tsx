"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../loading";
import { resetPassword } from "../../../lib/api/client";
import { EmailSchema, emailSchema } from "../../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "" },
    // 入力値の検証
    resolver: zodResolver(emailSchema),
  });

  const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const error = await resetPassword(data.email);

      if (error) {
        setMessage("エラーが発生しました" + error.message);
        return;
      }

      setMessage("確認用のURLを記載したメールを送信しました｡");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">
        パスワードを忘れた場合
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">メールアドレス</div>
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="メールアドレス"
            id="email"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.email?.message}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              送信
            </button>
          )}
        </div>
      </form>
      {message && (
        <div className="my-5 text-center text-sm text-red-500">{message}</div>
      )}
    </div>
  );
};
export default ResetPassword;
