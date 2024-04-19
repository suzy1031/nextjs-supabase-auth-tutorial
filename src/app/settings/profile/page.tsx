import Profile from "@/app/settings/profile/_components/profile";
import withAuthenticated from "../../../../HOC";

const ProfilePage = () => <Profile />;
export default withAuthenticated(ProfilePage);
