import notification from 'antd/es/notification';
import produce from 'immer';

const MODULE_STATE_NAME = 'yoctoErp__app_notification';

const NOTIFICAION_TYPE = {
  success: 'success',
  info: 'success',
  warning: 'warning',
  error: 'error',
};

const openNotification = (type = NOTIFICAION_TYPE.info, options = {}) => {
  if (!NOTIFICAION_TYPE[type]) {
    return;
  }
  notification[type]({
    message: options.title || 'Notification',
    description: options.message,
  });
};

export const actionTypes = {
  show: `${MODULE_STATE_NAME}.show`,
};

export const initialState = {
  notification: {},
};

export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.show:
        draft.notification = action.payload;
        action.payload &&
          openNotification(action.payload.type, action.payload.options);
        break;
      default:
        break;
    }
  });

export const showNotification = (type, options) => ({
  type: actionTypes.show,
  payload: { type, options },
});
