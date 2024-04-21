"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../loading";
import Link from "next/link";
import { login } from "../../../lib/api/client";
import { LoginSchema, resolver } from "../../../lib/schema";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver,
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);
    try {
      const error = await login(data.email, data.password);

      if (error) {
        setMessage("エラーが発生しました" + error.message);
        return;
      }

      router.push("/");
    } catch (error) {
      setMessage("エラーが発生しました" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">ログイン</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* メールアドレス */}
        <div className="mb-3">
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

        {/* パスワード */}
        <div className="mb-5">
          <input
            type="password"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="パスワード"
            id="password"
            {...register("password", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.password?.message}
          </div>
        </div>

        {/* ログインボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              ログイン
            </button>
          )}
        </div>
      </form>

      {message && (
        <div className="my-5 text-center text-sm text-red-500">{message}</div>
      )}

      <div className="text-center text-sm mb-5">
        <Link href="/auth/reset-password" className="text-gray-500 font-bold">
          パスワードを忘れた方はこちら
        </Link>
      </div>
      <div className="text-center text-sm">
        <Link href="/auth/signup" className="text-gray-500 font-bold">
          アカウントを作成する
        </Link>
      </div>
    </div>
  );
};
export default Login;
