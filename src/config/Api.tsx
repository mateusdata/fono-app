import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'https://532e-181-216-222-58.ngrok-free.app',
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


// Interceptor de resposta para capturar erros
let interceptorsConfigured = false;

async function setInterceptors(setUser) {
  if (!interceptorsConfigured) {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            Alert.alert("sessão expirada", "Faça login novamente");
            await AsyncStorage.removeItem("usuario");
            await AsyncStorage.removeItem("pacientes");
            setUser(null);
          } catch (asyncStorageError) {
            console.error("Error removing user from AsyncStorage:", asyncStorageError);
          }
        }
        return Promise.reject(error);
      }
    );
    interceptorsConfigured = true;
  }
}


export { api, setInterceptors };
