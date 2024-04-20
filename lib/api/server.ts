"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const getCurrentProfile = async () => {
  const session = await getSession();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id ?? "")
    .single();
  return data;
};

export const getUpdatedProfile = async () => {
  const session = await getSession();

  const { data } = await supabase
    .from("profiles")
    .update({ email: session?.user.email ?? "" })
    .match({ id: session?.user.id ?? "" })
    .select("*")
    .single();
  return data;
};
