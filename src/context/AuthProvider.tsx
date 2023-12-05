import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import axiosInstance from "../config/axiosInstance";
import LoadingComponent from "../components/LoadingComponent";

interface ContextProps {
    user: any;
    loading: boolean;
    setUser: Dispatch<SetStateAction<boolean | any>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    login: (email: string, senha: string) => void;
    logOut: () => any;
    logado: any
}


export const Context = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<any>([false]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        AsyncStorage.getItem("usuario").then((response) => {
           if(response !=null){
            setUser(JSON.parse(response));
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return
           }
           
        });
    }, []);

    const login = async (email: string, senha: string) => {
        axiosInstance.post("/login", {
            email,
            password:senha
        }).then((response) => {
            AsyncStorage.setItem("usuario", JSON.stringify(response.data)).then((res) => {
                setLoading(true);
                
                setTimeout(() => {
                    setLoading(false);
                    setUser(response?.data);
                }, 2000);
            }).catch((erro) => {
                setLoading(false);
            });

        })
        .catch((erro) => {
            setLoading(false);
            alert("Usuarios ou senha incorretos")
        })
    };

    const logOut = async () => {
        setLoading(true)
        await AsyncStorage.removeItem("usuario");
        setTimeout(() => {
            setUser(false);
            setLoading(false)
        }, 500);
    };
    if (false) {
        return (
          <LoadingComponent/>
        );
      }

    
    return (
        <Context.Provider
            value={{
                user,
                loading,
                setUser,
                logado: !!user,
                setLoading,
                login,
                logOut
            }}
        >
         
         
            {children}
        </Context.Provider>
    );

};


export default AuthProvider;



 