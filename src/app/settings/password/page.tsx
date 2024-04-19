import Password from "@/app/components/password";
import withAuthenticated from "../../../../HOC";

// パスワード変更ページ
const PasswordPage = () => <Password />;
export default withAuthenticated(PasswordPage);
