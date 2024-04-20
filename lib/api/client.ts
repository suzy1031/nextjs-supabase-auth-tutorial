import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { v4 as uuidv4 } from "uuid";

const supabase = createClientComponentClient<Database>();

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

export const sendEmail = async (email: string) => {
  const { error } = await supabase.auth.updateUser(
    {
      email: email,
    },
    { emailRedirectTo: `${location.origin}/auth/login` } // メール本文に記載するURL(supabaseが提供するマネージドサービス)
  );
  return error;
};

export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  return error;
};

export const uploadAvatar = async (avatar: File) => {
  const { data, error } = await supabase.storage
    .from("profile")
    .upload(`${uuidv4()}`, avatar);
  return { data, error };
};

export const removeAvatar = async (
  userId: string,
  fileName: string
): Promise<void> => {
  await supabase.storage.from("profile").remove([`${userId}/${fileName}`]);
};

export const getAvatarUrl = async (path: string) => {
  const { data } = await supabase.storage.from("profile").getPublicUrl(path);
  return data;
};

export const updateProfile = async (
  name: string,
  introduce: string,
  avatarUrl: string | null,
  userId: string
) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      name: name,
      introduce: introduce,
      avatar_url: avatarUrl,
    })
    .eq("id", userId);
  return error;
};

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return error;
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/auth/reset-password/confirm`,
  });
  return error;
};

export const signup = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });
  return error;
};

export const updateName = async (name: string, email: string) => {
  const { error } = await supabase
    .from("profiles")
    .update({ name: name })
    .eq("email", email);
  return error;
};
