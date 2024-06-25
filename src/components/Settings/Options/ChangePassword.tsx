"use client";
import { useChangePasswordMutation } from "@/redux/api/auth/authApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passwordMatched, setPasswordMatched] = useState(false);
  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    if (values.password !== values.confirmPassword) {
      setPasswordMatched(true);
      return false;
    }
    setPasswordMatched(false);

   try {
    const res = (await changePassword({
      oldPassword: values.currentPassword,
      newPassword: values.password,
    })) as any
    console.log("🚀 ~ onFinish ~ res:", res);

    if (res?.error || res?.success === false) {
      Error_model_hook(res?.error || res);
    } else {
      Success_model("Successfully changed password");
    }
   } catch (error) {
    Error_model_hook(error);
   }
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <div className="h-screen">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href="/admin/settings">
                <IoIosArrowBack className="h-8 w-10 text-gray-500" />
              </Link>
              <span className="font-sans"> Change Password</span>
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
          <Typography.Title level={5}>Old password</Typography.Title>
          <Form.Item
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your Current Password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Enter your current password"
            />
          </Form.Item>
          <Typography.Title level={5}>New Password</Typography.Title>
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
          <Typography.Title level={5}>Confirm Password</Typography.Title>
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
          <Form.Item>
            <Link
              className="login-form-forgot font-sans font-bold text-2xl text-gray-500"
              href="forgot-password"
            >
              Forgot password
            </Link>
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
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
