import { combineReducers } from 'redux';

import { StoreActions } from '@inspectreplyai/utils/Enums';
import ConfigSlice from './config/ConfigSlice';
import AuthSlice from './auth/AuthSlice';

const RootReducer = combineReducers({
  AuthSlice,
  ConfigSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === StoreActions.RESET_STORE) {
    let oldConfig = state.ConfigSlice;
    state = undefined;
    const res = RootReducer(state, action);
    res.ConfigSlice.firstOpen = oldConfig.tutorial;
    res.ConfigSlice.theme = oldConfig.theme;
    res.ConfigSlice.welocme = oldConfig.welocme;
    return res;
  }
  return RootReducer(state, action);
};

export default rootReducer;
