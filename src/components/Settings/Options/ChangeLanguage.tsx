"use client";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Space,
  Typography,
} from "antd";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import type { RadioChangeEvent } from "antd";

export default function ChangeLanguage() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <div className="h-screen">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href="/admin/settings">
                <IoIosArrowBack className="h-9 w-10 text-gray-500" />
              </Link>
              <span className="font-sans"> Change Language</span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>
        <div>
          <Radio.Group
            onChange={onChange}
            value={value}
            size="large"
            className="leading-9"
          >
            <Space direction="vertical">
              <Radio value="English">
                <span className="font-sans">English</span>
              </Radio>
              <Radio value="French">
                <span className="font-sans">French</span>
              </Radio>
              <Radio value="Chinese">
                <span className="font-sans">Chinese</span>
              </Radio>
              <Radio value="Japanese">
                <span className="font-sans">Japanese</span>
              </Radio>
              <Radio value="Korean">
                <span className="font-sans">Korean</span>
              </Radio>
              <Radio value="German">
                <span className="font-sans">German</span>
              </Radio>
              <Radio value="Arabic">
                <span className="font-sans">Arabic</span>
              </Radio>
              <Radio value="Spanish">
                <span className="font-sans">Spanish</span>
              </Radio>
              <Radio value="Bangla">
                <span className="font-sans">Bangla</span>
              </Radio>
              <Radio value="Hindi">
                <span className="font-sans">Hindi</span>
              </Radio>
              <Radio value="Dutch">
                <span className="font-sans">Dutch</span>
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}
