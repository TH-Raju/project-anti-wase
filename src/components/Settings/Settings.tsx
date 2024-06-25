"use client";

import { Switch } from "antd";
import Link from "next/link";
import { MdOutlineArrowForwardIos } from "react-icons/md";
export default function Settings() {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="py-3 px-6 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md ">
      <h1 className="font-sans font-medium text-gray-500 mt-3">Settings</h1>
      <p className=" text-red-100 w-full border my-4"></p>
      <div className="leading-10">
        <div>
          <div className="flex justify-between items-center">
            <p className=" font-sans">Notification</p>
            <Switch
              defaultChecked
              onChange={onChange}
              className="bg-gray-600"
            />
          </div>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/change-password" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">Change Password</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/change-language" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">Change Language</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/login-activity" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">Login Activity</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/united-percentage" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">United Percentage</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/privacy-policy" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">Privacy Policy</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/terms-of-service" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">Terms of Services</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/about-us" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">About Us</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
        <div>
          <Link href="settings/support" className="text-black">
            <div className="flex justify-between items-center">
              <p className="font-sans">Support</p>
              <MdOutlineArrowForwardIos className="mr-4 text-md" />
            </div>
          </Link>
          <p className=" text-red-100 w-full border mb-3"></p>
        </div>
      </div>
    </div>
  );
}
