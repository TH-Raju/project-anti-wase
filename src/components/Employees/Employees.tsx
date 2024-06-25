"use client";

import { PiUsersThree } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import { Button, Empty, Input, PaginationProps, Space, Table } from "antd";
import { IAllUsers, usersData } from "@/db/AllUsers";
import { Column } from "@ant-design/plots";
import Link from "next/link";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useState } from "react";
import { ENUM_YN } from "@/constants/globalEnums";
import { useDebounced } from "@/redux/hooks";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { Error_model_hook } from "@/utils/modalHook";
import ActionBar from "../ui/ActionBar";
import UMTable from "../ui/UMTable";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import StatusTag from "../ui/CustomTag/StatusTag";
import { USER_ROLE } from "@/constants/role";
export default function Employees() {
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
  query["isDelete"] = ENUM_YN.NO;
  query["role"] = USER_ROLE.EMPLOYEE;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    //  //  // console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  const { data, isLoading, error } = useGetAllUsersQuery(query);
  const allData = data?.data;
  const meta = data?.meta;

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      // ellipsis: true,
    },
    {
      title: "UserId",
      dataIndex: "userUniqueId",
      // ellipsis: true,
    },

    {
      title: "Status",
      width: 150,
      render: function (data: any) {
        const status = data?.status;
        return <StatusTag status={status} />;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 130,
      render: function (data: any) {
        return (
          <>
            <Link
              href={`/${userInfo?.role}/employees/${data}`}
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
  if (error) {
    console.log(error);
    Error_model_hook(error);
    // console.log(error.message);
  }
  return (
    <>
      <div className="p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md h-screen">
        <div className="flex items-center justify-between">
          <h1 className="font-sans font-medium text-gray-500 ml-3 mt-2">
            Employee
          </h1>
          <div className="flex items-center justify-around gap-2 text-xl bg-gray-100 p-3 rounded-lg">
            <PiUsersThree />
            <p className="font-sans">
              Total Employees{" "}
              <span className="ml-5 font-bold text-gray-600 ">
                {meta?.total}
              </span>
            </p>
          </div>
        </div>
        <p className=" text-red-100 w-full border my-6"></p>

        <div>
          {/* <UMBreadCrumb
        items={[
          {
            label: "${userInfo?.data?.role}",
            link: "/${userInfo?.data?.role}",
          },
        ]}
      /> */}
          <ActionBar title="Employee List">
            <Input
              size="large"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "20%",
              }}
            />
            <div>
              {/* <Link href={`/${userInfo?.role}/blog/create`}>
            <Button type="primary">Create blog</Button>
          </Link> */}
              {(!!sortBy || !!sortOrder || !!searchTerm) && (
                <Button
                  style={{ margin: "0px 5px" }}
                  type="default"
                  onClick={resetFilters}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </div>
          </ActionBar>

          <UMTable
            loading={userInfoLoading || isLoading}
            columns={columns}
            dataSource={allData}
            pageSize={size}
            totalPages={meta?.total}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            onTableChange={onTableChange}
            showPagination={true}
          />
        </div>
      </div>
    </>
  );
}
