"use client";

import { employeeTransaction } from "@/db/transaction";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function DetailTransaction({ id }: { id: string }) {
  const singleUser = employeeTransaction.find((user) => user.trxId === id);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
      <div className="h-screen relative">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href="./">
                <IoIosArrowBack className="h-9 w-10 text-gray-500" />
              </Link>
              <span className="font-sans">Transaction Details</span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>

        {singleUser?.status === "complete" && (
          <div>
            <h2 className="text-2xl my-6 text-[#82866b] font-sans">
              Employee Transaction Information
            </h2>
            <div>
              <h4 className="font-sans font-normal">
                Employee Name: {singleUser?.name}
              </h4>
              <h4 className="font-sans font-normal">
                Employee ID: {singleUser?.employeeId}
              </h4>
              <h4 className="font-sans font-normal">
                Transaction ID: {singleUser?.trxId}
              </h4>
              <h4 className="font-sans font-normal">
                Date & Time: {singleUser?.dateTime}
              </h4>
              <h4 className="font-sans font-normal">
                Amount: {singleUser?.amount} Cents
              </h4>
              <h4 className="font-sans font-normal">
                Status: {singleUser?.status}
              </h4>
            </div>
          </div>
        )}
        <h2 className="text-2xl my-6 text-[#82866b] font-sans">
          User Transaction Information
        </h2>
        <div>
          <h4 className="font-sans font-normal">
            User Name: {singleUser?.name}
          </h4>
          <h4 className="font-sans font-normal">
            User ID: {singleUser?.employeeId}
          </h4>
          <h4 className="font-sans font-normal">
            Transaction ID: {singleUser?.trxId}
          </h4>
          <h4 className="font-sans font-normal">
            Date & Time: {singleUser?.dateTime}
          </h4>
          <h4 className="font-sans font-normal">
            Amount: {singleUser?.amount} USD
          </h4>
          <h4 className="font-sans font-normal">
            Status: {singleUser?.status}
          </h4>
        </div>
        {singleUser?.status === "complete" && (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button my-0 px-10 bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057] bottom-0 mt-24"
          >
            <span className="font-sans">Download as PDF</span>
          </Button>
        )}

        {singleUser?.status === "pending" && (
          <div>
            <h2 className="text-2xl text-[#82866b] font-sans my-4">
              Send Money To The Employee
            </h2>

            <Form
              initialValues={
                singleUser.name
                  ? {
                      name: singleUser.name || "",
                      employeeId: singleUser.employeeId || "",
                    }
                  : {}
              }
              layout="horizontal"
              onFinish={onFinish}
              className="absolute"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="employeeId"
                    rules={[
                      { required: true, message: "Employee ID required!" },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      defaultValue={singleUser?.employeeId}
                      size="large"
                      placeholder="Employee ID"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Employee Name is required!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      size="large"
                      defaultValue={singleUser?.name}
                      placeholder="Employee Name "
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="account"
                    rules={[
                      {
                        required: true,
                        message: "Account Number is required!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      type="number"
                      size="large"
                      placeholder="Account Number"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="account_holder"
                    rules={[
                      { required: true, message: "Account Holder required!" },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Account Holder Name"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="received_amount"
                    rules={[
                      {
                        required: true,
                        message: "Received amount is required!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      size="large"
                      type="number"
                      placeholder="Received Amount "
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="united_fees"
                    rules={[
                      { required: true, message: "United Fee is required!" },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      size="large"
                      type="number"
                      placeholder="United Fees"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="sending_amount"
                    rules={[
                      {
                        required: true,
                        message: "Sending amount is required!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      size="large"
                      type="number"
                      placeholder="Sending Amount "
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button my-0 px-10 bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057] bottom-0 mt-10 py-6"
                >
                  Send Money
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
