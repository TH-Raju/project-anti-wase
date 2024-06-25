import React from "react";
import Kyc from "@/components/Kyc/Kyc";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kyc",
  description: "Kyc",
};

export default function KycPage() {
  return <Kyc />;
}
