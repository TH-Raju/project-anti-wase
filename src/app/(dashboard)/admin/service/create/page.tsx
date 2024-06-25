import ServiceCreate from '@/components/service/createService'
import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceCreate",
  description: "ServiceCreate",
};
export default function CreateServicePage() {
  return (
    <>
      <ServiceCreate />
    </>
  )
}
