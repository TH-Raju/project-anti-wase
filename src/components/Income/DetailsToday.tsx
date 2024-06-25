"use client";
import { AllImage } from "@/assets/AllImge";
import { employeeTransaction } from "@/db/transaction";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function DetailsToday({ id }: { id: string }) {
  const singleEmployee = employeeTransaction.find(
    (employee) => employee.employeeId === id
  );
  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
      <div className="h-screen relative">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href="./">
                <IoIosArrowBack className="h-8 w-10 text-gray-500" />
              </Link>
              <span className=" font-sans font-normal">
                Today’s Income details
              </span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>
        <div className="flex items-center gap-8  mb-5">
          <Image
            src={AllImage.user}
            alt="user"
            height={150}
            width={150}
            className="relative overflow-hidden rounded-xl"
          />

          <h1 className="font-sans ">{singleEmployee?.name}</h1>
        </div>
        <h2 className="text-2xl my-6 text-[#82866b] font-sans">Information</h2>
        <div>
          <h4 className="font-sans font-normal">
            Employee ID: {singleEmployee?.employeeId}
          </h4>
          <h4 className="font-sans font-normal">
            Email: {singleEmployee?.name}
          </h4>
          <h4 className="font-sans font-normal">
            Trx ID: {singleEmployee?.trxId}
          </h4>
          <h4 className="font-sans font-normal">
            Time & Time: {singleEmployee?.dateTime}
          </h4>
          <h4 className="font-sans font-normal">
            Amount: {singleEmployee?.amount}
          </h4>
          <h4 className="font-sans font-normal">
            Payment Method: {singleEmployee?.paymentMethod}
          </h4>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-[#82866b] text-white hover:bg-[#6c7057] w-full font-sans"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
