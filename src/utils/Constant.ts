export const regexPhoneNo =
  /^\(?([1-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/;

export const nameRegex = /^([a-zA-Z]).{3,}$/;
export const userNameEmailRegex =
  /^(?:(?!\d)[a-zA-Z0-9._]{3,30}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const verificationCode = /^([-0-9]).{3,}$/;
