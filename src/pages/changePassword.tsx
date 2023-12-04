import React, { useContext } from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import FazerLogin from '../components/spanLogin';
import { TextInput } from 'react-native-paper';
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { Context } from '../context/AuthProvider';

const ChangePassword = ({ navigation }: any) => {
    const { setUser } = useContext(Context);

    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ gap: 10, marginTop: 10 }}>
                <Text style={{
                    fontFamily: "Poppins_800ExtraBold",
                    fontSize: 25,
                    marginBottom: 0,
                    marginTop: 0,
                    color: "#4d4d4f",
                    textAlign:"center"
                }}>
                    Vamos alterar sua senha
                </Text>
                <Text style={{ fontSize: 18, fontFamily: "Poppins_300Light", textAlign: "center" }}>
                    Insira sua nova senha de 6 digitos com letras caractere especiais?
                </Text>
            </View>
            <View style={{ backgroundColor: "#F5F7FF", flex: 1, justifyContent: "flex-start", marginTop: 100 }}>

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TextInput
                        mode="outlined"
                        label="Senha"
                        placeholder="Senha"
                        secureTextEntry
                        style={{ height: 52, width: "90%", marginBottom: 10 }}

                        activeOutlineColor='#376fe8'
                    />
                    <TextInput
                        mode="outlined"
                        label="Confirmar senha"
                        placeholder="Confirmar senha"
                        secureTextEntry
                        style={{ height: 52, width: "90%" }}

                        activeOutlineColor='#376fe8'

                    />
                </View>
                <View style={{ padding: 20 }}>
                    <PrimaryButton handleButton={() => { setUser(true) }} name="Alterar senha" />
                    <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "gray" }}>Lembrou sua senha</Text>
                        <Pressable onPress={() => { navigation.navigate("Login") }}>
                            <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#407AFF" }}>Fazer login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default ChangePassword