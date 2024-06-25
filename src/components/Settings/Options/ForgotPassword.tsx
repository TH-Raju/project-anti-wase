"use client";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";


export default function ForgotPassword() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] h-screen">
      <div className="my-4">
        <h1 className="font-sans font-medium text-gray-500">
          <div className="flex gap-2">
            <Link href="change-password">
              <IoIosArrowBack className="h-8 w-10 text-gray-500" />
            </Link>
            <span className="font-sans">Forget Password</span>
          </div>
        </h1>
        <p className=" text-red-100 w-full border mt-6"></p>
      </div>
      <p className="font-sans text-lg mb-5 w-[30%]">
        {" "}
        Enter your email address to ger a verification code for resetting your
        password.{" "}
      </p>
      <Form
        name="normal_login"
        className="login-form w-full  lg:w-[30%]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Typography.Title level={5}>Email </Typography.Title>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item>
          <Link href="verify-otp">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button my-0 w-full bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057]"
            >
              Get OTP
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
