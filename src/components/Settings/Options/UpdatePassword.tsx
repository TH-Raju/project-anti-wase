"use client";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function UpdatePassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState(false);
  const onFinish = (values: any) => {
    if (values.password !== values.confirmPassword) {
      setPasswordMatched(true);
      return false;
    }
    setPasswordMatched(false);
    console.log("Received values of form: ", values);
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <div className="h-screen">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href="verify-otp">
                <IoIosArrowBack className="h-8 w-10 text-gray-500" />
              </Link>
              <span className="font-sans"> Update Password</span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>
        <Form
          name="normal_login"
          className="login-form w-full  lg:w-[30%]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Typography.Title level={5}>Password</Typography.Title>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your new Password!" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Enter your new password"
            />
          </Form.Item>
          <Typography.Title level={5}>Password</Typography.Title>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input your new Password!" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Re-enter new password"
            />
          </Form.Item>

          {passwordMatched && (
            <Alert
              message="Password not matched!"
              type="error"
              showIcon
              className="my-4"
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button my-0 w-full bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057]"
            >
              <span className="font-sans">Confirm</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
