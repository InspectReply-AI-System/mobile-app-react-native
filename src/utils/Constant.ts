export const length_check = /^(?=.{12,15}$)/; // 8-15 character length
export const upper_case = /(.*[A-Z].*)/;
export const lower_case = /(.*[a-z].*)/;
export const numeric_char = /(.*\d.*)/;

export const regexPhoneNo =
  /^\(?([1-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const nameRegex = /^([a-zA-Z]).{3,}$/;
export const userNameEmailRegex =
  /^(?:(?!\d)[a-zA-Z0-9._]{3,30}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const verificationCode = /^[a-zA-Z0-9]{4,}$/;

export const _specialChar = /[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]+/;
