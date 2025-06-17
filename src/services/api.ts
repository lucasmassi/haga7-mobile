import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://diamond-backend-xq3f.onrender.com',
});

api.interceptors.request.use(async (config: any) => {
  const token: any = await SecureStore.getItemAsync('diamond_token')

  config.headers.Authorization = `Bearer ${JSON.parse(token)}`

  return config;
});

export default api;
