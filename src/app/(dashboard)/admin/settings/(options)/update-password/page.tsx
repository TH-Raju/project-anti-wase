import UpdatePassword from "@/components/Settings/Options/UpdatePassword";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Update Password",
  description: "Update password page",
};

export default function updatePasswordPage() {
  return (
    <>
      <UpdatePassword />
    </>
  );
}
