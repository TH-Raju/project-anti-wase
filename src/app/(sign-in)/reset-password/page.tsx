import ResetPassword from "@/components/signIn/ResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password page",
};

export default function ResetPasswordPage() {
  return (
    <div>
      <ResetPassword />
    </div>
  );
}
