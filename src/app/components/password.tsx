"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "@/app/loading";
import { updatePassword } from "../../../lib/api/client";
import { PasswordSchema, passwordSchema } from "../../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Password = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: { password: "", confirmation: "" },
    // 入力値の検証
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<PasswordSchema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const error = await updatePassword(data.password);

      if (error) {
        setMessage("エラーが発生しました" + error.message);
        return;
      }

      reset();
      setMessage("パスワードを変更しました。");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">パスワード変更</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 新しいパスワード */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">新しいパスワード</div>
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="新しいパスワード"
            id="password"
            {...register("password", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.password?.message}
          </div>
        </div>

        {/* 確認用パスワード */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">確認用パスワード</div>
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="確認用パスワード"
            id="confirmation"
            {...register("confirmation", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.confirmation?.message}
          </div>
        </div>

        {/* 変更ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              変更
            </button>
          )}
        </div>

        {/* メッセージ */}
        {message && (
          <div className="text-center text-sm text-red-500">{message}</div>
        )}
      </form>
    </div>
  );
};
export default Password;
