// api/loadingReducer.js
export const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches =
    type.toLowerCase().indexOf('start') > -1 ||
    type.toLowerCase().indexOf('success') > -1 ||
    type.toLowerCase().indexOf('error') > -1;

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;
  const key = action.type
    .toLowerCase()
    .replace('start', '')
    .replace('success', '')
    .replace('error', '');
  return {
    ...state,
    [key]: action.type.toLowerCase().indexOf('start') > -1,
  };
};
