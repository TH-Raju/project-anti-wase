"use client";
import { AllImage } from "@/assets/AllImge";
import { Divider, Empty, Upload } from "antd";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import {
  useDeleteShopsMutation,
  useGetSingleShopsQuery,
} from "@/redux/api/sellerApi/shopsApi";
import { IShop } from "../../types/shopType";
import { imageLinkGeneratorByObject } from "../Utlis/ImageLinkGenerator";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";
import { useRouter } from "next/navigation";

export default function ShopDetails({ shopId }: { shopId: string }) {
  const router = useRouter();
  const { userInfo, userInfoLoading } = useGlobalContext();
  const { data, isLoading, error } = useGetSingleShopsQuery(
    `${shopId}?isDelete=no`,
    {
      skip: !Boolean(shopId),
    }
  );
  console.log("🚀 ~ ShopDetails ~ data:", data);
  const [deleteShop, { isLoading: shopDeleteLoading }] =
    useDeleteShopsMutation();
  if (userInfoLoading || isLoading) {
    return <LoadingSkeleton />;
  }
  const handleDelete = () => {
    confirm_modal(`Are you sure you want to delete this shop?`).then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await deleteShop(shopId).unwrap();
            //   console.log("🚀 ~ ).then ~ res:", res);
            if (res?.success == false) {
              // message.success("Admin Successfully Deleted!");
              // setOpen(false);
              Error_model_hook(res?.message);
            } else {
              Success_model("Successfully Delete Shop");
              router.push(`/${userInfo?.role}/shops/shop-list`);
            }
          } catch (error: any) {
            console.log("🚀 ~ confirm_modal ~ error:", error);
            Error_model_hook(error);
          }
        }
      }
    );
  };
  return (
    <>
      {data?.data ? (
        <div className="p-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md ">
          <div className="font-sans font-medium text-gray-500 text-md lg:text-xl flex items-center justify-between gap-1">
            <div className="flex items-center justify-between gap-1">
              <Link
                href={`/${userInfo?.role}/shops/shop-list`}
                className="text-gray-500"
              >
                {" "}
                <IoIosArrowBack />
              </Link>{" "}
              Shop Details
            </div>{" "}
            <button
              onClick={handleDelete}
              className="flex items-center justify-between gap-1"
            >
              <RiDeleteBin6Fill style={{ color: "red" }} />
              <p className=" ">Delete Shop</p>
            </button>
          </div>
          <Divider />
          <div className="flex justify-between items-center  -mt-4">
            <div className="flex items-center gap-3 ">
              <Image
                src={imageLinkGeneratorByObject(data?.data.images[0])}
                alt=""
                width={500}
                height={500}
                className="rounded  w-24 h-20"
              />
              <p>{data?.data?.name}</p>
              <p className="flex items-center gap-1">
                {" "}
                <Image
                  src={AllImage.ratingIcon}
                  alt=""
                  width={500}
                  height={500}
                  className="rounded-lg w-4 h-4"
                />{" "}
                <span>({data?.data?.shopReviews?.averageRating || 0})</span>
              </p>
            </div>
            <div>
              <p>Employee Details</p>
              <div className="flex justify-between gap-2 items-center bg-[#F3F3F0] p-3">
                <Image
                  src={imageLinkGeneratorByObject(
                    data?.data.userDetails.profileImage
                  )}
                  alt=""
                  width={500}
                  height={500}
                  className="rounded w-16 h-16"
                />
                <p>{data?.data?.userDetails?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg text-[#82866B] ">Information</p>
            <p>Address: {data?.data?.address}</p>
            <p>Shop Category: {data?.data?.categoryDetails?.title}</p>
            <p>Shop Opening Hour: {data?.data.openingHours}</p>
            <p>Shop Weekend: Monday</p>
            <p>About Shop:</p>
            <p>{data?.data?.about}</p>
          </div>
          <div className="my-2 space-y-2">
            <h3>Documents</h3>
            <div className="flex justify-start flex-wrap items-start gap-2">
              {data?.data?.documents?.map((document,index) => {
                return (
                  <>
                    {document.fileMimeType?.includes("image") ? (
                      <div className="" key={document.server_url}>
                        <Image
                          src={imageLinkGeneratorByObject(document)}
                          alt=""
                          width={500}
                          height={500}
                          className=" w-16 h-16"
                        />
                      </div>
                    ) : document.fileMimeType?.includes("application/pdf") ? (
                      <div className="" key={document.server_url}>
                        <Link href={imageLinkGeneratorByObject(document) as any} >pdf {index +1}</Link>
                      </div>
                    ) : (
                      <div key={document.server_url}></div>
                    )}
                  </>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 md:mt-4 text-center">
            <Link
              href={`/${userInfo?.role}/shops/shop-list/surprise-bag-list/${data?.data._id}`}
              className="border border-[#82866B] text-[#82866B] rounded-md p-4"
            >
              Surprise Bag List
            </Link>
            <Link
              href={`/${userInfo?.role}/shops/shop-list/shop-review/${data?.data._id}`}
              className="bg-[#82866B] rounded-md  p-4 text-white"
            >
              Shop Review
            </Link>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
}
