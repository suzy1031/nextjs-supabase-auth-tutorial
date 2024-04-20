import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { serverSide } from "../lib/api/client";

const withAuthenticated = (WrappedComponent: () => JSX.Element) => {
  const Auth = async (props: JSX.IntrinsicAttributes) => {
    const session = (await serverSide(cookies)).getSession();

    if (!session) {
      redirect("/auth/login");
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuthenticated;
