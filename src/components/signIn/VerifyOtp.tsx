/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  LockOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Typography,
} from "antd";
import Link from "next/link";

export default function VerifyOtp() {
  const onFinish = (values: any) => {
    const valuesArray = Object.entries(values).map(([key, value]) => value);

    console.log("Received values of form: ", valuesArray);
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
      <div className="mb-6">
        <Link href="/forgot-password">
          <ArrowLeftOutlined />
        </Link>
        <h1 className="font-sans">Verify OTP</h1>
        <p className="font-sans">
          {" "}
          We have sent you an OTP to your email address.Please check it and
          place the otp for resetting password
        </p>
      </div>
      <Form
        name="normal_login"
        className="login-form "
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Flex gap="small" justify="center">
          <Form.Item
            name="1"
            rules={[{ required: true, message: "Enter OTP" }]}
          >
            <InputNumber
              min={1}
              max={9}
              size="large"
              style={{ width: "50px", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="2"
            rules={[{ required: true, message: "Enter OTP" }]}
          >
            <InputNumber
              size="large"
              min={1}
              max={9}
              style={{ width: "50px", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="3"
            rules={[{ required: true, message: "Enter OTP" }]}
          >
            <InputNumber
              size="large"
              min={1}
              max={9}
              style={{ width: "50px", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="4"
            rules={[{ required: true, message: "Enter OTP" }]}
          >
            <InputNumber
              size="large"
              min={1}
              max={9}
              style={{ width: "50px", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="5"
            rules={[{ required: true, message: "Enter OTP" }]}
          >
            <InputNumber
              size="large"
              min={1}
              max={9}
              style={{ width: "50px", height: "50px" }}
            />
          </Form.Item>
          <Form.Item
            name="6"
            rules={[{ required: true, message: "Enter OTP" }]}
          >
            <InputNumber
              size="large"
              min={1}
              max={9}
              style={{ width: "50px", height: "50px" }}
            />
          </Form.Item>
        </Flex>

        <Form.Item>
          <Flex justify="space-between">
            <Button className="login-form-forgot" type="text">
              <span className="font-sans">Didn't get OTP</span>
            </Button>
            <Button className="login-form-forgot" type="text" size="large">
              <span className="font-sans">Resend</span>
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full"
          >
            <span className="font-sans">Verify</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
