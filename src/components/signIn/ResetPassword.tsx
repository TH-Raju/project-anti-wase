"use client";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function ResetPassword() {
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
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
      <div className="mb-6">
        <Link href="/verify-otp">
          <ArrowLeftOutlined />
        </Link>
        <h1 className="font-sans">Set New Password</h1>
        <p className="font-sans">
          {" "}
          A password should be more than 8 characters, including digits,
          letters, and symbols
        </p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Typography.Title level={5} className="font-sans">
          Password
        </Typography.Title>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Enter your password"
          />
        </Form.Item>
        <Typography.Title level={5}>Password</Typography.Title>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Re-enter your password"
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
            className="login-form-button w-full"
          >
            <span className="font-sans">Confirm</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
