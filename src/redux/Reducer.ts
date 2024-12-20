import { combineReducers } from 'redux';

import { StoreActions } from '@inspectreplyai/utils/Enums';
import ConfigSlice from './config/ConfigSlice';
import AuthSlice from './auth/AuthSlice';
import contractorSlice from './contractor/contractorSlice';
import reportsSlice from './reports/ReportSlice';

const RootReducer = combineReducers({
  AuthSlice,
  ConfigSlice,
  contractorSlice,
  reportsSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === StoreActions.RESET_STORE) {
    const oldConfig = state.ConfigSlice;
    state = undefined;
    const res = RootReducer(state, action);
    res.ConfigSlice.firstOpen = oldConfig.firstOpen;
    res.ConfigSlice.theme = oldConfig.theme;
    res.ConfigSlice.welocmeScreen = oldConfig.welocmeScreen;
    return res;
  }
  return RootReducer(state, action);
};

export default rootReducer;
