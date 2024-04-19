import Email from "@/app/settings/email/_components/email";
import withAuthenticated from "../../../../HOC";

const EmailPage = () => <Email />;
export default withAuthenticated(EmailPage);
