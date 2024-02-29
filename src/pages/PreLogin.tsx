import React from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import PrimaryButton from '../components/primaryButton';
import CustomText from '../components/customText';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
const PreLogin = ({ navigation }: any) => {

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#F5F7FF" }}>
            <Image style={{ flex: 0.4, width: "100%" }}
                source={{ uri: 'https://clinicasepam.com.br/wp-content/uploads/2021/06/O-que-e-terapia-da-fala-fono.png' }} />

            <View style={{ flex: 0.6, justifyContent: "flex-start", width: "100%", alignItems: "center" }}>
                <View style={{ width: "80%", gap: 5, marginTop: 0 }}>
                    <CustomText fontFamily="Poppins_600SemiBold" style={{ color: "#3b3d3d", fontSize: 25, textAlign: "center", paddingTop: 15 }}>
                        Descubra o seu melhor com o Fono App
                    </CustomText>
                    <CustomText style={{ fontSize: 16, textAlign: "center" }}>
                        Explore um mundo de saúde e Tenha controle dos seus pacientes com o nosso app de 
                    </CustomText>
                </View>
                <View style={{ width: "90%", marginTop: 10 }} >
                    <View style={{ padding: 0 }}>
                        <PrimaryButton name="Criar conta" handleButton={() => navigation.navigate("CreateAccount")} />
                    </View>
                    <Button focusable mode='contained-tonal' onPress={() => navigation.navigate("Login")} style={{
                        borderColor: "#daebf2", backgroundColor: "#ECF2FF", padding: 2, borderWidth:1,
                        marginTop: 6
                    }}>
                        Login
                    </Button>

                </View>
            </View>
        </View>
    );

}

export default PreLogin