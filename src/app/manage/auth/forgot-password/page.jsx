import ForgotPasswordForm from "./components/ForgotPasswordForm";
import forgotPasswordAction from "@/app/actions/forgotPassword";
import getSecurityQuestionAction from "@/app/actions/getSecurityQuestion";

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordForm
      formAction={forgotPasswordAction}
      getQuestionAction={getSecurityQuestionAction}
    />
  );
};

export default ForgotPasswordPage;
