"use client";
import { AllImage } from "@/assets/AllImge";
import { useGetAllSurpriseBagsQuery } from "@/redux/api/sellerApi/surpriseBagApi";
import { useDebounced } from "@/redux/hooks";
import { ISurpriseBag } from "@/types/surpriseBagType";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RiShoppingBagLine } from "react-icons/ri";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { Empty, Pagination, PaginationProps } from "antd";
import { imageLinkGeneratorByObject } from "../Utlis/ImageLinkGenerator";
import { Error_model_hook } from "@/utils/modalHook";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import Link from "next/link";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
export type IOrderStatus = "available" | "reserved" | "expired";
export enum ENUM_ORDER_STATUS {
  AVAILABLE = "available",
  RESERVED = "reserved",
  EXPIRED = "expired",
}

export default function SurpriseBagList({ shopId }: { shopId: string }) {
  const [active, setActive] = useState<Partial<ISurpriseBag>>({});
  const {userInfo,userInfoLoading} =useGlobalContext()
  // console.log("🚀 ~ SurpriseBagList ~ active:", active);
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  // query["isDelete"] = ENUM_YN.NO;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPage(current);
    setSize(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      query[key] = query[key];
    }
  }
  const { data, isLoading, error, isSuccess } = useGetAllSurpriseBagsQuery(
    {
      ...query,
      shopId: shopId,
    },
    { skip: !Boolean(shopId) }
  );
  const allBag = data?.data || [];
  const meta = data?.meta;

  useEffect(() => {
    if (allBag.length) {
      setActive(allBag[0]);
    }
    return () => {};
  }, [isLoading]);
  if (isLoading ||userInfoLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    console.log(error);
    Error_model_hook(error);
  }
  //   if(isSuccess) {
  //     if (allBag.length) {
  //         setActive(allBag[0]);
  //       }
  //   }

  //   console.log("🚀 ~ SurpriseBagList ~ allBag:", allBag);
  return (
    <div className="p-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md ">
      <div className="font-sans font-medium text-gray-500 text-md lg:text-xl  gap-1">
        <div className="flex items-center justify-start gap-1 font-semibold">
         <Link href={`/${userInfo?.role}/shops/shop-list`}> <IoIosArrowBack /></Link> Surprise Bag List 
        </div>
        {allBag?.length && active ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-t-[2px] border-[#82866B] w-full mt-2 ">
            <div
              className={`space-y-3  my-2 border-r-2 pr-2 border-[#82866B]  max-h-screen`}
            >
              {allBag?.map((item: ISurpriseBag) => (
                <div
                  onClick={() => setActive(item)}
                  className={`rounded-lg p-3 flex justify-between items-start ${
                    active?._id === item?._id
                      ? "bg-[#82866B] text-white"
                      : "bg-[#F3F3F0] text-black"
                  } border border-[#82866B]`}
                  key={item?._id}
                >
                  <div className="flex justify-start items-start gap-2">
                    <Image
                      src={imageLinkGeneratorByObject(item.image)}
                      alt=""
                      className="w-24  rounded-lg"
                      width={300}
                      height={300}
                    />
                    <div className="flex flex-col justify-between items-start">
                      <p className=" font-medium text-lg ">{item.name}</p>
                      <p className="font-medium text-[16px]">
                        Bag no: {item.bagNo}
                      </p>
                      <p className="font-medium text-[16px]">
                        Date:{" "}
                        {new Date(item.validation[0]).toLocaleDateString()} -{" "}
                        {new Date(item.validation[1]).toLocaleDateString()}
                      </p>
                      {/* <p className='text-gray-500 font-medium'>{item.date[1]}</p> */}
                    </div>
                  </div>
                  <div className="">
                    {item.orderStatus === ENUM_ORDER_STATUS.AVAILABLE ? (
                      <button
                        className="
                                    bg-green-500 text-white py-1 px-2 rounded text-sm capitalize"
                      >
                        {item.orderStatus}
                      </button>
                    ) : item.orderStatus === ENUM_ORDER_STATUS.RESERVED ? (
                      <button
                        className="
                                    bg-[#FCE6E6] text-red-500  py-1 px-2 rounded text-sm capitalize"
                      >
                        {item.orderStatus}
                      </button>
                    ) : (
                      <button
                        className="
                                    bg-[#E9E9E9] text-[#989898] py-1 px-2 rounded text-sm capitalize"
                      >
                        {item.orderStatus}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <div className="flex justify-between items-start">
                <Image
                  src={imageLinkGeneratorByObject(active.image)}
                  alt=""
                  width={700}
                  height={700}
                  className="w-52 h-32 rounded-xl"
                />
                <div className="">
                  {active.orderStatus === ENUM_ORDER_STATUS.AVAILABLE ? (
                    <button
                      className="
                                    bg-green-500 text-white py-1 px-2 rounded text-xs capitalize"
                    >
                      {active.orderStatus}
                    </button>
                  ) : active.orderStatus === ENUM_ORDER_STATUS.RESERVED ? (
                    <button
                      className="
                                    bg-[#FCE6E6] text-red-500  py-1 px-2 rounded text-xs capitalize"
                    >
                      {active.orderStatus}
                    </button>
                  ) : (
                    <button
                      className="
                                    bg-[#E9E9E9] text-[#989898] py-1 px-2 rounded text-xs capitalize"
                    >
                      {active.orderStatus}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center font-semibold text-[#82866B]">
                  <p className=" font-medium text-lg ">{active.name}</p>
                  <p className="font-medium text-lg">
                    ${active.pricing?.amount}
                  </p>
                </div>
                <p className="font-medium text-[16px]">
                  Bag no: {active.bagNo}
                </p>
                <p className="font-medium text-[16px]">
                  Pick up: {active.pickUpHour}
                </p>
              </div>
              <div className="flex justify-start items-start gap-2 my-2">
                <RiShoppingBagLine style={{ fontSize: "25px" }} />
                <div className="space-y-1">
                  <h4 className="text-lg">What you could get</h4>
                  <p className="text-sm">
                    {/* <EllipsisMiddle suffixCount={3} maxLength={90}> */}
                    {active.description}
                    {/* </EllipsisMiddle> */}
                  </p>
                </div>
              </div>

              {/* {active.orderDetails?.userDetails && (
                <>
                  <div className="space-y-2 mt-2">
                    <h4>Order Information</h4>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-[#82866B]">User name</p>
                      <p>{active.orderDetails?.userDetails?.fullName}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-[#82866B]">User ID</p>
                      <p>{active.orderDetails?.userDetails?.userUniqueId}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-[#82866B]">Order ID</p>
                      <p>{active.orderDetails?._id}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p>Total Amount</p>
                      <p>${active.orderDetails?.amount}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-[#82866B]">Payment Method</p>
                      <p>
                        {active.orderDetails?.payment_method_types?.length &&
                          active.orderDetails?.payment_method_types[0]}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-[#82866B]">Pick up Hour</p>
                      <p>{active.pickUpHour?.join("-")}</p>
                    </div>
                  </div>
                  <button className="border rounded-md border-[#82866B] w-full p-3 text-center text-lg my-3 text-[#82866B]">
                    Pick Up Starts In {active.pickUpHour?.join("-")}
                  </button>
                </>
              )} */}

              <>
                <div className="space-y-2 mt-2">
                  <h4>Order Information</h4>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#82866B]">User name</p>
                    <p>{active.orderDetails?.userDetails?.fullName || "N/A"}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#82866B]">User ID</p>
                    <p>
                      {active.orderDetails?.userDetails?.userUniqueId || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#82866B]">Order ID</p>
                    <p>{active.orderDetails?._id || "N/A"}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p>Total Amount</p>
                    <p>${active.orderDetails?.amount || "N/A"}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#82866B]">Payment Method</p>
                    <p>
                      {active.orderDetails?.payment_method_types?.length
                        ? active.orderDetails?.payment_method_types[0]
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-[#82866B]">Pick up Hour</p>
                    <p>
                      {active.orderDetails?._id && active.pickUpHour?.join("-")}
                    </p>
                  </div>
                </div>
                <button className="border rounded-md border-[#82866B] w-full p-3 text-center text-lg my-3 text-[#82866B]">
                  Pick Up Starts In{" "}
                  {active.orderDetails?._id && active.pickUpHour?.join("-")}
                </button>
              </>
            </div>
            <div className={`mt-5 mb-2  flex justify-center items-center`}>
              <Pagination
                showSizeChanger
                current={page}
                onChange={onChange}
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                total={meta?.total}
              />
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
