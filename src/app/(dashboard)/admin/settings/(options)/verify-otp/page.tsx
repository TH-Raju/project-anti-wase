import VerifyOTP from "@/components/Settings/Options/VerifyOTP";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Verify OTP",
  description: "Verify OTP Page",
};

export default function VerifyOTPPage() {
  return (
    <>
      <VerifyOTP />
    </>
  );
}
