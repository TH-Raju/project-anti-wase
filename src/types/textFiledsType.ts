import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";

export type IDataType =
  | "aboutUs"
  | "termsAndPolice"
  | "privacyPolicy"
  | "contactUs"
  | "support";
export type IAllTextFieldFilters = {
  searchTerm?: string;
  heading?: string;
  dataType?: IDataType;
  status?: I_STATUS;
  delete?: I_YN;
  isDelete?: string;
};

export type IAllTextField = {
  _id:string;
  htmlText: string;
  heading?: string;
  image?: IFileAfterUpload;
  dataType: IDataType;
  bodyData: Record<string, string>;
  //
  status: I_STATUS;
  isDelete: I_YN;
  //--- for --Trash---
  oldRecord?: {
    refId: string;
    collection?: string;
  };
};
