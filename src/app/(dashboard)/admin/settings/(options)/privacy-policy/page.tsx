import PrivacyPolicy from "@/components/Settings/Options/PrivacyPolicy";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy Page",
};

export default function privacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
    </>
  );
}
