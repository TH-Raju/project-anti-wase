import SingleEmployeeDetails from "@/components/Employees/SingleEmployeeDetails";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Employee Details",
  description: "Employee Details Page",
};

export default function employeeDetails({
  params,
}: {
  params: { employeeID: string };
}) {
  return (
    <>
      <SingleEmployeeDetails employeeId={params.employeeID} />{" "}
    </>
  );
}
