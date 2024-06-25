import WeeklyIncome from "@/components/Income/Weekly";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Weekly Income Details",
  description: "Weekly Income Details Page",
};

export default function WeeklyIncomePage() {
  return <WeeklyIncome />;
}
