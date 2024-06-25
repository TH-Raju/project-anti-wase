"use client";

import { authKey } from "@/constants/storageKey";
import { setToLocalStorage } from "@/utils/local-storage";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography, message } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useEffect, useState } from "react";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import { SubmitHandler } from "react-hook-form";
import { storeUserInfo } from "@/services/auth.service";
import { Error_model_hook } from "@/utils/modalHook";
type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const redirect = useSearchParams().get("redirectLink");
  // console.log("🚀 ~ SignIn ~ redirect:", redirect);

  const router = useRouter();
  const [userLogin, { error, isLoading }] = useUserLoginMutation();
  const [loading, setLoading] = useState(true);
  const { userInfo, userInfoLoading,setRefetch } = useGlobalContext();
  // console.log("🚀 ~ userInfo:", userInfo);

  //!----------- if user already login then auto redirect--------
  useEffect(() => {
    if (userInfo?.id) {
      message.info("You already logged in");
      router.back();
    }
    // console.log(" log");
    setLoading(false);
    return () => {};
  }, [userInfo, userInfoLoading]);
  //----------------------------------------------------------------
  if (loading || userInfoLoading) {
    return <LoadingForDataFetch />;
  }
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    // console.log("🚀 ~ constonSubmit:SubmitHandler<FormValues>= ~ data:", data);
    try {
      const res = await userLogin({ ...data }).unwrap();
      // console.log("🚀 ~ constonSubmit:SubmitHandler<FormValues>= ~ res:", res);
      if (res?.accessToken) {
        // router.push("/profile");
        setRefetch((c)=>!c)
        message.success("User logged in successfully!");
        storeUserInfo({ accessToken: res?.accessToken });
        router.push(redirect || `/`);
        // setOpen(false)
      } else {
        Error_model_hook(res?.message);
      }
    } catch (err: any) {
      Error_model_hook(err?.data || err?.message);
      console.log(err);
    }
  };
  // if(isLoading){
  //  return <LoadingForDataFetch/>
  // }
  // redux error
  if (error) {
    console.log(error);
    //@ts-ignore
    Error_model_hook(error?.message);
  }

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <div className="mb-6">
        <h1 className="font-sans">Welcome</h1>
        <p className="font-sans">Please sign in for better experience</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Typography.Title level={5}>
          <span className="font-sans">Email</span>{" "}
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
        <Typography.Title level={5}>Password</Typography.Title>
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
        <Form.Item>
          <Flex justify="space-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <span className="font-sans">Remember me</span>
              </Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" href="/forgot-password">
              <span className="font-sans">Forgot password</span>
            </Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button w-full"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
