import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import axiosInstance from "../config/axiosInstance";
import LoadingComponent from "../components/LoadingComponent";

interface ContextProps {
    user: any;
    setUser: Dispatch<SetStateAction<boolean | any>>;
    login: (email: string, senha: string) => void;
    logOut: () => any;
    logado: any,
    email: string | any,
    setEmail: Dispatch<SetStateAction<string | null>>,
    loadingPage: boolean;
    setLoadingPage: Dispatch<SetStateAction<boolean>>;
    
}

export const Context = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<any>(false);
    const [loadingPage, setLoadingPage] = useState<boolean>(false);
    const [email, setEmail] = useState<string | any>(null);

    useEffect(() => {
        setLoadingPage(true)
        AsyncStorage.getItem("usuario").then((response) => {
            if (response != null) {
                setUser(JSON.parse(response));
                setLoadingPage(false);
                return
            }
            setLoadingPage(false)

        }).catch((erro) => {
            setLoadingPage(false);
        });
    }, []);

    const login = async (email: string, password: string) => {
        axiosInstance.post("/login", {
            email,
            password
        }).then((response) => {
            setLoadingPage(true)
            
            AsyncStorage.setItem("usuario", JSON.stringify(response.data)).then((res) => {
                setTimeout(() => {
                    setLoadingPage(false)
                }, 1000);
                setUser(response?.data);
            }).catch((erro) => {
                setLoadingPage(false)
                alert("Ocorreu um erro ao salvar os dados do usuarios")
            });
        }).catch((erro) => {
            alert("Usuarios ou senha incorretos")
        });
    };

    const logOut =  () => {
        setLoadingPage(true)
         AsyncStorage.removeItem("usuario").then((response)=>{
            setTimeout(() => {
                setUser(false);
                setLoadingPage(false)
            }, 400);
         }).catch((e)=>{
            alert("erro" + JSON.stringify(e))
         });
       
    };
    if (loadingPage) {
        return <LoadingComponent />
    }

    return (
        <Context.Provider
            value={{
                user, setUser, logado: !!user, login, logOut, email, setEmail, loadingPage, setLoadingPage
            }}
        >
            {children}
        </Context.Provider>
    );

};


export default AuthProvider;



