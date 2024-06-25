"use client";
import { AllImage } from "@/assets/AllImge";
import { Divider, Pagination, PaginationProps } from "antd";
import Image, { StaticImageData } from "next/image";
import { it } from "node:test";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useDebounced } from "@/redux/hooks";
import { useGetAllReviewOfShopsQuery } from "@/redux/api/userApi/reviewShopApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { Error_model_hook } from "@/utils/modalHook";
import { IShopReview } from "@/types/shopReviesType";
import { imageLinkGeneratorByObject } from "../Utlis/ImageLinkGenerator";
import Link from "next/link";
export type IReview = {
  _id: number;
  title: string;
  user: {
    image: StaticImageData | string;
    name: string;
  };
  feedback: {
    rating: number;
  };
  date: string;
};
export default function ShopReview({ shopId }: { shopId: string }) {
  const { userInfo, userInfoLoading } = useGlobalContext();
  // console.log("🚀 ~ SurpriseBagList ~ active:", active);
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
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
  const { data, isLoading, error, isSuccess } = useGetAllReviewOfShopsQuery(
    {
      ...query,
      shopId: shopId,
    },
    { skip: !Boolean(shopId) }
  );
  const allReviews = data?.data || [];
  const meta = data?.meta;

  if (isLoading || userInfoLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    Error_model_hook(error);
    console.log(error);
  }
  return (
    <div className="p-5 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md ">
      <div className="flex items-center justify-start gap-1 font-semibold">
        <Link className="cursor-pointer" href={`/${userInfo?.role}/shops/shop-list`}>
          {" "}
          <IoIosArrowBack style={{ marginBottom: "2px" }} />{" "}
        </Link>
        Shop Review
      </div>
      <Divider style={{ backgroundColor: "#C6C7BB" }} />
      <div className="space-y-2">
        {allReviews.map((item: IShopReview) => (
          <div className="bg-[#F3F3F0] rounded-lg p-3" key={item._id}>
            <div className="flex justify-between items-start">
              <div className="flex justify-center items-center gap-2">
                <Image
                  src={imageLinkGeneratorByObject(
                    item.userDetails?.profileImage
                  )}
                  alt=""
                  className="w-10 h-10 rounded-full"
                  width={300}
                  height={300}
                />
                <p>{item.userDetails?.fullName}</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <Image
                  src={AllImage.ratingIcon}
                  alt=""
                  width={100}
                  height={100}
                  className="w-4"
                />
                <p>({item.rating})</p>
                <HiDotsVertical />
              </div>
            </div>
            <div className="mt-1">
              <p>{item.reviewText}</p>
            </div>
            <div className="mt-4">
              <p className="text-[#82866B]">
                {new Date(item.createdAt as string).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
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
  );
}
