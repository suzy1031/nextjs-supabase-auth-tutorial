"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "@/app/loading";
import useStore from "../../../../../store";
import { sendEmail, signOut } from "../../../../../lib/api/client";
import { EmailSchema, emailSchema } from "../../../../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Email = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const store = useStore();

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
      const updateUserError = await sendEmail(data.email);

      if (updateUserError) {
        setMessage("エラーが発生しました" + updateUserError.message);
        return;
      }

      setMessage("確認用のURLを記載したメールを送信しました｡");

      const signOutError = await signOut();

      if (signOutError) {
        setMessage("エラーが発生しました" + signOutError.message);
        return;
      }

      router.push("/auth/login");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">
        メールアドレス変更
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 現在のメールアドレス */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">現在のメールアドレス</div>
          <div>{store.user.email}</div>
        </div>

        {/* 新しいメールアドレス */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">新しいメールアドレス</div>
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="新しいメールアドレス"
            id="email"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.email?.message}
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
      </form>

      {message && (
        <div className="my-5 text-center text-sm text-red-500">{message}</div>
      )}
    </div>
  );
};
export default Email;
