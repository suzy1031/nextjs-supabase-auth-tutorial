import Logout from "@/app/settings/logout/_components/logout";
import withAuthenticated from "../../../../HOC";

// ログアウトページ
const LogoutPage = () => <Logout />;
export default withAuthenticated(LogoutPage);
