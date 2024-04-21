import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "@/app/components/login";
import { getSession } from "../../../../lib/api/server";

const LoginPage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <Login />;
};
export default LoginPage;
