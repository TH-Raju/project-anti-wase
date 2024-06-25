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
import { IoIosArrowBack } from "react-icons/io";

export default function VerifyOTP() {
  const onFinish = (values: any) => {
    const valuesArray = Object.entries(values).map(([key, value]) => value);

    console.log("Received values of form: ", valuesArray);
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] h-screen">
      <div className="my-4 ">
        <h1 className="font-sans font-medium text-gray-500">
          <div className="flex gap-2">
            <Link href="forgot-password">
              <IoIosArrowBack className="h-8 w-10 text-gray-500" />
            </Link>
            <span className="font-sans">Verify OTP</span>
          </div>
        </h1>
        <p className=" text-red-100 w-full border mt-6"></p>
      </div>
      <p className="font-sans text-lg mb-5 w-full  lg:w-[30%]">
        {" "}
        We have sent you an OTP to your email address.Please check it and place
        the otp for resetting password
      </p>
      <Form
        name="normal_login"
        className="login-form w-full  lg:w-[30%]"
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
            <Button
              className="login-form-forgot font-sans font-normal"
              type="text"
            >
              <span className="font-sans">Didn't get OTP</span>
            </Button>
            <Button className="login-form-forgot" type="text" size="large">
              <span className="font-sans">Resend</span>
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Link href="update-password">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button my-0 w-full bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057]"
            >
              <span className="font-sans">Verify</span>
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
