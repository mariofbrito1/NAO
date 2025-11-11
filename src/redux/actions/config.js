import axios from 'axios';
import config from '../../config';

export default axios.create({
  //baseURL: `http://10.1.142.151:5006/`,
  baseURL: 'http://'+config.ip+':5006/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const URL = 'http://'+config.ip+':5006/';
console.log("atp", URL);
console.log("base url", 'http://'+config.ip+':5006/');

//export const URL = 'http://10.1.142.151:5006/';
