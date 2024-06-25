import { AllImage } from "@/assets/AllImge";
import UsersIcon from "@/assets/svg/UsersIcon";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Divider,
  Flex,
  Radio,
  RadioChangeEvent,
  Row,
} from "antd";
import Image, { StaticImageData } from "next/image";
import { it } from "node:test";
import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { PiTreeDuotone } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";
import dayjs from "dayjs";
import { Example } from "../Chart/IncomeChart";
import { useGetAllDashboardDataQuery } from "@/redux/api/adminApi/dashboardApi";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import UMTable from "@/components/ui/UMTable";
import Link from "next/link";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { BiDollar } from "react-icons/bi";
import MoneyIcon from "@/assets/svg/moneyIcon";
import {
  useGetAllFavoriteAvgRatingShopsQuery,
  useGetAllShopsQuery,
} from "@/redux/api/sellerApi/shopsApi";
import { IShop } from "@/types/shopType";
import { imageLinkGeneratorByObject } from "@/components/Utlis/ImageLinkGenerator";
export default function AdminDashboardMain() {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const [value, setValue] = useState(1);
  const { data: dashboardData, isLoading } = useGetAllDashboardDataQuery({});
  const { data: inactiveShop, isLoading: inactiveShopLoading } =
    useGetAllShopsQuery({
      status: ENUM_STATUS.INACTIVE,
    });
  const { data: RatingData, isLoading: ratingShopLoading } =
    useGetAllFavoriteAvgRatingShopsQuery({});
  if (isLoading || inactiveShopLoading || ratingShopLoading) {
    return <LoadingSkeleton />;
  }
  const totalUser = dashboardData?.data?.totalUser;
  const totalAmountAndAmountRelation =
    dashboardData?.data?.totalAmountAndAmountRelation[0];
  const data = [
    {
      icon: <UsersIcon width={30} />,
      title: "Total Users",
      count: totalUser.length ? totalUser[0]?.count : 0,
    },
    {
      icon: <UsersIcon width={30} />,
      title: "Total Employees",
      count: totalUser.length ? totalUser[2]?.count : 0,
    },
    {
      icon: <MoneyIcon width={50} />,
      title: "Total Income",
      count: totalAmountAndAmountRelation?.totalAmount[0]?.totalPrice,
    },
  ];

  const recentData: any = totalAmountAndAmountRelation?.recentTransaction;

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const columns = [
    {
      title: "",
      render: (item: any) => {
        return (
          <>
            <div className="space-y-2">
              <p>{item?.surpriseBag?.name}</p>
              <p>{item.pi_id}</p>
            </div>
          </>
        );
      },
    },
    {
      title: "",
      render: (item: any) => {
        return (
          <>
            <p className="text-white py-1 px-2 rounded-md text-center text-wrap bg-[#82866B]">
              {item?.surpriseBag?.foodCategory}
            </p>
          </>
        );
      },
    },
    {
      title: "",
      render: (item: any) => {
        return (
          <>
            <p className="truncate text-center text-wrap">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <p className="truncate text-center text-wrap">
              {new Date(item.createdAt).toLocaleTimeString()}
            </p>
          </>
        );
      },
    },

    {
      title: "",
      render: (item: any) => {
        return (
          <>
            <div className="truncate text-center text-wrap">
              {item?.refund?.isRefund === ENUM_YN.YES ? (
                <p className="bg-indigo-500 text-white px-2  py-1 rounded-md ">
                  Refund
                </p>
              ) : item.delivery.isDelivery === ENUM_YN.YES ? (
                <p className="bg-green-700 text-white px-2  py-1 rounded-md ">
                  Completed
                </p>
              ) : (
                <p className="bg-[#D8D9D1] text-white px-2  py-1 rounded-md ">
                  Pending
                </p>
              )}
            </div>
          </>
        );
      },
    },
    {
      title: "",
      render: (item: any) => {
        return (
          <>
            <p className="truncate text-center text-wrap">
              {item?.userDetails?.fullName}
            </p>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "_id",
      width: 130,
      render: function (data: any) {
        return (
          <>
            <Link
              href={`/${userInfo?.role}/users/${data}`}
              className="flex justify-center items-center"
            >
              {/* <Button onClick={() => console.log(data)} type="primary"> */}
              <EyeOutlined width={100} />
              {/* </Button> */}
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col sm={24} lg={16}>
          <Row gutter={[16, 16]}>
            {data.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <div className="flex justify-center items-center  p-5 gap-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] border border-[#D8D9D1] bg-white rounded-lg">
                  {item.icon}
                  <div>
                    <p>{item.title}</p>
                    <p>{item.count}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="border border-[#D8D9D1] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] mt-2 rounded-lg p-2 space-y-3 bg-white">
            <div className="flex justify-between">
              <p>Income Ratio</p>
              <p>January 2022</p>
            </div>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>This month</Radio>
              <Radio value={2}>Last month</Radio>
            </Radio.Group>
            <Example />
          </div>
        </Col>
        <Col
          sm={24}
          lg={8}
          className="overflow-y-auto h-[100vh] lg:!h-[57.5vh] !w-full"
        >
          <div className=" p-2 rounded border border-gray-300 w-full bg-white">
            <div className="flex justify-between items-center ">
              <p>Shop Request</p>
              <Link href={`/${userInfo?.role}/shops/shop-request`} className="text-[#82866B] text-md">See all</Link>
            </div>
            <Divider />
            <div>
              {inactiveShop?.data?.map((item: IShop) => (
                <div className="" key={item._id}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src={imageLinkGeneratorByObject(item?.images[0])}
                        alt=""
                        width={300}
                        height={300}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-md">{item.name}</p>
                        <p className="text-xs">{item.address}</p>
                      </div>
                    </div>
                    <HiDotsVertical />
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ marginTop: "1rem" }}>
        <Col sm={24} lg={16}>
          <div className="border border-[#D8D9D1] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  rounded-lg p-3 space-y-3 bg-white">
            <div className="flex justify-between">
              <p>Recent Transaction</p>
              <DatePicker
                defaultValue={dayjs("01/01/2024")}
                format={"DD/MM/YYYY"}
              />
            </div>

            <Divider />

            {/* <div>
              {recentData.map((item: any) => (
                <div key={item._id}>
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <p>{item?.surpriseBag?.name}</p>
                      <p>{item.pi_id}</p>
                    </div>
                    <p className="text-white py-1 px-2 rounded-md bg-[#82866B]">
                      {item?.surpriseBag?.foodCategory}
                    </p>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                    <p className="truncate">{item?.userDetails?.email}</p>
                    <button className="capitalize py-1 px-2 bg-[#D8D9D1] p-1 rounded-md">
                      {item.status}
                    </button>
                    <HiDotsVertical />
                  </div>
                  <Divider className="" />
                </div>
              ))}
            </div> */}
            <UMTable
              loading={isLoading}
              columns={columns}
              dataSource={recentData}
              // pageSize={size}
              // totalPages={meta?.total}
              // showSizeChanger={true}
              // onPaginationChange={onPaginationChange}
              // onTableChange={onTableChange}
              showPagination={false}
            />
          </div>
        </Col>
        <Col
          sm={24}
          lg={8}
          className="overflow-y-auto h-[100vh] lg:!h-[57.5vh] !w-full"
        >
          <div className=" p-2 rounded border border-gray-300 w-full bg-white">
            <div className="flex justify-between items-center ">
              <p>Top Shop</p>
              <button className="text-[#82866B] text-md">See all</button>
            </div>
            <Divider />
            <div>
              {RatingData?.data?.map((item: IShop) => (
                <div className="" key={item._id}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src={imageLinkGeneratorByObject(item?.images[0])}
                        alt=""
                        width={300}
                        height={300}
                        className="w-10 h-10 rounded-full"
                      />

                      <p className="text-md truncate">{item.name}</p>
                    </div>

                    <div className="flex justify-center items-center gap-1">
                      <p>
                        <Image
                          src={AllImage.ratingIcon}
                          alt=""
                          width={200}
                          height={200}
                          className="w-5  h-5"
                        />
                      </p>
                      <p>({item?.shopReviews?.averageRating})</p>
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
