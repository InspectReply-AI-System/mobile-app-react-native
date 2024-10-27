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
  city: Yup.object({
    _id: Yup.string().required('city id is missing'),
    name: Yup.string().required('*Please enter a city'),
  }).required('*Please enter a city'),
  state: Yup.object({
    _id: Yup.string().required('state id is missing'),
    name: Yup.string().required('*Please enter a state'),
  }).required('*Please enter a state'),
  zip: Yup.string()
    .matches(/^\d$/, CommonStrings.zipMustNumber)
    .required(CommonStrings.zipRequired),
  category: Yup.object({
    category_name: Yup.string().required('*Please enter a category'),
    _id: Yup.string().required('Category id is missing'),
  }).required('*Please enter a category'),
  website: Yup.string(),
});
