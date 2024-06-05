import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'https://fono-api.vercel.app',
  //baseURL: "https://fono-api-solitary-surf-9909.fly.dev",

});
api.interceptors.request.use(async (config) => {
  // alert("entrou aqui no request")
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



async function setInterceptors(setUser: any) {
  api.interceptors.response.use(

    (response) => {
      return response;
    },
    async (error) => {

      // Verifique se o erro é um 401
      if (error.response && error.response.status === 401) {
        try {
          // Limpe o AsyncStorage
          await AsyncStorage.removeItem("usuario");
          await AsyncStorage.removeItem("pacientes");
          setUser(null)
        } catch (asyncStorageError) {
          console.error("Error removing user from AsyncStorage:", asyncStorageError);
        }
      }

      // Rejeite a promessa com o erro original
      return Promise.reject(error);
    }
  );
}


export { api, setInterceptors };
