import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Signup from "@/app/components/singup";
import { serverSide } from "../../../../lib/api/client";

// サインアップページ
const SignupPage = async () => {
  // セッションの取得
  const session = (await serverSide(cookies)).getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  return <Signup />;
};

export default SignupPage;
