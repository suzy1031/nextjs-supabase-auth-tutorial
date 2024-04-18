import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../lib/database.types";
import { redirect } from "next/navigation";
import Profile from "@/app/components/profile";

const ProfilePage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <Profile />;
};
export default ProfilePage;
