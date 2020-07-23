import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// eslint-disable-next-line no-unused-vars
export default function setupAxios(axios, store) {
  // axios.interceptors.request.use(
  //   config =>
  //     // const {
  //     //   auth: { authToken },
  //     // } = store.getState();
  //     //
  //     // if (authToken) {
  //     //   config.headers.Authorization = `Bearer ${authToken}`;
  //     // }
  //
  //     config,
  //   err => Promise.reject(err),
  // );
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
