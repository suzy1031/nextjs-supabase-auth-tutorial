import { cookies } from "next/headers";
import Navigation from "./Navigation";
import {
  getCurrentProfile,
  getSession,
  getUpdatedProfile,
} from "../../../lib/api/server";

const SupabaseListener = async () => {
  const session = await getSession();

  let profile = null;
  if (session) {
    const currentProfile = await getCurrentProfile();

    profile = currentProfile;

    if (currentProfile && currentProfile.email !== session.user.email) {
      const updatedProfile = await getUpdatedProfile();

      profile = updatedProfile;
    }
  }

  return <Navigation session={session} profile={profile} />;
};
export default SupabaseListener;
