"use client";
import { AllImage } from "@/assets/AllImge";
import { USER_ROLE } from "@/constants/role";
import { Col, Empty, Pagination, PaginationProps, Row,Input } from "antd";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useDebounced } from "@/redux/hooks";
import {
  useGetAllShopsQuery,
  useUpdateShopsMutation,
} from "@/redux/api/sellerApi/shopsApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";
import { IShop } from "@/types/shopType";
import { imageLinkGeneratorByObject } from "../Utlis/ImageLinkGenerator";
import { ENUM_STATUS } from "@/constants/globalEnums";

export default function ShopRequest() {
  const { userInfo, userInfoLoading } = useGlobalContext();
  // console.log("🚀 ~ SurpriseBagList ~ active:", active);
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = ENUM_STATUS.INACTIVE;

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
      // console.log(query[key])
      query[key] = query[key];
    }
  }
  //
  const { data, isLoading, error, isSuccess } = useGetAllShopsQuery({
    ...query,
  });
  const allShop = data?.data || [];
  const meta = data?.meta;
  const [updateShop, { isLoading: UpdateShopeLoading }] =
    useUpdateShopsMutation();
  //
  if (isLoading || userInfoLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    console.log(error);
    Error_model_hook(error);
  }
  const handleUpdate = ({ id, status }: { id: string; status: string }) => {
    console.log({ id, status });
    confirm_modal(
      `Are you sure you want to ${
        status === ENUM_STATUS.ACTIVE ? "Accept" : "Reject"
      } this shop`
    ).then(async (res) => {
      if (res.isConfirmed) {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ status })); // Stringify the object
        try {
          const res = await updateShop({
            id,
            data: formData,
          }).unwrap();
        //   console.log("🚀 ~ ).then ~ res:", res);
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Successfully Update Status");
          }
        } catch (error: any) {
          console.log("🚀 ~ confirm_modal ~ error:", error);
          Error_model_hook(error);
        }
      }
    });
  };

  return (
    <div>
      <div className="block md:flex justify-between items-center my-2">
        <h1 className="font-sans font-medium text-gray-500">Shop Request</h1>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
      </div>
      {allShop.length ? (
        <div className="min-h-[80vh] flex flex-col justify-between">
          <Row gutter={[16, 16]}>
            {allShop.map((shop: IShop) => (
              <Col xs={24} md={12} lg={8} xl={6} key={shop._id}>
                <div className="space-y-3 h-full w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl p-3 flex flex-col justify-between">
                  <Image
                    alt=""
                    src={imageLinkGeneratorByObject(shop.images[0])}
                    height={500}
                    width={500}
                    className="h-[25vh] rounded-xl"
                  />
                  <div className="space-y-3 ">
                    <div className="flex justify-between items-center text-2xl">
                      <h2 className="font-sans font-normal text-black text-xl">
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
                          ({shop.shopReviews?.averageRating || 0})
                        </span>
                      </p>
                    </div>
                    <p className="text-[#686868] inline-flex items-center gap-2 text-sm">
                      <CiLocationOn /> {shop.address}
                    </p>

                    <div className="grid grid-cols-2 gap-3 px-1">
                      <button
                        onClick={() =>
                          handleUpdate({
                            id: shop._id,
                            status: ENUM_STATUS.ACTIVE,
                          })
                        }
                        className="bg-[#82866B] rounded p-2 text-white "
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleUpdate({
                            id: shop._id,
                            status: ENUM_STATUS.REJECTED,
                          })
                        }
                        className="border rounded border-[#82866B]"
                      >
                        Decline
                      </button>
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
      ) : (
        <Empty />
      )}
    </div>
  );
}
