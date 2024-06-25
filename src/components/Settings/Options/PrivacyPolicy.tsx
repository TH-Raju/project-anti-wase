"use client";
import TextEditorNotSetForm from "@/components/shared/TextEditor/TextEditorNotSetForm";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import {
  useGetAllTextFiledQuery,
  useUpdateTextFiledMutation,
} from "@/redux/api/adminApi/textFields";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function PrivacyPolicy() {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [updateTextFiled, { isLoading: TextFieldsLoading }] =
    useUpdateTextFiledMutation();
  const { data, isLoading } = useGetAllTextFiledQuery({
    dataType: "privacyPolicy",
  });
  let privacyPolicyPage = data?.data[0];

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  const handleSubmit = async () => {
    let updateValue = { ...privacyPolicyPage };
    if (textEditorValue) {
      updateValue = {
        ...privacyPolicyPage,
        htmlText: JSON.stringify(textEditorValue),
      };
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(updateValue));
    try {
      const res = (await updateTextFiled({
        id: privacyPolicyPage?._id,
        data: formData,
      })) as any;
      if (res?.error || res.success === false) {
        Error_model_hook(res.error);
      } else {
        Success_model("Successfully updated");
      }
    } catch (error) {
      console.log(error);
      Error_model_hook(error);
    }
  };

  return (
    <div className="py-5 px-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <div className="">
        <div className="my-4 ">
          <h1 className="font-sans font-medium text-gray-500">
            <div className="flex gap-2">
              <Link href="/admin/settings">
                <IoIosArrowBack className="h-8 w-10 text-gray-500" />
              </Link>
              <span className="font-sans">Privacy Policy</span>
            </div>
          </h1>
          <p className=" text-red-100 w-full border mt-6"></p>
        </div>

        <TextEditorNotSetForm
          textEditorValue={textEditorValue}
          setTextEditorValue={setTextEditorValue}
          defaultTextEditorValue={privacyPolicyPage?.htmlText ? JSON.parse(privacyPolicyPage?.htmlText) : ""}
        />

        <div className="flex justify-center items-center">
          <Button
            loading={TextFieldsLoading}
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            className=" my-2  bg-[#82866b] text-white flex  items-center justify-center hover:bg-[#6c7057] bottom-0 "
          >
            <span className="font-sans">Update</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
