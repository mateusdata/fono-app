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
    logado: any,
    email: string | any,
    setEmail: Dispatch<SetStateAction<string | null>>,
    loadingPage: boolean;
    setLoadingPage: Dispatch<SetStateAction<boolean>>;
    
}

export const Context = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(false);
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

    const login = async (email: string, senha: string) => {
        setLoading(true);
        axiosInstance.post("/login", {
            email,
            password: senha
        }).then((response) => {
            setLoadingPage(true)
            AsyncStorage.setItem("usuario", JSON.stringify(response.data)).then((res) => {
                setLoading(false);
                setTimeout(() => {
                    setLoadingPage(false)
                }, 1000);
                setUser(response?.data);
            }).catch((erro) => {
                setLoading(false);
                setLoadingPage(false)
            });
        }).catch((erro) => {
            setLoading(false);
            alert("Usuarios ou senha incorretos")
        });
    };

    const logOut = async () => {
        setLoadingPage(true)
        await AsyncStorage.removeItem("usuario");
        setTimeout(() => {
            setUser(false);
            setLoadingPage(false)
        }, 400);
    };
    if (loadingPage) {
        return <LoadingComponent />
    }

    return (
        <Context.Provider
            value={{
                user, loading, setUser, logado: !!user, setLoading, login, logOut, email, setEmail, loadingPage, setLoadingPage
            }}
        >
            {children}
        </Context.Provider>
    );

};


export default AuthProvider;



