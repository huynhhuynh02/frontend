import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MODULE_STATE_NAME } from '../app/modules/auth/pages/reducer';
// eslint-disable-next-line no-unused-vars

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(config => {
    const {
      [MODULE_STATE_NAME]: { token },
    } = store.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  });

  axios.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
    },
    function(error) {
      console.log(error);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
}

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/api/inventory/warehouses').reply(200, {
  results: [
    {
      id: 1,
      name: 'John Smith',
      product: 'product',
      unitName: 'unitName',
      lastUpdatedDate: '2020-12-09',
    },
  ],
  quantity: 1,
});

mock.onGet('/api/inventory/warehouses/1').reply(200, {
  id: 1,
  name: 'John Smith',
  product: 'product',
  unitName: 'unitName',
  lastUpdatedDate: '2020-12-09',
});

mock.onPost('/api/inventory/warehouses').reply(200, {
  id: 1,
  name: 'John Smith',
  product: 'product',
  unitName: 'unitName',
  lastUpdatedDate: '2020-12-09',
});

mock.onPut('/api/inventory/warehouses/1').reply(200, {
  id: 1,
  name: 'John Smith',
  product: 'product',
  unitName: 'unitName',
  lastUpdatedDate: '2020-12-09',
});

mock.onDelete('/api/inventory/warehouses/1').reply(200, {
  id: 1,
  name: 'John Smith',
  product: 'product',
  unitName: 'unitName',
  lastUpdatedDate: '2020-12-09',
});
