import { I_STATUS, I_YN } from "./globalType";
import { IShop } from "./shopType";
import { IUser } from "./userTypes";


type Address = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
}

type SupportAddress = object & Address

type Person = {
  id: string;
  object: string;
  account: string;
  address: Address;
  created: number;
  dob: {
      day: number;
      month: number;
      year: number;
  };
  email: string;
  first_name: string;
  future_requirements: {
      alternatives: any[];
      currently_due: any[];
      errors: any[];
      eventually_due: any[];
      past_due: any[];
      pending_verification: any[];
  };
  last_name: string;
  metadata: Record<string, any>;
  phone: string;
  relationship: {
      director: boolean;
      executive: boolean;
      legal_guardian: boolean;
      owner: boolean;
      percent_ownership: number | null;
      representative: boolean;
      title: string | null;
  };
  requirements: {
      alternatives: any[];
      currently_due: any[];
      errors: any[];
      eventually_due: any[];
      past_due: any[];
      pending_verification: any[];
  };
  verification: {
      additional_document: {
          back: string | null;
          details: string | null;
          details_code: string | null;
          front: string | null;
      };
      details: string | null;
      details_code: string | null;
      document: {
          back: string | null;
          details: string | null;
          details_code: string | null;
          front: string | null;
      };
      status: string;
  };
}

type BankAccount = {
  id: string;
  object: string;
  account: string;
  account_holder_name: string;
  account_holder_type: string;
  account_type: string | null;
  available_payout_methods: string[];
  bank_name: string;
  country: string;
  currency: string;
  default_for_currency: boolean;
  fingerprint: string;
  future_requirements: {
      currently_due: any[];
      errors: any[];
      past_due: any[];
      pending_verification: any[];
  };
  last4: string;
  metadata: Record<string, any>;
  requirements: {
      currently_due: any[];
      errors: any[];
      past_due: any[];
      pending_verification: any[];
  };
  routing_number: string;
  status: string;
}

type ExternalAccounts = {
  object: string;
  data: BankAccount[];
  has_more: boolean;
  total_count: number;
  url: string;
}

type Company = {
  address: Address;
  directors_provided: boolean;
  executives_provided: boolean;
  name: string | null;
  owners_provided: boolean;
  phone: string;
  tax_id_provided: boolean;
  verification: {
      document: {
          back: string | null;
          details: string | null;
          details_code: string | null;
          front: string | null;
      };
  };
}

type BusinessProfile = {
  annual_revenue: number | null;
  estimated_worker_count: number | null;
  mcc: string;
  name: string | null;
  product_description: string;
  support_address: SupportAddress;
  support_email: string | null;
  support_phone: string | null;
  support_url: string | null;
  url: string | null;
}

type Capabilities = {
  card_payments: string;
  transfers: string;
}

type FutureRequirements = {
  alternatives: any[];
  current_deadline: number | null;
  currently_due: any[];
  disabled_reason: string | null;
  errors: any[];
  eventually_due: any[];
  past_due: any[];
  pending_verification: any[];
}

// type Settings = {
//   bacs_debit_payments: {
//       display_name: string | null;
//       service_user_number: string | null;
//   };
//   branding: {
//       icon: string | null;
//       logo: string | null;
//       primary_color: string | null;
//       secondary_color: string | null;
//   };
//   card_issuing: {
//       tos_acceptance: {
//           date: number | null;
//           ip: string | null;
//       };
//   };
//   card_payments: {
//       decline_on: {
//           avs_failure: boolean;
//           cvc_failure: boolean;
//       };
//       statement_descriptor_prefix: string | null;
//       statement_descriptor_prefix_kana: string | null;
//       statement_descriptor_prefix_kanji: string | null;
//   };
//   dashboard: {
//       display_name: string | null;
//       timezone: string;
//   };
//   invoices: {
//       default_account_tax_ids: string[] | null;
//   };
//   payments: {
//       statement_descriptor: string | null;
//       statement_descriptor_kana: string | null;
//       statement_descriptor_kanji: string | null;
//   };
//   payouts: {
//       debit_negative_balances: boolean;
//       schedule: {
//           delay_days: number;
//           interval: string;
//       };
//       statement_descriptor: string | null;
//   };
//   sepa_debit_payments: Record<string, any>;
// }

type TosAcceptance = {
  date: number;
  ip: string;
  user_agent: string;
}

export type IStripeConnectAccount = {
  id: string;
  userId: string | IUser
  shopId?:  string | IShop;
  object: string;
  business_profile: BusinessProfile;
  business_type: string;
  capabilities: Capabilities;
  charges_enabled: boolean;
  company: Company;
  country: string;
  created: number;
  default_currency: string;
  details_submitted: boolean;
  email: string;
  external_accounts: ExternalAccounts;
  future_requirements: FutureRequirements;
  individual: Person;
  metadata: Record<string, any>;
  payouts_enabled: boolean;
  requirements: FutureRequirements;
  // settings: Settings;
  tos_acceptance: TosAcceptance;
  type: string;
  //
  status: I_STATUS;
  isDelete: I_YN;
  //--- for --TrashStripeConnectAccount---
  oldRecord?: {
    refId: string;
    collection?: string;
  };
}




