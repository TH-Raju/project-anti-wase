import Profile from "@/components/dashboard/profile/Profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

export default function ProfilePage() {
  return (
    <>
      <Profile />
    </>
  );
}
