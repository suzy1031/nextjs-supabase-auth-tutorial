import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPassword from "@/app/components/reset-password";
import { serverSide } from "../../../../lib/api/client";
// パスワードリセットページ
const ResetPasswordPage = async () => {
  // セッションの取得
  const session = (await serverSide(cookies)).getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  return <ResetPassword />;
};

export default ResetPasswordPage;
