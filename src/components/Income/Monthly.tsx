/* eslint-disable react/no-unescaped-entities */
"use client";

import { PiUsersThree } from "react-icons/pi";
import { IoEyeOutline } from "react-icons/io5";
import { Button, Space, Table } from "antd";
import { IAllUsers, usersData } from "@/db/AllUsers";
import { Column } from "@ant-design/plots";
import Link from "next/link";
import { IEmployeeTransaction, employeeTransaction } from "@/db/transaction";
import { MdOutlinePayment } from "react-icons/md";

export default function MonthlyIncome() {
  let totalAmount = 0;
  let pendingAmount = 0;
  let completeAmount = 0;

  employeeTransaction.forEach((transaction) => {
    const amount = parseFloat(transaction.amount);

    totalAmount += amount;
    if (transaction.status === "pending") {
      pendingAmount += amount;
    } else if (transaction.status === "complete") {
      completeAmount += amount;
    }
  });

  //   console.log("Total Amount:", totalAmount);
  //   console.log("Pending Amount:", pendingAmount);
  //   console.log("Complete Amount:", completeAmount);
  return (
    <div className="p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md h-screen">
      <div className="flex items-center justify-between">
        <h1 className="font-sans font-medium text-gray-500 ml-3 mt-2">
          Income
        </h1>
        <div className="flex gap-10 items-center">
          <Button className="flex items-center justify-around gap-2 text-lg bg-gray-100 p-3 rounded-lg py-7">
            <MdOutlinePayment />
            <p className="font-sans ">
              Monthly Income{" "}
              <span className="ml-5 font-sans font-bold  text-2xl text-[#82866b]  ">
                ${pendingAmount}
              </span>
            </p>
          </Button>
          <Button className="flex items-center justify-around gap-2 text-lg bg-gray-100 p-3 rounded-lg py-7">
            <MdOutlinePayment />
            <p className="font-sans ">
              Total Income{" "}
              <span className="ml-5 font-sans font-bold  text-2xl text-[#82866b]  ">
                ${totalAmount}
              </span>
            </p>
          </Button>
        </div>
      </div>
      <p className=" text-red-100 w-full border my-6"></p>

      <div>
        <Table dataSource={employeeTransaction} pagination={{ pageSize: 10 }}>
          <Column
            title="Months"
            dataIndex="trxId"
            key="trxId"
            className="font-sans border-none"
            fixed="left"
            width={100}
            autoFit={true}
          />
          <Column
            title="Total Users "
            dataIndex="employeeId"
            key="employeeId"
            className="font-sans border-none"
          />
          <Column
            title="Amount"
            dataIndex="amount"
            key="amount"
            className="font-sans border-none"
          />

          <Column
            title="Action"
            key="userID"
            dataIndex="userID"
            className="font-sans border-none"
            render={(_: any, record: IEmployeeTransaction) => (
              <Space size="middle">
                <Link href={`monthly/${record.employeeId}`}>
                  <IoEyeOutline className="text-xl" />
                </Link>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}
