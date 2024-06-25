import SignIn from "@/components/signIn/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In page",
};

export default function SignInPage() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
