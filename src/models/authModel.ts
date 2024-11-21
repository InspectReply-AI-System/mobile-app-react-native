export type ActionType = {
  type: string;
  payload: any;
};

export class AuthModel {
  token: string = '';
  email: string = '';
  fcmToken: string = '';
  refreshToken: string = '';
  firstName: string = '';
  lastName: string = '';
  userId: string = '';
  base_url?: string = '';
  profilePhoto: string | undefined = '';
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
