import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: 'https://fono-api-solitary-surf-9909.fly.dev',
 // baseURL: 'https://fono-api.vercel.app',
  //baseURL:" https://7890-179-54-98-194.ngrok-free.app",

  //timeout:5000
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
