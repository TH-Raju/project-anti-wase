import SingleUserDetails from "@/components/Users/SingleUserDetails";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "User Details",
  description: "User Details Page",
};

export default function userDetails({
  params,
}: {
  params: { userID: string };
}) {
  return (
    <>
      <SingleUserDetails userId={params.userID} />{" "}
    </>
  );
}
