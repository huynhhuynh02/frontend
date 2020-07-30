import axios from 'axios';
import { API_URL } from '../../../constants';

export const login = ({ username, password }) =>
  axios.post(`${API_URL}/sign-in`, {
    username,
    password,
  });

export const getInfo = token =>
  axios.get(`${API_URL}/information`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
