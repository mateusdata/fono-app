import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import PrimaryButton from '../components/primaryButton'
import FazerLogin from '../components/fazerLogin'
import { TextInput } from 'react-native-paper'
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';

const ForgotPassword = ({ navigation }: any) => {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 18, fontFamily: "Poppins_800ExtraBold", textAlign: "center" }}>
                    Esqueceu sua senha ?
                </Text>
                <Text style={{ fontSize: 18, fontFamily: "Poppins_300Light", textAlign: "center" }}>
                    Insira seu email pra obter um codigo de segurança
                </Text>
            </View>
            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", marginTop: 100 }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        mode="outlined"
                        label="Email de recumepração"
                        placeholder="Email"
                        secureTextEntry
                        style={{ height: 52, width: "90%" }}

                        activeOutlineColor='#376fe8'

                    />
                </View>
                <View style={{ padding: 20 }}>
                    <PrimaryButton name="Enviar email" />
                    <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "gray" }}>Lembrou sua enha</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Fazer login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default ForgotPassword