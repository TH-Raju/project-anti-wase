import { ICategory } from "./categoryType";
import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";
import { IPurchase } from "./purchaseType";
import { IShop } from "./shopType";
import { IUser } from "./userTypes";

export type I_SURPRISE_BAG_ORDER_STATUS = "available" | "reserved" | "expired";
export type I_SURPRISE_BAG_FOOD_CATEGORY = "breakfast" | "launch" | "dinner";

export enum ENUM_SURPRISE_BAG_ORDER_STATUS {
  AVAILABLE = "available",
  RESERVED = "reserved",
  EXPIRED = "expired",
}

export enum ENUM_SURPRISE_BAG_FOOD_CATEGORY {
  BREAKFAST = "breakfast",
  LAUNCH = "launch",
  DINNER = "dinner",
}

export type ISurpriseBag = {
  _id:string;
  shopId: string;
  shopDetails?: IShop;
  shopCategoryId?: string;
  shopCategoryDetails?: ICategory;
  userId: string;
  userDetails?: IUser;
  image: IFileAfterUpload;
  name: string;
  bagNo: string;
  validation: string[];
  pickUpHour: string[];
  pricing: { amount: number; currency?: string };
  deliveryCharge?: { amount: number; currency?: string };
  description?: string;
  foodCategory: I_SURPRISE_BAG_FOOD_CATEGORY;
  orderStatus: I_SURPRISE_BAG_ORDER_STATUS;
  orderDetails?:IPurchase,
  qrCode: Record<string, unknown>;
  status: I_STATUS;
  isDelete: I_YN;
};
