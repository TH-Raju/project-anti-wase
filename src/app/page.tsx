"use client";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
import Footer from "@/components/Home/Footer";
import GlobalLoading from "@/components/Loader/GlobalLoading";
import HomeHeader from "@/components/shared/Headers/HomeHeader";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const { userInfo, userInfoLoading } = useGlobalContext();
  // console.log("🚀 ~ userInfo:", userInfo);
  //!----------- if user already login then auto redirect--------
  useEffect(() => {
    router.push("/dashboard");
    return () => {};
  }, []);

  return (
    <div className="">
      <main className="bg-[#A2B0F321 pb-10 min-h-screen">
        <GlobalLoading />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
