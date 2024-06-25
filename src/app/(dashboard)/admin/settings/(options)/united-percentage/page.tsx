import UnitedPercentage from "@/components/Settings/Options/UnitedPercentage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "United Percentage",
  description: "United Percentage Page",
};

export default function unitedPercentagePage() {
  return (
    <>
      <UnitedPercentage />
    </>
  );
}
