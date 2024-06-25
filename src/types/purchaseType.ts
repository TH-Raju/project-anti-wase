import { I_YN } from "./globalType";
import { IShop } from "./shopType";
import { ISurpriseBag } from "./surpriseBagType";
import { IUser } from "./userTypes";

export type IPurchase = {
  //
  _id: string; 
  pi_id: string;
  ch_id: string;
  object: string;
  amount: number;
  amount_received: number;
  payment_method: string;
  created: number;
  currency: string;
  payment_intent: string;
  payment_method_types?: [string];
  
  status: "succeeded" | string;
  //
  bagId: string;
  bagDetails: ISurpriseBag;
  shopId: string;
  shopDetails?: IShop;
  userId: string;
  userDetails: IUser;
  refund?: {
    isRefund: I_YN;
    ref?: string;
    stripeRefundId?: string;
    balance_transaction?: string;
    ch_id?: string;
  };
  delivery?: {
    isDelivery: I_YN;
    ref?: string;
    deliveryManId?: string;
  };
  //

  isDelete: I_YN;
  //--- for --TrashPurchase---
  oldRecord?: {
    refId: string;
    collection?: string;
  };
  // //
  // id: string;
  // object: string;
  // amount: number;
  // amount_captured: number;
  // amount_refunded: number;
  // application: string | null;
  // application_fee: string | null;
  // application_fee_amount: number | null;
  // balance_transaction: string;
  // billing_details: {
  //   email: string | null;
  //   name: string | null;
  //   phone: string | null;
  // };
  // calculated_statement_descriptor: string;
  // captured: boolean;
  // created: number;
  // currency: string;
  // customer: string;
  // description: string;
  // //
};
