import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { TextInput } from 'react-native-paper';
import { Context } from '../context/AuthProvider';
import axiosInstance from '../config/axiosInstance';

const CheckCode = ({ navigation }: any) => {
    const { email, setEmail } = useContext(Context);
    const [codigo, setcodigo] = useState<any>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [mensageError, setMensageErro] = useState<string>("Email invalido")
    const [colorText, setColorText] = useState<any>("red");
    const { login, setLoading, loading } = useContext(Context);
    
    useEffect(() => {
        if (!email) { navigation.navigate("Login"); };
    }, []);
    if (!email) {
        return null;
    }

    function checkCode() {
        if (codigo.length>4) {
            setLoading(true);
            axiosInstance.post('/verify-reset-code', { email: email, verification_code: codigo }).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    navigation.navigate("ChangePassword");
                }
            }).catch((error) => {
                setShowError(true);
                error?.response.status ? setMensageErro("Código invalido") : alert("Ocorreu um erro no servidor")
                    ;
                    setLoading(false);
            })
        }
    }
    const sendCode = () => {
        axiosInstance.post('/send-reset-code', {email: email}).then((response)=>{
               
            if(response.status === 200){            
              return  alert("um novo codigo foi enviado para " + email)
            }
            return ("ops! ocorreu um erro ")
        }).catch((error)=>{
            setShowError(true);
            error?.response.status && alert(" ocorreu um erro");

        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 10, marginTop: 10 }}>
                <Text style={{
                    fontFamily: "Inter800ExtraBold",
                    fontSize: 25,
                    marginBottom: 0,
                    marginTop: 0,
                    color: "#4d4d4f",
                    textAlign: "center"
                    
                }}>
                    Verificar código
                </Text>
                <Text style={{ fontSize: 18, fontFamily: "Inter300Light", textAlign: "center" }}>
                    Insira o código de segurança que enviamos para seu email.
                </Text>
            </View>
            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", marginTop: 100 }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        mode="outlined"
                        label="Código de verificação"
                        placeholder="Código de verificação"
                        value={codigo}
                        style={{ height: 52, width: "90%" }}
                        onChangeText={(e) => {
                            setMensageErro("")
                            setcodigo(e)
                            setShowError(false)
                        }}
                        activeOutlineColor='#376fe8'
                        keyboardType='numeric'
                    />
                    <View style={{ alignItems: "flex-start", justifyContent: "flex-start", width: "100%", marginLeft: 40 }}>
                        <Text style={{ color: colorText, textAlign: "left" }} >{showError && mensageError} </Text>
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    <PrimaryButton handleButton={checkCode} name="Verificar código" />
                    <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                        <Text style={{ fontFamily: "Inter600SemiBold", color: "gray" }}>Não recebeu o código?</Text>
                        <Pressable onPress={sendCode}>
                            <Text style={{ fontFamily: "Inter600SemiBold", color: "#407AFF" }}>Reivinhar código</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default CheckCode