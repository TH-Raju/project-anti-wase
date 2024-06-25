import LoginActivity from "@/components/Settings/Options/LoginActivity";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login Activity",
  description: "Login activity history",
};

export default function loginActivity() {
  return (
    <>
      <LoginActivity />
    </>
  );
}
