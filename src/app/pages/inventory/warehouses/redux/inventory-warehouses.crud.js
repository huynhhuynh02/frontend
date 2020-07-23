import httpClient from 'axios';

const API_ENDPOINT_URL = `api/inventory/warehouses`;

export function get(id) {
  if (!id) throw new Error('Missing Id');
  return httpClient.get(`${API_ENDPOINT_URL}/${id}`).then(rs => rs.data);
}

export function filter(params) {
  if (!params) throw new Error('Missing Params');
  return httpClient.get(`${API_ENDPOINT_URL}`, { params }).then(rs => rs.data);
}

export function update(id, data) {
  if (!data) throw new Error('Missing Form data');
  return httpClient.put(`${API_ENDPOINT_URL}/${id}`, data).then(rs => rs.data);
}
export function create(data) {
  if (!data) throw new Error('Missing Form data');
  return httpClient.post(API_ENDPOINT_URL, data);
}

export function remove(id) {
  if (!id) throw new Error('Missing Id');
  return httpClient.delete(`${API_ENDPOINT_URL}/${id}`);
}
