import TermsOfService from "@/components/Settings/Options/TermsOfService";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service page",
};

export default function termsOfServicePage() {
  return (
    <>
      <TermsOfService />
    </>
  );
}
