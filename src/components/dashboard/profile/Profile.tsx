"use client";
import { Button, Form, Input, Typography, Upload } from "antd";
import React, { useState } from "react";
import { EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import { AllImage } from "@/assets/AllImge";
import { userData } from "@/db/user";
import { useGetProfileQuery } from "@/redux/api/auth/authApi";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { imageLinkGeneratorByObject } from "@/components/Utlis/ImageLinkGenerator";
import { useUpdateUserMutation } from "@/redux/api/adminApi/usersApi";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
import AntUploadImage from "@/components/Forms/AntImageUploader";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

export default function Profile() {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { userInfo, userInfoLoading } = useGlobalContext();
  const [updateUser, { isLoading: userUpdateLoading }] =
    useUpdateUserMutation();

  const [file, setFileList] = useState<any>();
  const { data, isLoading } = useGetProfileQuery({});

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("data", JSON.stringify(values));
    try {
      const res = await updateUser({
        id: userInfo?.id,
        data: formData,
      }).unwrap();
      Success_model("Successfully updated profile");
    } catch (error) {
      Error_model_hook(error);
      console.log(error);
    }
  };

  if (isLoading || userInfoLoading) {
    return <LoadingSkeleton />;
  }
  const user = data?.data;
  if (!user) {
    return <>User not found</>;
  }
  return (
    <div className="py-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]  bg-white rounded-md  px-7 relative">
      <div className="my-4 ">
        <h1 className="font-sans font-medium text-gray-500 ml-2">
          {isReadOnly ? (
            "Profile"
          ) : (
            <div className="flex gap-2">
              <ArrowLeftOutlined onClick={() => setIsReadOnly(!isReadOnly)} />{" "}
              <span> Update Profile</span>
            </div>
          )}
        </h1>
        <p className=" text-red-100 w-full border mt-6"></p>
      </div>

      <Form
        name="normal_login"
        className="login-form "
        initialValues={{
          fullName: user.fullName || "",
          email: user.email || "",
          profileImage: imageLinkGeneratorByObject(user.profileImage) || "",
          number: user.phoneNumber || "",
          dob:
            (user.dateOfBirth &&
              new Date(user.dateOfBirth).toLocaleDateString()) ||
            "",
          address: user.address || "",
        }}
        onFinish={onFinish}
      >
        {/* {isReadOnly && (
          <Image
            src={imageLinkGeneratorByObject(user.profileImage)}
            alt="user"
            height={150}
            width={150}
            className="relative overflow-hidden"
          />
        )} */}
        <AntUploadImage
          defaultImage={imageLinkGeneratorByObject(user.profileImage) as string}
          setImage={setFileList}
        />

        <Typography.Title level={5}>Name </Typography.Title>
        <Form.Item name="fullName">
          <Input size="large" type="text" readOnly={isReadOnly} />
        </Form.Item>

        <Typography.Title level={5}>Email </Typography.Title>
        <Form.Item name="email">
          <Input size="large" type="text" readOnly={isReadOnly} />
        </Form.Item>

        <Typography.Title level={5}>Number </Typography.Title>
        <Form.Item name="number">
          <Input size="large" type="text" readOnly={isReadOnly} />
        </Form.Item>

        <Typography.Title level={5}>Date of Birth </Typography.Title>
        <Form.Item name="dob">
          <Input size="large" type="text" readOnly={isReadOnly} />
        </Form.Item>

        <Typography.Title level={5}>Address </Typography.Title>
        <Form.Item name="address">
          <Input size="large" type="text" readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item>
          {isReadOnly ? (
            <Button
              className=" my-0 w-full bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057] "
              onClick={() => setIsReadOnly(!isReadOnly)}
            >
              <div className="flex gap-2">
                <EditOutlined />
                Edit Profile
              </div>
            </Button>
          ) : (
            <Button
              htmlType="submit"
              loading={userUpdateLoading}
              className=" login-form-button my-0 w-full bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057] "
            >
              Update
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
