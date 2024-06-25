import { ICategory } from "./categoryType";
import { IFileAfterUpload, I_STATUS, I_YN } from "./globalType";
import { IUser } from "./userTypes";

export type IDayOfWeek =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export enum ENUM_DAYS_OF_WEEK {
  SATURDAY = "saturday",
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
}

export type IShop = {
  _id: string;
  userId: string;
  userDetails: IUser;
  name: string;
  categoryId: string;
  categoryDetails: ICategory;
  weekend: IDayOfWeek[];
  openingHours: string;
  images: IFileAfterUpload[];
  documents?: IFileAfterUpload[];
  address: string;
  totalRatings: number;
  location?: {
    link?: string;
    latitude?: number;
    longitude?: number;
    //
    coordinates: number[]; // first -> longitude,latitude
    //  type: string | 'Point';
  };
  shopReviews?: {
    _id: string;
    averageRating: number;
  };
  status: I_STATUS;
  isDelete: I_YN;
  about: string;
  serialNumber: number;
};
