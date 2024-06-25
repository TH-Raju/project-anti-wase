"use client";
import { AllImage } from "@/assets/AllImge";
import { Col, Divider, Pagination, PaginationProps, Row, Input } from "antd";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { USER_ROLE } from "@/constants/role";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { ENUM_YN } from "@/constants/globalEnums";
import { useDebounced } from "@/redux/hooks";
import { useGetAllShopsQuery } from "@/redux/api/sellerApi/shopsApi";
import { Error_model_hook } from "@/utils/modalHook";
import { IShop } from "@/types/shopType";
import { imageLinkGeneratorByObject } from "../Utlis/ImageLinkGenerator";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import SelectDynamicCategory from "../Forms/DynamicSelect/SelectDynamicCategory";

export default function ShopList() {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["needProperty"] = "review";
  query["isDelete"] = ENUM_YN.NO;

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
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  const { data, isLoading, error } = useGetAllShopsQuery(query);
  const meta = data?.meta;
  if (userInfoLoading || isLoading) {
    return <LoadingSkeleton />;
  }
  if (error) {
    // Error_model_hook()
    console.log(error);
    // console.log(error.message);
  }
  return (
    <div className="p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md ">
      <div className="block md:flex justify-between items-center">
        <h1 className="font-sans font-medium text-gray-500">Shop List</h1>
        <div className="flex justify-start items-center gap-2">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "300px",
            }}
          />
          <SelectDynamicCategory
            defaultLabelText="SortBy"
            setValue={setSortBy}
            value={[{ label: "Top rating", value: "totalRatings" }]}
          />
        </div>
      </div>
      <Divider style={{ margin: "10px" }} />
      <Row gutter={[16, 16]}>
        {data?.data.map((shop: IShop) => (
          <Col xs={24} md={12} lg={8} xl={6} key={shop._id}>
            <div className="space-y-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl p-3 ">
              <Image
                alt=""
                src={imageLinkGeneratorByObject(shop.images[0])}
                height={500}
                width={500}
                className="h-[25vh] rounded-xl"
              />

              <div className="space-y-3">
                <div className="flex justify-between items-center text-2xl">
                  <h2 className="font-sans font-medium text-black text-2xl">
                    {shop.name}
                  </h2>
                  <p className="text-black flex gap-2 items-center justify-center ">
                    <Image
                      src={AllImage.ratingIcon}
                      width={50}
                      height={50}
                      alt=""
                      className="w-6 h-6"
                    />{" "}
                    <span className="text-lg">
                      (
                      {
                        //@ts-ignore
                        shop?.shopReviews?.averageRating || 0
                      }
                      )
                    </span>
                  </p>
                </div>
                <p className="text-[#686868] inline-flex items-center gap-2 text-sm">
                  <CiLocationOn className="w-10 h-10" />{" "}
                  <EllipsisMiddle suffixCount={3} maxLength={90}>
                    {shop.address}
                  </EllipsisMiddle>
                </p>

                <div className="flex justify-center items-center">
                  <Link
                    href={`/${userInfo?.role}/shops/shop-list/details/${shop?._id}`}
                    className=" font-sans w-[40%] hover:text-gray-200  cursor-pointer text-center text-white rounded-lg p-2 mx-auto bg-[#82866B]"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
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
