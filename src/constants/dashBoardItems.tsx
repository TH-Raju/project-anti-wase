import { Button, type MenuProps } from "antd";

import { TbPointFilled } from "react-icons/tb";
import { PiPackageDuotone } from "react-icons/pi";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { GiJetPack } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { CiDesktop } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegIdCard } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Open_Sans } from "next/font/google";

const inter = Open_Sans({ subsets: ["latin"], weight: ["400"] });
export const dashboardItems = (role: string, setCollapsed?: any) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: (
        <div>
          <Link
            onClick={() => (setCollapsed ? setCollapsed(false) : null)}
            href={`/dashboard`}
            className="font-sans font-normal"
          >
            Dashboard
          </Link>
        </div>
      ),
      key: `/dashboard`,
      icon: <CiDesktop style={{ fontSize: "20px", color: "#82866B" }} />,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/shops`}
          className="text-black font-sans font-normal"
        >
          Shops
        </Link>
      ),
      key: "Shops",

      icon: <CiShop style={{ fontSize: "20px", color: "#82866B" }} />,

      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/shops/shop-list`}
              className=" font-sans font-normal"
            >
              Shop List
            </Link>
          ),
          key: `/${role}/shops/ShopList`,
          icon: <TbPointFilled />,
        },
        {
          label: (
            <Link
              href={`/${role}/shops/shop-request`}
              className="text-[#191916] font-normal"
            >
              Shop Request
            </Link>
          ),
          key: `/${role}/shops/shop-request`,
          icon: <TbPointFilled />,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/users`}
          className="text-[#191916] font-normal"
        >
          {" "}
          Users
        </Link>
      ),
      key: `/${role}/users`,
      icon: <FaUsers style={{ fontSize: "20px", color: "#82866B" }} />,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/employees`}
          className="text-[#191916] font-normal"
        >
          {" "}
          Employees
        </Link>
      ),
      key: `/${role}/employees`,
      icon: <FaUserFriends style={{ fontSize: "20px", color: "#82866B" }} />,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/transaction`}
          className=" font-sans font-normal"
        >
          Transaction
        </Link>
      ),
      key: `/${role}/transaction`,
      icon: <GrTransaction style={{ fontSize: "20px", color: "#82866B" }} />,
    },

    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/income`}
          className="text-[#191916] font-normal"
        >
          Income
        </Link>
      ),
      key: `/${role}/income`,
      icon: <FaRegCreditCard style={{ fontSize: "20px", color: "#82866B" }} />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/income/today`}
              className=" font-sans font-normal"
            >
              Today
            </Link>
          ),
          key: `/${role}/income/today`,
          icon: <TbPointFilled />,
        },
        {
          label: (
            <Link
              href={`/${role}/income/weekly`}
              className=" font-sans font-normal"
            >
              Weekly
            </Link>
          ),
          key: `/${role}/income/weekly`,
          icon: <TbPointFilled />,
        },
        {
          label: (
            <Link
              href={`/${role}/income/monthly`}
              className=" font-sans font-normal"
            >
              Monthly
            </Link>
          ),
          key: `/${role}/income/monthly`,
          icon: <TbPointFilled />,
        },
      ],
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/kyc`}
          className=" font-sans font-normal"
        >
          KYC
        </Link>
      ),
      key: `/${role}/kyc`,
      icon: <FaRegIdCard style={{ fontSize: "20px", color: "#82866B" }} />,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/settings`}
          className="text-black font-sans font-normal"
        >
          Settings
        </Link>
      ),
      key: `/${role}/settings`,
      icon: (
        <IoSettingsOutline style={{ fontSize: "20px", color: "#82866B" }} />
      ),
    },
    {
      label: (
        // <Link
        //   onClick={() => (setCollapsed ? setCollapsed(false) : null)}
        //   href={`/${role}/logout`}
        // >
        //   Log Out
        // </Link>
        <Button
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.reload();
          }}
        >
          Log Out
        </Button>
      ),
      key: `/${role}/logout`,
      icon: <MdOutlineLogin style={{ fontSize: "20px", color: "#82866B" }} />,
    },
  ];

  if (role === USER_ROLE.ADMIN) return adminSidebarItems;
};
