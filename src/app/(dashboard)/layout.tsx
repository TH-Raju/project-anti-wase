"use client";

import { IDecodedInfo, getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Drawer, Layout, Menu, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { dashboardItems } from "@/constants/dashBoardItems";
import DashboardSidebar from "@/components/shared/DashBoard/DashboardSidebar";
import DashboardNavBar from "@/components/shared/DashBoard/DashboardNavbar";
import dynamic from "next/dynamic";
import { CloseOutlined } from "@ant-design/icons";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";

const { Content } = Layout;
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"], weight: ["400"] });
import { usePathname } from "next/navigation";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userInfo, userInfoLoading } = useGlobalContext();

  const pathname = usePathname();
  // console.log("🚀 ~ DashboardLayout ~ pathname:", pathname);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    if (!userInfo?.role && !userInfoLoading) {
      router.push(`/login?redirectLink=${pathname}`);
    }
    setIsLoading(false);
  }, [router, isLoading, userInfo?.role, userInfoLoading]);

  if (isLoading || userInfoLoading) {
    return (
      <LoadingForDataFetch/>
    );
  }
  // console.log("🚀 ~ DashboardLayout ~ userInfo:", userInfo)
  return (
    <Layout
      hasSider
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      className={open_sans.className}
    >
      {!screens.sm ? (
        <Drawer
          title={<h2 className="text-white">{userInfo?.role?.toUpperCase()}</h2>}
          placement="left"
          onClose={() => setCollapsed(false)}
          open={collapsed}
          closeIcon={<CloseOutlined style={{ color: "white" }} />}
          width={300}
          style={{
            background: "#D8D9D1",
            color: "white",
          }}
        >
          <Menu
            // theme="dark"
            // className="bg-white"
            style={{ backgroundColor: "#D8D9D1", color: "black" }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={dashboardItems(userInfo?.role as string, setCollapsed)}
          />
        </Drawer>
      ) : (
        <div className="">
          <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      )}

      <Layout style={{ overflow: "hidden" }}>
        <DashboardNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            padding: "2.5em",
            minHeight: "100vh",
            overflowY: "initial",
            // textAlign: "center",p
          }}
          className={open_sans.className}
        >
          {children}
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
