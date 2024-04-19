import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../lib/database.types";
import { redirect } from "next/navigation";
import React from "react";

const withAuthenticated = (WrappedComponent: () => JSX.Element) => {
  const Auth = async (props: JSX.IntrinsicAttributes) => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/auth/login");
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuthenticated;
