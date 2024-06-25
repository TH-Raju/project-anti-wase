"use client";
import { Button, Menu } from "antd";

import Logo from "../../Logo";
import React, { useEffect, useMemo, useState } from "react";
import SideBarHome from "./SideBarHome";
import { homeNavItems } from "@/constants/HomeNabItems";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
const NavbarPublic = () => {
  // const screens = useBreakpoint();
  const { userInfo, userInfoLoading } = useGlobalContext();

  const navItemsHome = homeNavItems(userInfo?.role ? userInfo.role : null);
  const pathname = usePathname();
  return (
    <div
      className={`w-full lg:w-[84%] mx-auto bg-transparent rounded-b-[50px]  backdrop-blur-xl  block md:flex lg:flex xl:flex items-center justify-between border-b border-slate-500 px-[2em] `}
    >
      <nav
        className="text-[#dedee0 text-black py-[8px md:pt-[0.9em  
    flex align-center justify-between gap-[5rem]"
      >
        <Logo />
        {/* {userInfo?.role &&
          <button onClick={() => dispatch(toggleCartModal(true))}>Your Cart <ShoppingCartOutlined /> </button>
        } */}
        <Menu
          mode="horizontal"
          className="hidden md:flex lg:flex xl:flex items-center"
          style={{
            // color:"#5371FF"
            fontWeight: "700",
            // fontSize: "15px",
            fontFamily: "roboto",
            // backdropBlur:"blur(8px)"
            // display:`${screens.sm ? "flex":"none"}`
            // background: `${pathname === '/contact' || pathname === '/analytics' ? "#C2C4CB" : "none"}  `,
            background: "none",
            backdropFilter: "blur(80px)",
            boxShadow: "none",
            color: `${pathname === "/" ? "white" : "black"}`,
            // fontWeight:"700"
          }}
          disabledOverflow
          items={navItemsHome}
          // items={() => userInfo?.role ? userInfo.role : null)}
          // items={() => homeNavItems(userInfo?.role ? userInfo.role : null)}
        />

        <div
          className="flex  md:hidden lg:hidden xl:hidden "
          // style={{
          //   display: `${screens.sm ? "none" : "flex"}`,
          // }}
        >
          <SideBarHome
            userInfo={userInfo}
            userInfoLoading={userInfoLoading}
          ></SideBarHome>
        </div>
      </nav>

      <div className="hidden md:flex lg:flex xl:flex gap-2 items-center ">
        <div className="flex justify-between items-center gap-1 lg:mt-0 ">
          {userInfoLoading ? (
            <div className="bg-white w-[50px] h-[50px] rounded-full shadow-md animate-pulse"></div>
          ) : userInfo?.id ? (
            <UserAvatarUI />
          ) : (
            <div
              className="flex  font-[700]  max-h-[2.7rem] lg:max-h-[3.3rem]
         "
            >
              <Link
                href="/login"
                className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#5F8122] group px-5 md:px-3 py-1 md:py-0 lg:py-1 xl:py-2  bg-white rounded-[36px] uppercase "
              >
                <span className="relative z-10 text-[#5F8122] group-hover:text-white text-lg md:text-sm lg:text-sm  xl:text-lg duration-500 mx-3">
                  Login
                </span>
                <span className="absolute w-full h-full bg-[#5F8122] -left- top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-[#5F8122] -right- top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPublic;
