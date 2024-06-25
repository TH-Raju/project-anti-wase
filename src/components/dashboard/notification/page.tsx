"use client";
import { notiData } from "@/db/notification";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Notification() {
  
  return (
    <div className="p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md h-screen">
      <h1 className="font-sans font-medium text-gray-500 ml-3 mt-2">
        Notification
      </h1>
      <p className=" text-red-100 w-full border my-6"></p>

      <div>
        {notiData?.map((nots) => (
          <div
            key={nots.key}
            className="flex items-center gap-6 mb-6 hover:bg-gray-300 rounded-md duration-150 py-1 px-3"
          >
            <IoNotificationsOutline className="h-8 w-10 text-gray-500" />
            <div>
              <h3 className="text-xl font-light pb-1">{nots.message}</h3>
              <p>{nots.dateTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
