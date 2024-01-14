import React, { useContext, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { TextInput } from 'react-native-paper';
import CustomText from '../components/customText';
import axiosInstance from '../config/axiosInstance';
import { Context } from '../context/AuthProvider';

const SendEmail = ({ navigation }: any) => {
    const { email, setEmail } = useContext(Context);
    const [showError, setShowError] = useState<boolean>(false);
    const [mensageError, setMensageErro] = useState<string>("Email invalido")
    const [colorText, setColorText] = useState<any>("red");
    const { login, setLoading, loading } = useContext(Context);

    const confirmationEmail = () => {

        if (email?.includes(".") && email.includes("@") && email.length > 5) {
            setShowError(false)
            setLoading(true);
            return axiosInstance.post('/send-reset-code', { email: email }).then((response) => {

                if (response.status === 200) {

                    setColorText("green")
                    setMensageErro("Um email foi enviado para " + response?.data?.email)
                    setShowError(true);
                    setLoading(false);
                    navigation.navigate("CheckCode");
                }
            }).catch((error) => {
                setShowError(true);
                error?.response.status && setMensageErro("Não existe essa conta de email");
                setLoading(false);

            })
        }
        else {
            setShowError(true)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 10, marginTop: 10 }}>
                <CustomText fontFamily='Inter_300Light' style={{
                    fontSize: 25,
                    marginBottom: 0,
                    marginTop: 0,
                    color: "#4d4d4f",
                    textAlign: "center"
                }}>
                    Esqueceu sua senha ?
                </CustomText>
                <CustomText fontFamily='Inter_300Light' style={{ fontSize: 18, textAlign: "center" }}>
                    Insira seu email pra obter um código de segurança
                </CustomText>
            </View>
            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", marginTop: 100 }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        placeholder="Email"
                        style={{ height: 52, width: "90%" }}
                        onChangeText={(e) => {
                            setMensageErro("Email invalido")
                            setEmail(e)
                            setShowError(false)
                        }}
                        activeOutlineColor='#376fe8'

                    />
                    <View style={{ alignItems: "flex-start", justifyContent: "flex-start", width: "100%", marginLeft: 40 }}>
                        <Text style={{ color: colorText, textAlign: "left" }} >{showError && mensageError} </Text>
                    </View>

                </View>
                <View style={{ padding: 20 }}>
                    <PrimaryButton handleButton={confirmationEmail} name="Enviar email" />
                    <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                        <CustomText fontFamily='Inter_300Light' style={{ color: "gray" }}>Lembrou sua senha</CustomText>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <CustomText fontFamily='Inter_300Light' style={{ color: "#407AFF" }}>Fazer login</CustomText>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default SendEmail
//Poppins_300Light