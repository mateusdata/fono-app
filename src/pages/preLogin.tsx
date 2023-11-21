import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import PrimaryButton from '../components/primaryButton'
import FazerLogin from '../components/fazerLogin'
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';

const PreLogin = ({ navigation }: any) => {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor:"#F5F7FF" }}>
            <Image style={{ width: "100%", height: "43%" }} source={{ uri: 'https://clinicasepam.com.br/wp-content/uploads/2021/06/O-que-e-terapia-da-fala-fono.png' }} />
            <View style={{ flex: 1, justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                <View style={{ width: "80%", gap: 5, marginTop: 15 }}>
                    <Text style={{ fontFamily: "Poppins_800ExtraBold", color: "#3b3d3d", fontSize: 25, textAlign: "center" }}>
                        Descubra o seu melhor com o Fono App
                    </Text>
                    <Text style={{ fontFamily: "Poppins_300Light", fontSize: 16, textAlign: "center" }}>
                        Explore um mundo de saúde e equilíbrio com o nosso app
                        de Fonoaudiologia, onde cada passo é uma descoberta em
                        direção a uma vida mais plena e saudável.
                    </Text>
                </View>
                <View style={{ width: "100%", marginBottom: 20 }} >
                    <View style={{ padding: 18 }}>
                        <PrimaryButton name="Criar conta" handleButton={() => navigation.navigate("Criar conta")} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#36B3B9", textAlign: "center" }}>Login</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default PreLogin