import axios from 'axios';

export default axios.create({
  baseURL: `http://10.119.10.90:3085/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const URL_IMAGE = 'http://10.119.10.90:3085/';
