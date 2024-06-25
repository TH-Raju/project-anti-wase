"use client";

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

export default function UnitedPercentage() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const onSubmit = () => {
    console.log("radio checked", value);
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
              <span className="font-sans"> United Percentage</span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>
        <div className="w-full  lg:w-[40%]">
          <p className="mb-6 font-sans">Set United’s Percentage</p>
          <Radio.Group
            onChange={onChange}
            value={value}
            size="large"
            className="leading-9"
          >
            <Space direction="vertical">
              <Radio value="10%">
                <span className="font-sans">10%</span>
              </Radio>
              <Radio value="15%">
                <span className="font-sans">15%</span>
              </Radio>
              <Radio value="20%">
                <span className="font-sans">20%</span>
              </Radio>
            </Space>
          </Radio.Group>
          <p className="mt-3 mb-8 font-sans">
            Selecting the percent amount, you will be receiving that percent
            amount after every payment. This information is only visible to you.
          </p>
          <Button
            onClick={() => onSubmit()}
            type="primary"
            htmlType="submit"
            className="login-form-button my-0 w-full bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057]"
          >
            <span className="font-sans">Confirm</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
