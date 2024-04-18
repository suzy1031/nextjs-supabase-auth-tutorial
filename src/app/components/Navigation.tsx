/**
 * 親Componentが非同期Server Componentであり､ServerSideでsessionを取得しているため
 * propsでsessionを受け取る
 */
"use client";

import Image from "next/image";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import useStore, { ProfileType } from "../../../store";
import { useEffect } from "react";
/**
 * ログイン･サインインの処理はClientSideで実行する
 *  -> 入力フォームのインタラクションで､local stateを使うため
 * Session発行後は､サーバーサイドで､HTMLを返却するようになるため､
 * Sessionは､サーバーサイドで検証するようになる
 * サーバーサイドで検証するためには､コンポーネントをServerSideComponentにする必要がある
 */
const Navigation = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  useEffect(() => {
    setUser({
      id: session ? session.user.id : "",
      email: session ? session.user.email! : "",
      name: session && profile ? profile.name : "",
      introduce: session && profile ? profile.introduce : "",
      avatar_url: session && profile ? profile.avatar_url : "",
    });
  }, [session, setUser, profile]);
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          FullStackChannel
        </Link>

        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div className="relative w-10 h-10">
                  <Image
                    src={
                      profile && profile.avatar_url
                        ? profile.avatar_url
                        : "/default.png"
                    }
                    className="rounded-full object-cover"
                    alt="avatar"
                    fill
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">ログイン</Link>
              <Link href="/auth/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navigation;
