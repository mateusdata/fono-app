import React from 'react';
import { View, StatusBar, Image, Linking } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colorPrimary } from '../style/ColorPalette';
const ImageTerminate = require("../assets/images/animate.gif"); 

interface FormatUser {
    nick_name: string,
    email: string
}
const FinishRegistration = ({ navigation, route }) => {
    const { user } = route.params;
    const handleEmailPress = () => {
        Linking.openURL(`mailto:${user?.email}`);
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F7FF" }}>
            <View style={{justifyContent:"center", alignItems:"center", padding:12}}>

                <StatusBar animated={true} barStyle='light-content' />
                <Text style={{ fontSize: 25, color: colorPrimary }}>{`Olá ${user?.nick_name}`}</Text>
                <Text style={{ fontSize: 17,}}>Verifique seu email {user?.email}</Text>
                <Text style={{ fontSize: 17 }}> para confirmar sua conta</Text>
                <Image style={{ height:60, width: 60, }}
                source={ImageTerminate}
                 />
               
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate("Login")}
                    style={{ marginTop: 5, backgroundColor: colorPrimary }}
                >
                    Verificar Email
                </Button>
            </View>
        </View>
    );
}

export default FinishRegistration;
