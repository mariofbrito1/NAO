import axios from 'axios';
import config from '../../../config';

export default axios.create({
  //10.1.142.151:5006/
  baseURL: 'http://'+config.ip+':5006/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
