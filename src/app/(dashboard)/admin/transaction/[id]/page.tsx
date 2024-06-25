import DetailTransaction from "@/components/Transaction/DetailTransaction";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Transaction Details",
  description: "Transaction Details Page",
};

export default function detailTransaction({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <DetailTransaction id={params.id} />
    </>
  );
}
