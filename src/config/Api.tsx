import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
//baseURL: 'https://fono-api-solitary-surf-9909.fly.dev',
 baseURL: 'https://f3af-181-216-222-58.ngrok-free.app',
 // baseURL:"https://4298-181-216-222-58.ngrok-free.app",

  timeout:8000
});
api.interceptors.request.use(async (config) => {
  try {
    const userString = await AsyncStorage.getItem("usuario");
    if (userString !== null) {
      const recoverUser = JSON.parse(userString);

      if (recoverUser && recoverUser.token) {
        config.headers.Authorization = `Bearer ${recoverUser.token}`;
      }
    }

    return config;
  } catch (error) {
    console.error("Error getting user from AsyncStorage:", error);
    return config;
  }
});

export default api;
