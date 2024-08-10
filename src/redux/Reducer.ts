import { combineReducers } from 'redux';
import AuthSlice from './auth/AuthSlice';
import ConfigSlice from './config/ConfigSlice';
import { StoreActions } from '@inspectreplyai/utils/Enums';

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
    return res;
  }
  return RootReducer(state, action);
};

export default rootReducer;
