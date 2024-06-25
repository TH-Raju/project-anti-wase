import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";
import { ISurpriseBag } from "./surpriseBagType";
import { IUser } from "./userTypes";

export type IShopReview = {
  _id: string;
  userId: string;
  userDetails?: IUser;
  shopId: string;
  surpriseBagId: string;
  surpriseDetails?: ISurpriseBag;
  reviewText?: string;
  rating: number;
  images: IFileAfterUpload[];
  //
  status: I_STATUS;
  isDelete: I_YN;

  //--- for --TrashCategory---
  createdAt: string;
  updatedAt: string;
  oldRecord?: {
    refId: string;
    collection?: string;
  };
};
