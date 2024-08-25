export type ActionType = {
  type: string;
  payload: any;
};

export class AuthModel {
  user: {
    token: string;
    email: string;
    refreshToken: string;
    firstName: string;
    lastName: string;
    userId: string;
  };

  loading: boolean;
  error: string;

  constructor() {
    this.user = {
      token: '',
      email: '',
      refreshToken: '',
      firstName: '',
      lastName: '',
      userId: '',
    };
    this.loading = false;
    this.error = '';
  }
}

export class ConfigModal {
  isLoading: boolean = false;
  firstOpen: boolean = true;
  welocmeScreen: boolean = false;
  snackBarMessage: string = '';
  theme: 'light' | 'dark' = 'light';
}

export type ReducersModal = {
  AuthSlice: AuthModel;
  ConfigSlice: ConfigModal;
};
