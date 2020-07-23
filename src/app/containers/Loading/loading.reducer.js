// api/loadingReducer.js
export const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches =
    type.indexOf('start') > -1 ||
    type.indexOf('success') > -1 ||
    type.indexOf('error') > -1;

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;
  const key = action.type
    .replace('start', '')
    .replace('success', '')
    .replace('error', '');
  return {
    ...state,
    [key]: action.type.indexOf('start') > -1,
  };
};
