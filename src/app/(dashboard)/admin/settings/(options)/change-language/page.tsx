import ChangeLanguage from "@/components/Settings/Options/ChangeLanguage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Language",
  description: "Change Language Page",
};

export default function changeLanguagePage() {
  return (
    <>
      <ChangeLanguage />
    </>
  );
}
