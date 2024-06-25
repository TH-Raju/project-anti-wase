import TodayIncome from "@/components/Income/Today";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Today's Income Details",
  description: "Today's Income Details Page",
};

export default function TodayIncomePage() {
  return <TodayIncome />;
}
