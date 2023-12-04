import React from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import PrimaryButton from '../components/primaryButton';
const PreLogin = ({ navigation }: any) => {

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor:"#F5F7FF"}}>
        <Image style={{flex: 0.4, width: "100%"}} 
        source={{ uri: 'https://clinicasepam.com.br/wp-content/uploads/2021/06/O-que-e-terapia-da-fala-fono.png' }} />
        
        <View style={{flex: 0.4, justifyContent: "flex-start", width: "100%", alignItems: "center" }}>
            <View style={{ width: "80%", gap: 5, marginTop: 0 }}>
                <Text style={{ fontFamily: "Poppins_800ExtraBold", color: "#3b3d3d", fontSize: 25, textAlign: "center", paddingTop:15 }}>
                    Descubra o seu melhor com o Fono App
                </Text>
                <Text style={{ fontFamily: "Poppins_300Light", fontSize: 16, textAlign: "center" }}>
                    Explore um mundo de saúde e equilíbrio com o nosso app
                    de Fonoaudiologia, onde cada passo é uma descoberta em
                    direção a uma vida mais plena e saudável.
                </Text>
            </View>
            <View style={{ width: "90%", marginTop: 10 }} >
                <View style={{ padding: 0 }}>
                    <PrimaryButton name="Criar conta" handleButton={() => navigation.navigate("CreateAccount")} />
                </View>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={{ fontFamily: "Poppins_600SemiBold", color: "#36B3B9", textAlign: "center" }}>Login</Text>
                </Pressable>

            </View>
        </View>
    </View>
);

}

export default PreLogin