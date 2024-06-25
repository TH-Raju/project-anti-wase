import React, { useState } from "react";
import { Layout, Menu } from "antd";

import Link from "next/link";
import { dashboardItems } from "@/constants/dashBoardItems";
import { USER_ROLE } from "@/constants/role";

import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../Logo";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";

const { Sider } = Layout;

const DashboardSidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const { userInfo ,userInfoLoading} = useGlobalContext();
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  if(userInfoLoading){
    return
  }
  return (
    <Sider
      // collapsible
      
      className="bg-primary"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      style={{
        overflow: "auto",
        height: "110vh",
        position: "sticky",
        // position: "fixed",
        overflowY: "auto",
        zIndex: 40,
        left: 0,
        top: 0,
        bottom: 0,
        width: "250px",
        backgroundColor: "#D8D9D1",
        color: "black",
      }}
    >
      <Logo />

      <Menu
        // theme="light"

        defaultSelectedKeys={["1"]}
        style={{
          overflowY: "auto",
          // background: "#1D2327",
          // color: "white",
          fontWeight: "500",
          marginTop: "10px",
          fontSize: "16px",
          paddingInline: "3px",
          backgroundColor: "#D8D9D1",
          color: "black",
          // width: "250px",
          // ...clipPathStyle,
        }}
        mode="inline"
        // theme="dark"
        items={dashboardItems(userInfo?.role as string,)}
        onSelect={handleMenuSelect}
        // inlineCollapsed={collapsed}
        
      />
    </Sider>
  );
};

export default DashboardSidebar;
