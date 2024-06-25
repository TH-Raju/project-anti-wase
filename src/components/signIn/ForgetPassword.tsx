"use client";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";

export default function ForgotPassword() {
  
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
      <div className="mb-6 ">
        <Link href="/sign-in">
          <ArrowLeftOutlined />
        </Link>
        <h1 className="font-sans">Email</h1>
        <p className="font-sans">
          {" "}
          Enter your email address to ger a verification code for resetting your
          password.{" "}
        </p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Typography.Title level={5} className="font-sans">
          Email{" "}
        </Typography.Title>
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full"
          >
            <span className="font-sans">Get OTP</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
