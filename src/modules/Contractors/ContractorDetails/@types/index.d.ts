export interface CategoryListProps {
  onSelectCategory: (category: { category_name: string; _id: string }) => void;
}
export interface Categories {
  item: { category_name: string; _id: string };
}

export interface CityListProps {
  sateData: { name: string; _id: string; abbreviation: string };
  onSelectCity: (city: { name: string; _id: string }) => void;
}

export interface States {
  item: { name: string; _id: string };
}

type RouteParams = {
  params: {
    isNew: boolean;
    id: string;
  };
};

type FormValues = {
  contractorName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address1: string | undefined;
  address2: string | undefined;
  state: any;
  zip: string | undefined;
  category: any;
  website: string | undefined;
  company: string | undefined;
  city: any;
};

interface bottomSheetProps {
  openSheet: () => void;
  closeSheet: () => void;
}

interface StateSelect {
  name: string;
  _id: string;
  abbreviation: string;
}
interface SelectCity {
  name: string;
  _id: string;
}

export interface BusinessCardProps {
  profilePhoto: string | undefined;
  city_name: string;
  state_name: string;
  zip_code: string;
  company_name: string;
  contractor_name: string;
  _id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
}

export interface SectionData {
  title: string;
  data: BusinessCardProps[];
}
