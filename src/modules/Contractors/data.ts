export interface BusinessCardProps {
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

import { CommonStrings } from '@inspectreplyai/utils';
import { emailRegex } from '@inspectreplyai/utils/Constant';
import * as Yup from 'yup';

export const sections: SectionData[] = [
  {
    title: 'Plumbing',
    data: [
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
    ],
  },
  {
    title: 'Roofing',
    data: [
      {
        name: 'American Roofing Company',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/roofing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
      {
        name: 'Five Star Plumbing',
        contactPerson: 'Chuck Smith',
        email: 'fivestarinfo@gmail.com',
        phone: '424-686-9831',
        address: '7112 Balboa Blvd. Van Nuys, CA 91406',
        // logo: 'https://example.com/plumbing-logo.png',
      },
    ],
  },
];

export const validationSchema = Yup.object().shape({
  company: Yup.string().required(CommonStrings.companyRequired),
  email: Yup.string()
    .matches(emailRegex, CommonStrings.invalidEmail)
    .required(CommonStrings.emailRequired),
  phone: Yup.string()
    .matches(/^\d{10,}$/, CommonStrings.phoneNumberMustBe)
    .required(CommonStrings.phoneNumberRequired),
  address1: Yup.string().required(CommonStrings.addressRequired),
  address2: Yup.string(),
  city: Yup.object().required('City is required'),
  state: Yup.object().required('State is required'),
  zip: Yup.string().required(CommonStrings.zipRequired),
  category: Yup.string().required('Category is required'),
  website: Yup.string(),
});
