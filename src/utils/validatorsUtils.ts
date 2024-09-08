import {
  regexPhoneNo,
  userNameEmailRegex,
  passwordRegex,
  emailRegex,
  nameRegex,
  verificationCode,
} from './Constant';
import { InputFieldType } from './Enums';
import { CommonStrings } from './stringsUtils';

const mobileNumberValidation = (val: string) => {
  if (val.length === 0) {
    return { error: true, errorMsg: CommonStrings.pleaseEnterMobile };
  } else if (!regexPhoneNo.test(val)) {
    return { error: true, errorMsg: CommonStrings.pleaseEnterValidMobile };
  } else if (regexPhoneNo.test(val)) {
    return { error: false, errorMsg: '' };
  } else {
    return { error: false, errorMsg: '' };
  }
};

const userNameEmailValidation = (val: string) => {
  if (val.length === 0) {
    return { error: true, errorMsg: CommonStrings.pleaseEnterUserNameEmail };
  } else if (!userNameEmailRegex.test(val)) {
    return { error: true, errorMsg: CommonStrings.pleaseEnterValidCred };
  } else if (userNameEmailRegex.test(val)) {
    return { error: false, errorMsg: '' };
  } else {
    return { error: false, errorMsg: '' };
  }
};

const passwordValidation = (val: string, customError?: string) => {
  if (val.length === 0) {
    return {
      error: true,
      errorMsg: customError || CommonStrings.pleaseEnterPassword,
    };
  } else if (!passwordRegex.test(val)) {
    return {
      error: true,
      errorMsg: customError || CommonStrings.pleaseEnterValidPassword,
    };
  } else if (passwordRegex.test(val)) {
    return { error: false, errorMsg: '' };
  } else {
    return { error: false, errorMsg: '' };
  }
};
const emailValidation = (val: string, customError?: string) => {
  if (val.length === 0) {
    return {
      error: true,
      errorMsg: customError || CommonStrings.pleaseEnterEmail,
    };
  } else if (!emailRegex.test(val)) {
    return {
      error: true,
      errorMsg: customError || CommonStrings.pleaseEnterValidEmail,
    };
  } else if (emailRegex.test(val)) {
    return { error: false, errorMsg: '' };
  } else {
    return { error: false, errorMsg: '' };
  }
};

const nameValidation = (name: string, type: InputFieldType) => {
  if (name.length === 0) {
    return {
      error: true,
      errorMsg:
        type == InputFieldType.FIRSTNAME
          ? CommonStrings.pleaseEnterFirstName
          : CommonStrings.pleaseEnterLastName,
    };
  } else if (!nameRegex.test(name)) {
    return {
      error: true,
      errorMsg:
        type == InputFieldType.FIRSTNAME
          ? CommonStrings.pleaseEnterValidFirstName
          : CommonStrings.pleaseEnterValidLastName,
    };
  } else if (nameRegex.test(name)) {
    return { error: false, errorMsg: '' };
  } else {
    return { error: false, errorMsg: '' };
  }
};

const verificationCodeValidation = (code: string) => {
  if (code.length === 0) {
    return {
      error: true,
      errorMsg: CommonStrings.enterVerificationCodeToReset,
    };
  } else if (!verificationCode.test(code)) {
    return { error: true, errorMsg: CommonStrings.codeIsInvalid };
  } else if (verificationCode.test(code)) {
    return { error: false, errorMsg: '' };
  } else {
    return { error: false, errorMsg: '' };
  }
};
export {
  emailValidation,
  passwordValidation,
  mobileNumberValidation,
  userNameEmailValidation,
  nameValidation,
  verificationCodeValidation,
};
