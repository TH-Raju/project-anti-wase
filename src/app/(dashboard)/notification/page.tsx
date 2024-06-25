import Notification from "@/components/dashboard/notification/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Notifications",
};

export default function NotificationPage() {
  return (
    <>
      <Notification />
    </>
  );
}
