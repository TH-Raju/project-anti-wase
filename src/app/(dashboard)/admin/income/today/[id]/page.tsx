import DetailsToday from "@/components/Income/DetailsToday";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Today's Income",
  description: "Today's Income Page",
};

export default function DetailsTodayPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <DetailsToday id={params.id} />
    </>
  );
}
