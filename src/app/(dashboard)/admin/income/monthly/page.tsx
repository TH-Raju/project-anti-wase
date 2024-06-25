import MonthlyIncome from "@/components/Income/Monthly";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Monthly Income Details",
  description: "Monthly Income Details Page",
};

export default function MonthlyIncomePage() {
  return <MonthlyIncome />;
}
