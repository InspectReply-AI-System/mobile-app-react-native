export type ActionType = {
  type: string;
  payload: any;
};

export class AuthModal {
  token: string = '';
  username: string = '';
  email: string = '';
  interests: string[] = [];
  refreshToken: string = '';
  firstName: string = '';
  lastName: string = '';
  imageUrl: string = '';
  bio: string = '';
  gender: string = '';
  facebookLink: string = '';
  instagramLink: string = '';
  linkedinLink: string = '';
  userId: string = '';
}

export class ConfigModal {
  isLoading: boolean = false;
  firstOpen: boolean = true;
  welocmeScreen: boolean = false;
  snackBarMessage: string = '';
  theme: 'light' | 'dark' = 'light';
}

export type ReducersModal = {
  AuthSlice: AuthModal;
  ConfigSlice: ConfigModal;
};
