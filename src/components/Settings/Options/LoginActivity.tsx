"use client";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { Button, Space, Table, Tag } from "antd";
import { IloginActivity, loginActivity } from "@/db/loginActivity";

const { Column, ColumnGroup } = Table;
export default function LoginActivity() {
  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] h-screen">
      <div className="my-4">
        <h1 className="font-sans font-medium text-gray-500">
          <div className="flex gap-2">
            <Link href="/admin/settings">
              <IoIosArrowBack className="h-8 w-10 text-gray-500" />
            </Link>
            <span className=" font-sans">Login Activity</span>
          </div>
        </h1>
        <p className=" text-red-100 w-full border mt-6"></p>
      </div>
      <div>
        <Table
          dataSource={loginActivity}
          pagination={{ pageSize: 10 }}
          bordered={false}
        >
          <Column title="Browser" dataIndex="browser" key="browser" />
          <Column title="Device" dataIndex="device" key="device" />
          <Column title="Location" dataIndex="location" key="location" />
          <Column title="Location" dataIndex="location" key="location" />

          <Column
            title="Action"
            key="action"
            render={(_: any, record: IloginActivity) => (
              <Space size="middle">
                <Button danger className="bg-red-100 font-bold">
                  <span className="font-sans">Log out</span>
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
}
