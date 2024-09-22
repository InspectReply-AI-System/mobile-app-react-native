import { CommonStrings } from '@inspectreplyai/utils';
import { emailRegex } from '@inspectreplyai/utils/Constant';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  contractorName: Yup.string().required(CommonStrings.contractorNameRequired),
  company: Yup.string().required(CommonStrings.companyRequired),
  email: Yup.string()
    .matches(emailRegex, CommonStrings.invalidEmail)
    .required(CommonStrings.emailRequired),
  phone: Yup.string()
    .matches(/^\d{10,}$/, CommonStrings.phoneNumberMustBe)
    .required(CommonStrings.phoneNumberRequired),
  address1: Yup.string().required(CommonStrings.addressRequired),
  address2: Yup.string().required(CommonStrings.addressRequired),
  city: Yup.object({
    _id: Yup.string().required('city id is missing'),
    name: Yup.string().required('city name is missing'),
  }).required('City is required'),
  state: Yup.object({
    _id: Yup.string().required('state id is missing'),
    name: Yup.string().required('state name is missing'),
  }).required('State is required'),
  zip: Yup.string().required(CommonStrings.zipRequired),
  category: Yup.object({
    category_name: Yup.string().required('Category name is missing'),
    _id: Yup.string().required('Category id is missing'),
  }).required('Category is required'),
  website: Yup.string(),
});
