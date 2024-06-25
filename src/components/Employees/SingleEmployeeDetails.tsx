"use client";
import { AllImage } from "@/assets/AllImge";
import { usersData } from "@/db/AllUsers";
import { useGetSingleUserQuery } from "@/redux/api/adminApi/usersApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { imageLinkGeneratorByObject } from "../Utlis/ImageLinkGenerator";

export default function SingleEmployeeDetails({
  employeeId,
}: {
  employeeId: string;
}) {

  const { userInfo, userInfoLoading } = useGlobalContext();
  const { data, isLoading, error } = useGetSingleUserQuery(
    `${employeeId}?isDelete=no?needProperty=stripeAccount`,
    {
      skip: !Boolean(employeeId),
    }
  );
  const user = data?.data;
  if (userInfoLoading || isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
      <div className="h-screen relative">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href={`/${userInfo?.role}/users`}>
                <IoIosArrowBack className="h-8 w-10 text-gray-500" />
              </Link>
              <span className="font-sans">Users Details</span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>
        <div className="flex items-center gap-8  mb-5">
          <Image
            src={imageLinkGeneratorByObject(user?.profileImage)}
            alt="user"
            height={150}
            width={150}
            className="relative overflow-hidden rounded-xl w-[200px] h-[200px]"
          />

          <h1 className="font-sans text-gray-700">{user?.fullName}</h1>
        </div>
        <h2 className="text-2xl my-6 text-[#82866b] font-sans">Information</h2>
        <div>
          <h4 className="font-sans font-normal">
            User ID: {user?.userUniqueId}
          </h4>
          <h4 className="font-sans font-normal">Email: {user?.email}</h4>
          <h4 className="font-sans font-normal">
            Date of Birth:{" "}
            {user?.dateOfBirth
              ? new Date(user?.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </h4>
          <h4 className="font-sans font-normal">Address: {user?.address}</h4>
          {/* <h4 className="font-sans font-normal">
            Payment Method: {singleUser?.paymentMethod}
          </h4> */}
        </div>
      </div>
    </div>
  );
}
