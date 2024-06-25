/* eslint-disable react/no-unescaped-entities */
"use client";
import { Col, Row, Typography } from "antd";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio } from "antd";
import Dragger from "antd/es/upload/Dragger";

export default function Kyc() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="p-5 bg-white rounded-lg font-sans">
      <h1 className="font-sans">KYC</h1>
      <hr className="my-4" />
      <h2 className="text-3xl text-gray-400 mb-4 font-sans">Employee KYC</h2>
      <Form layout="horizontal" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Typography.Title level={5}>Shop Name </Typography.Title>
            <Form.Item
              name="shop_name"
              rules={[{ required: true, message: "Shop name is required!" }]}
            >
              <Input
                style={{ width: "100%" }}
                size="large"
                placeholder="Enter your shop name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Typography.Title level={5}>Shop Opening Hour </Typography.Title>
            <Form.Item
              name="shop_open_hour"
              rules={[
                { required: true, message: "Shop Opening Hour is required!" },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                size="large"
                placeholder="Enter your Shop Opening Hour"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Typography.Title level={5}>Shop Weekend </Typography.Title>
            <Form.Item
              name="shop_weekend"
              rules={[{ required: true, message: "Shop weekend is required!" }]}
            >
              <Input
                style={{ width: "100%" }}
                size="large"
                placeholder="Enter your shop weekend"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Typography.Title level={5}>Shop Address </Typography.Title>
            <Form.Item
              name="shop_address"
              rules={[{ required: true, message: "Shop address is required!" }]}
            >
              <Input
                style={{ width: "100%" }}
                size="large"
                placeholder="Enter your shop address"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Typography.Title level={5}>About Shop </Typography.Title>
            <Form.Item
              name="about_shop"
              rules={[{ required: true, message: "About shop is required!" }]}
            >
              <Input
                style={{ width: "100%" }}
                size="large"
                placeholder="About your shop "
              />
            </Form.Item>
          </Col>
        </Row>

        <Typography.Title level={5}>Shop Category </Typography.Title>
        <Form.Item name="shop_category">
          <Radio.Group>
            <Radio value="Cafe">Cafe</Radio>
            <Radio value="Restaurant">Restaurant</Radio>
            <Radio value="Bakery">Bakery</Radio>
            <Radio value="Department Store">Department Store</Radio>
            <Radio value="Convenience Store">Convenience Store</Radio>
          </Radio.Group>
        </Form.Item>
        <Typography.Title level={5}>Food Category </Typography.Title>
        <Form.Item name="food_category">
          <Radio.Group>
            <Radio value="Breakfast">Breakfast</Radio>
            <Radio value="Lunch">Lunch</Radio>
            <Radio value="Dinner">Dinner</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="shop_pdf">
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>

            <p className="ant-upload-text">Upload your shop's pdf document</p>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button bg-[#82866b] text-white hover:bg-[#6c7057] w-full font-sans"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
