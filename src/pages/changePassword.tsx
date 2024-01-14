import React, { useContext, useState } from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import { TextInput } from 'react-native-paper';
import { Context } from '../context/AuthProvider';
import CustomText from '../components/customText';
import axiosInstance from '../config/axiosInstance';

const ChangePassword = ({ navigation }: any) => {
    const { setUser } = useContext(Context);
    const { email, setEmail } = useContext(Context);
    const [newPassword, setNewPassword] = useState<any>("");
    const [confirPassword, setConfirPassword] = useState<any>("");
    const { login, setLoading, loading } = useContext(Context);
    const [showError, setShowError] = useState<boolean>(false);
    const [mensageError, setMensageErro] = useState<string>("As senhas não são identicas")
    const [colorText, setColorText] = useState<any>("red");

    const verificarSenha = (newPassword: any) => /[0-9]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);;

    function changePassword() {
        if (newPassword && newPassword === confirPassword) {
            setLoading(true);
            axiosInstance.post('/reset-password', { email: email, newPassword }).then((response) => {
                setLoading(false);
                login(email, newPassword);
            }).catch((error) => {
                alert("error no servidor")
                setLoading(false);
            })
        }
        else {
            setShowError(true);
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 10, marginTop: 10 }}>
                <CustomText style={{
                    fontFamily: "Inter800ExtraBold",
                    fontSize: 25,
                    marginBottom: 0,
                    marginTop: 0,
                    color: "#4d4d4f",
                    textAlign: "center"
                }}>
                    Vamos alterar sua senha
                </CustomText>
                <CustomText style={{ fontSize: 18, fontFamily: "Inter300Light", textAlign: "center" }}>
                    Insira sua nova senha de 6 digitos com letras caractere especiais?
                </CustomText>
            </View>
            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", marginTop: 100 }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        placeholder="Senha"
                        secureTextEntry
                        style={{ height: 52, width: "90%", marginBottom: 10 }}
                        onChangeText={(e) => {
                            setNewPassword(e)
                            setShowError(false);
                        }}
                        activeOutlineColor='#376fe8'
                    />
                    <TextInput
                        mode="outlined"
                        label="Confirmar senha"
                        placeholder="Confirmar senha"
                        secureTextEntry
                        style={{ height: 52, width: "90%" }}
                        onChangeText={(e) => setConfirPassword(e)}
                        activeOutlineColor='#376fe8'

                    />
                    <View style={{ alignItems: "flex-start", justifyContent: "flex-start", width: "100%", marginLeft: 40 }}>
                        <Text style={{ color: colorText, textAlign: "left" }} >{showError && mensageError} </Text>
                    </View>
                </View>
                <View style={{ padding: 20 }}>
                    <PrimaryButton handleButton={changePassword} name="Alterar senha" />
                    
                </View>
            </View>

        </View>
    )
}

export default ChangePassword