import DetailsMonthly from "@/components/Income/DetailsMonthly";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Monthly Income Details",
  description: "Monthly Income Details Page",
};

export default function DetailsMonthlyPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <DetailsMonthly id={params.id} />
    </>
  );
}
