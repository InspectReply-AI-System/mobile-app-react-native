import { useCallback, useReducer } from 'react';

const reducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

function useSimpleReducer(initialState: any, init?: any) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const updateState = useCallback(
    (payload: any) =>
      dispatch({
        type: 'update',
        payload,
      }),
    [],
  );

  return [state, updateState];
}

export default useSimpleReducer;
