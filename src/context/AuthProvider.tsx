import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "../components/LoadingComponent";

interface ContextProps {
    user: FormatUser| null;
    setUser: Dispatch<SetStateAction<FormatUser| null>>;
    logOut: () => any;
    logado: any,
    email: string | any,
    setEmail: Dispatch<SetStateAction<string | null>>,
    loadingAuth: boolean;
    setLoadingAuth: Dispatch<SetStateAction<boolean>>;

}

interface FormatUser {
    token: string;
    email: string;
    usu_id: number;
    doc_id: number;
    nick_name: string;
}
export const Context = createContext<ContextProps>({} as ContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<FormatUser| null>(null);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [email, setEmail] = useState<string | any>('');

    useEffect(() => {
        setLoadingAuth(true)
        AsyncStorage.getItem("usuario").then((response) => {
            if (response != null) {
                setUser(JSON.parse(response));
                setLoadingAuth(false);
                return
            }
            setLoadingAuth(false)

        }).catch((erro) => {
            setLoadingAuth(false);
        });
    }, []);




    const logOut = () => {
        setLoadingAuth(true)
        AsyncStorage.removeItem("usuario").then((response) => {
            setTimeout(() => {
                setUser(null);
                setLoadingAuth(false)
            }, 400);
        }).catch((e) => {
            alert("erro" + JSON.stringify(e))
        });

    };
    if (loadingAuth) {
        return <LoadingComponent />
    }

    return (
        <Context.Provider
            value={{
                user, setUser, logado: !!user, logOut, email, setEmail, loadingAuth, setLoadingAuth
            }}
        >
            {children}
        </Context.Provider>
    );

};


export default AuthProvider;



