import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";

export type ICategory = {
  title: string;
  image?: IFileAfterUpload;
  serialNumber?: number;
  //
  status: I_STATUS;
  isDelete: I_YN;
  //--- for --TrashCategory---
  oldRecord?: {
    refId: string;
    collection?: string;
  };
};
