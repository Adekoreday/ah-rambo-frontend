import axios from 'axios';
import { getFromStorage } from './storageHelper';

const fetchData = async (method, url, data, config) => {
  axios.defaults.baseURL = process.env.SERVER_URL;
  const token = getFromStorage('token');
  if (token) axios.defaults.headers.common.Authorization = token;

  const response = await axios({
    method,
    url,
    data,
    config
  });
  return response;
};

export default fetchData;
