interface conractorData {
  category_name: string;
  city_name: string;
  company_name: string;
  contractor_name: string;
  customer_email: string;
  email: string;
  phone: string;
  profilePhoto: string;
  state_name: string;
  zip_code: string;
}
export interface ContractorState {
  error: string;
  loading: boolean;
  states: Array<{
    abbreviation: string;
    capital: string;
    name: string;
    _id: string;
  }>;
  category: Array<{ _id: string; category_name: string }>;
  contractors: Array<{ title: string; data: Array<conractorData> }>;
}
