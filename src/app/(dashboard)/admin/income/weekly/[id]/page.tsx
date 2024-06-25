import DetailsWeekly from "@/components/Income/DetailsWeekly";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Weekly Income",
  description: "Weekly Income Page",
};

export default function DetailsWeeklyPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <DetailsWeekly id={params.id} />
    </>
  );
}
