import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/app/components/login";
import { serverSide } from "../../../../lib/api/client";

const LoginPage = async () => {
  const session = (await serverSide(cookies)).getSession();

  if (session) {
    redirect("/");
  }

  return <Login />;
};
export default LoginPage;
