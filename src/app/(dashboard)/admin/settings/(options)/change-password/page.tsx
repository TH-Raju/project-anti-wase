import ChangePassword from "@/components/Settings/Options/ChangePassword";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Password",
  description: "Change Password Page",
};

export default function ChangePasswordPage() {
  return (
    <>
      <ChangePassword />
    </>
  );
}
