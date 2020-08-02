// import MockAdapter from 'axios-mock-adapter';
// import axios from 'axios';
import { MODULE_STATE_NAME } from '../app/modules/auth/pages/reducer';
import {
  NOTIFICATION_TYPE,
  showNotification,
} from '../app/containers/Notification/notification.duck';
// eslint-disable-next-line no-unused-vars

export default function setupAxios(axios, store) {
  console.log('Setup Axios');
  axios.interceptors.request.use(config => {
    const { [MODULE_STATE_NAME]: authState } = store.getState();

    if (authState && authState.token) {
      config.headers.Authorization = `Bearer ${authState.token}`;
    }
    return config;
  });
  axios.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
    },
    function(error) {
      let errorData = [];
      if (error) {
        const { response } = error;
        errorData = response.data || [];
        if (response.status === 403) {
          console.log(response.statusText);
          store.dispatch(
            showNotification(NOTIFICATION_TYPE.error, {
              title: 'Owwww',
              message: response.statusText,
            }),
          );
        } else if (response.status === 401) {
          console.log('Redirect to Auth');
        } else if (response.status === 400) {
          errorData = response.data;
        } else {
          console.log(response.statusText);
          store.dispatch(
            showNotification(NOTIFICATION_TYPE.error, {
              title: 'SERVER GOT ERROR',
              message: response.statusText,
            }),
          );
        }
      }

      return Promise.reject(errorData);
    },
  );
}

// // This sets the mock adapter on the default instance
// const mock = new MockAdapter(axios);
//
// // Mock any GET request to /users
// // arguments for reply are (status, data, headers)
// mock.onGet('/api/warehouses').reply(200, {
//   results: [
//     {
//       id: 1,
//       name: 'John Smith',
//       product: 'product',
//       unitName: 'unitName',
//       lastUpdatedDate: '2020-12-09',
//     },
//   ],
//   quantity: 1,
// });
//
// mock.onPost('/api/sign-in').reply(200, {
//   token: 'kasdhkhsdkh',
//   user: {
//     name: 'admin',
//     email: 'admin@admin.com',
//   },
// });
//
// mock.onGet('/api/warehouses/1').reply(200, {
//   id: 1,
//   name: 'John Smith',
//   product: 'product',
//   unitName: 'unitName',
//   lastUpdatedDate: '2020-12-09',
// });
//
// mock.onPost('/api/warehouses').reply(200, {
//   id: 1,
//   name: 'John Smith',
//   product: 'product',
//   unitName: 'unitName',
//   lastUpdatedDate: '2020-12-09',
// });
//
// mock.onPut('/api/warehouses/1').reply(200, {
//   id: 1,
//   name: 'John Smith',
//   product: 'product',
//   unitName: 'unitName',
//   lastUpdatedDate: '2020-12-09',
// });
//
// mock.onDelete('/api/warehouses/1').reply(200, {
//   id: 1,
//   name: 'John Smith',
//   product: 'product',
//   unitName: 'unitName',
//   lastUpdatedDate: '2020-12-09',
// });
