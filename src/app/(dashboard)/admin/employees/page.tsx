import React from "react";
import type { Metadata } from "next";
import Employees from "@/components/Employees/Employees";

export const metadata: Metadata = {
  title: "Employees",
  description: "Employees",
};

export default function EmployeesPage() {
  return (
    <div>
      <Employees />
    </div>
  );
}
