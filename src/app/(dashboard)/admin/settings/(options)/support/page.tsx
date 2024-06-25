import Support from "@/components/Settings/Options/Support";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Support",
  description: "Support Page",
};

export default function supportPage() {
  return (
    <>
      <Support />
    </>
  );
}
