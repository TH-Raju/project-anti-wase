"use client";
import React, { useState } from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import FormSearchSelectField from "../FormSearchSelectField";
import { Select } from "antd";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

export default function SelectDynamicCategory({
  defaultData,
  disable = false,
  setValue,
  value,
  isLoading,
  defaultLabelText,
}: {
  defaultData?: any;
  disable?: boolean;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  value: any;
  isLoading?: boolean;
  defaultLabelText: string;
}) {
  //! Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {};

  //! console.log(categoryData)
  const CategoryOptions = value?.map((item: any) => {
    return {
      label: item?.label,
      value: item?.value,
    };
  });

  return (
    <div>
      {/* {defaultLabelText && <LabelUi>{defaultLabelText}</LabelUi>} */}
      <Select
        size="large"
        // onChange={handleChange ? handleChange : onChange}
        onChange={(val) => {
          setValue(val);
        }}
        
        disabled={disable}
        // defaultActiveFirstOption
        defaultValue={{ label: defaultLabelText, value: "" }}
        options={CategoryOptions}
        style={{ width: "150px" }}
        showSearch
        onSearch={onSearch}
        filterOption={filterOption}
        optionFilterProp="children"
        loading={isLoading}
        allowClear
        // placeholder={placeholder}
      />
    </div>
  );
}
