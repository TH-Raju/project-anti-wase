import ForgotPassword from "@/components/Settings/Options/ForgotPassword";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password Page",
};

export default function ForgotPasswordPage2() {
  return (
    <>
      <ForgotPassword />
    </>
  );
}
