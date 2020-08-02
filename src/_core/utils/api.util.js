import httpClient from 'axios';
import { API_URL } from '../../app/constants';

export const crudRequest = resourcePath => {
  const API_ENDPOINT_URL = `${API_URL}/${resourcePath}`;

  function read(id) {
    if (!id) throw new Error('Missing Id');
    return httpClient.get(`${API_ENDPOINT_URL}/${id}`);
  }

  function search(params) {
    if (!params) throw new Error('Missing Params');
    return httpClient.get(`${API_ENDPOINT_URL}`, { params });
  }

  function update(id, data) {
    if (!data) throw new Error('Missing Form data');
    return httpClient
      .post(`${API_ENDPOINT_URL}/${id}`, data)
      .then(rs => rs.data);
  }

  function create(data) {
    if (!data) throw new Error('Missing Form data');
    return httpClient.post(API_ENDPOINT_URL, data);
  }

  function remove(id) {
    if (!id) throw new Error('Missing Id');
    return httpClient.delete(`${API_ENDPOINT_URL}/${id}`);
  }

  return {
    read,
    search,
    update,
    create,
    remove,
  };
};
