import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: 'https://39a9-179-54-100-101.ngrok-free.app',
});
axiosInstance.interceptors.request.use(async (config) => {
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

export default axiosInstance;
