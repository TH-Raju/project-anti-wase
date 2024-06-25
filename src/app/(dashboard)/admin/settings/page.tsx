import React from "react";
import type { Metadata } from "next";
import Settings from "@/components/Settings/Settings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings",
};

export default function SettingsPage() {
  return (
    <>
      <Settings />
    </>
  );
}
