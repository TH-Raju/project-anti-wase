import AboutUs from "@/components/Settings/Options/AboutUs";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Us",
  description: "about us page",
};

export default function aboutUs() {
  return (
    <>
      <AboutUs />
    </>
  );
}
