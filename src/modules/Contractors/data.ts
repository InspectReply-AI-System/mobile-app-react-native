export interface BusinessCardProps {
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
  company: Yup.string().required('Company is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    )
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip: Yup.string().required('ZIP code is required'),
  category: Yup.string().required('Category is required'),
  website: Yup.string().url('Invalid URL'),
});
