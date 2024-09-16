export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface RegisterUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status: number;
}

export interface getProfilePayload {
  customerId: string;
}

export interface updateProfilePayload {
  payload: {
    cust_id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: number;
  };
  customerId: string;
  successCallBack: (args) => void;
  errorCallBack: (args) => void;
}

export interface setProfileImagePayload {
  profilePayload: { profilePhoto: string; cust_id: string };
  customerId: string;
}
