import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import axiosInstance from "../config/axiosInstance";

interface ContextProps {
    user: boolean | null;
    nome: string;
    email: string;
    loading: boolean;
    setUser: Dispatch<SetStateAction<boolean | any>>;
    setNome: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    login: (email: string, senha: string) => void;
    logOut: () => any;
    logado: any
}


export const Context = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<boolean | any>(false);

    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        AsyncStorage.getItem("usuario").then((response) => {
            setUser(response);
            setTimeout(() => {
                setLoading(false)
            }, 6000);
        })
    }, []);

    const login = async (email: string, senha: string) => {
        axiosInstance.post("/auth/login", {
            email,
            senha
        }).then((response) => {
            setNome(response?.data?.nome);
            AsyncStorage.setItem("usuario", JSON.stringify(response.data)).then((res) => {
                setUser(response?.data);
                setTimeout(() => {
                    setLoading(false);
                }, 50);
            }).catch((erro) => {
                console.log(erro);
            });

        }).catch((erro) => {
            console.log(erro);
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

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <StatusBar/>
                <ActivityIndicator animating={true} color={"#0B7EBE"} size={50} />
            </View>
        );
    }
    return (
        <Context.Provider
            value={{
                user,
                nome,
                email,
                loading,
                setUser,
                logado: !!user,
                setNome,
                setEmail,
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



