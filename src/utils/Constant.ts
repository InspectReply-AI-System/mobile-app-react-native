const length_check = /^(?=.{8,15}$)/; // 8-15 character length
const upper_case = /(.*[A-Z].*)/;
const lower_case = /(.*[a-z].*)/;
const numeric_char = /(.*\d.*)/;

export const regexPhoneNo =
  /^\(?([1-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const nameRegex = /^([a-zA-Z]).{3,}$/;
export const userNameEmailRegex =
  /^(?:(?!\d)[a-zA-Z0-9._]{3,30}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const verificationCode = /^[a-zA-Z0-9]{4,}$/;

export const _specialChar = /[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]+/;

const checklength = (char: string) => {
  return length_check.test(char);
};

const checkUpperCase = (char: string) => {
  return upper_case.test(char);
};
const checkLowerCase = (char: string) => {
  return lower_case.test(char);
};

const checkSpecialChar = (char: string) => {
  return _specialChar.test(char);
};
const checkNumeric = (char: string) => {
  return numeric_char.test(char);
};

export {
  checklength,
  checkNumeric,
  checkUpperCase,
  checkLowerCase,
  checkSpecialChar,
};
