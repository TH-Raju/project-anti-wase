import VerifyOtp from "@/components/signIn/VerifyOtp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "verify OTP",
  description: "Verify OTP page",
};
export default function VerifyOtpPage() {
  return (
    <div>
      <VerifyOtp />
    </div>
  );
}
