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
