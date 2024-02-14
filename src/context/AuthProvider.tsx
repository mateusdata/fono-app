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
    setLoading: Dispatch<SetStateAction<boolean>>;
    
}

export const Context = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<any>(false);
    const [loadingPage, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | any>(null);

    useEffect(() => {
        setLoading(true)
        AsyncStorage.getItem("usuario").then((response) => {
            if (response != null) {
                setUser(JSON.parse(response));
                setLoading(false);
                return
            }
            setLoading(false)

        }).catch((erro) => {
            setLoading(false);
        });
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post("/login", {
                email,
                password
            });
            setLoading(true);
            try {
                await AsyncStorage.setItem("usuario", JSON.stringify(response.data));
                setLoading(false);
                setUser(response?.data);
            } catch (erro) {
                setLoading(false);
                alert("Ocorreu um erro ao salvar os dados do usuarios");
            }
        } catch (erro) {
            alert("Usuarios ou senha incorretos");
        }
    };
    

    const logOut =  () => {
        setLoading(true)
         AsyncStorage.removeItem("usuario").then((response)=>{
            setTimeout(() => {
                setUser(false);
                setLoading(false)
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
                user, setUser, logado: !!user, login, logOut, email, setEmail, loadingPage, setLoading
            }}
        >
            {children}
        </Context.Provider>
    );

};


export default AuthProvider;



