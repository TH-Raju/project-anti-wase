"use client";

import { IoEyeOutline } from "react-icons/io5";
import { Button, Space, Table } from "antd";
import { Column } from "@ant-design/plots";
import { SwapOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { IEmployeeTransaction, employeeTransaction } from "@/db/transaction";
import { useGetAllTransactionQuery } from "@/redux/api/adminApi/purchaseBagApi";
import { useDebounced } from "@/redux/hooks";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import UMTable from "../ui/UMTable";
import { ENUM_YN } from "@/constants/globalEnums";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
export default function Transaction() {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isRefund, setIsRefund] = useState<string>("no");
  const [isDelivery, setIsDelivery] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["isRefund"] = isRefund;
  query["isDelivery"] = isDelivery;
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllTransactionQuery(query);

  const allData = data?.data[0];
  console.log("🚀 ~ Transaction ~ allData:", allData);
  const meta = data?.meta;

  if (isLoading || userInfoLoading) {
    return <LoadingSkeleton />;
  }
  const onFilterChanged = (value: string) => {
    console.log(value);
  };
  let totalAmount = allData?.total[0].total || 0;
  let pendingAmount = allData?.deliveryPending[0].total || 0;
  let completeAmount = allData?.deliveryCompleted[0].total || 0;
  const columns = [
    {
      title: "Trx ID",
      dataIndex: "pi_id",
      key: "pi_id",
      className: "font-sans border-none",
      fixed: "left",
    },
    {
      title: "Employee ID",
      dataIndex: ["userDetails", "userUniqueId"],
      key: "_id",
      className: "font-sans border-none",
    },
    {
      title: "Time & Date",
      // dataIndex: "dateTime",
      key: "dateTime",
      className: "font-sans border-none",
      render: (record: any) => (
        <Space size="middle" className="font-sans">
          {new Date(record?.createdAt).toLocaleDateString()}
        </Space>
      ),
    },
    {
      title: "Amount",
      key: "amount",

      width: 150,
      className: "border-none font-sans",
      render: (_: any, record: any) => <>${record.amount}</>,
    },
    {
      title: "Status",
      className: "font-sans border-none ",
      width: 150,
      render: (item: any) => {
        return (
          <div className="">
            <div className="truncate max-w-24  text-center text-wrap">
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
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 130,
      className: "font-sans border-none",
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
  //   console.log("Total Amount:", totalAmount);
  //   console.log("Pending Amount:", pendingAmount);
  //   console.log("Complete Amount:", completeAmount);
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
  return (
    <div className="p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md h-screen">
      <div className="flex items-center justify-between">
        <h1 className="font-sans font-medium text-gray-500 ml-3 mt-2">
          Transaction
        </h1>
        <div className="flex justify-between items-center gap-10">
          <Button
            className="flex items-center justify-around gap-2 text-lg bg-gray-100 p-3 rounded-lg py-7"
            onClick={() => {
              setIsDelivery("");
            }}
          >
            <SwapOutlined />
            <p>
              All Transaction{" "}
              <span className="ml-5 font-bold  text-2xl text-[#82866b]  font-sans">
                ${totalAmount}
              </span>
            </p>
          </Button>
          <Button
            className="flex items-center justify-around gap-2 text-lg bg-gray-100 p-3 rounded-lg py-7"
            onClick={() => {
              setIsDelivery(ENUM_YN.YES);
            }}
          >
            <SwapOutlined />
            <p>
              Completed{" "}
              <span className="ml-5 font-bold  text-2xl text-[#82866b] font-sans">
                ${completeAmount}
              </span>
            </p>
          </Button>
          <Button
            className="flex items-center justify-around gap-2 text-lg bg-gray-100 p-3 rounded-lg py-7"
            onClick={() => {
              setIsDelivery(ENUM_YN.NO);
            }}
          >
            <SwapOutlined />
            <p>
              Pending{" "}
              <span className="ml-5 font-bold  text-2xl text-[#82866b] font-sans">
                ${pendingAmount}
              </span>
            </p>
          </Button>
        </div>
      </div>
      <p className=" text-red-100 w-full border my-6"></p>

      {/* <div>
        <Table dataSource={[]} pagination={{ pageSize: 10 }}>
          <Column
            title="Trx ID"
            dataIndex="trxId"
            key="trxId"
            className="font-sans border-none"
            fixed="left"
            width={100}
            autoFit={true}
          />
          <Column
            title="Employee ID"
            dataIndex="employeeId"
            key="employeeId"
            className="font-sans border-none"
          />
          <Column
            title="Time & Date"
            dataIndex="dateTime"
            key="dateTime"
            className="font-sans border-none"
          />

          <Column
            title="Amount"
            key="amount"
            className="border-none font-sans"
            render={(_: any, record: any) => (
              <Space size="middle" className="font-sans">
                {record.amount}
                <span className="font-sans">Cents</span>
              </Space>
            )}
          />
          <Column
            title="Status"
            key="action"
            className="font-sans border-none"
            render={(_: any, record: any) => (
              <Space size="middle">
                <Button
                  className={`font-bold border-none font-sans ${
                    record?.status === "pending"
                      ? "bg-yellow-50"
                      : "bg-gray-200"
                  } `}
                >
                  <span className="font-sans">{record.status}</span>
                </Button>
              </Space>
            )}
          />
          <Column
            title="Action"
            key="userID"
            dataIndex="userID"
            className="font-sans border-none"
            render={(_: any, record: IEmployeeTransaction) => (
              <Space size="middle">
                <Link href={` transaction/${record.employeeId}`}>
                  <IoEyeOutline className="text-xl" />
                </Link>
              </Space>
            )}
          />
        </Table>
      </div> */}
      <div>
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={allData?.data}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
