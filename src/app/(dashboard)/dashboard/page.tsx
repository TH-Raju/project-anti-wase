"use client";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import AdminDashboardMain from "@/components/dashboard/admin/AdminDashboardMain";

import React from "react";

const DashboardPage = () => {
  const { userInfo, userInfoLoading } = useGlobalContext();
  if (userInfoLoading) {
    return <LoadingForDataFetch />;
  }
  if (userInfo?.role == "admin") {
    return <AdminDashboardMain />;
  }
};

export default DashboardPage;
