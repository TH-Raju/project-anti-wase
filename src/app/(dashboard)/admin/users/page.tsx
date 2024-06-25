import Users from "@/components/Users/Users";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Users",
  description: "Users",
};

export default function UsersPage() {
  return (
    <div>
      <Users />
    </div>
  );
}
