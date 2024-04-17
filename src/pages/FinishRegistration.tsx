import React from 'react';
import { View, StatusBar } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { colorPrimary } from '../style/ColorPalette';

interface FormatUser {
    nick_name: string,
    email: string
}
const FinishRegistration = ({ navigation, route }) => {
    const { user } = route.params;
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F7FF" }}>
            <StatusBar animated={true} barStyle='light-content' />
            <Text style={{fontSize:25}}>{`Olá ${user?.nick_name}`}</Text>
            <Text style={{fontSize:18}}>Verifique seu email {user?.email}</Text>
            <Text style={{fontSize:18}}> para completar o registro</Text>
            
            <Button
                mode="contained"
                onPress={() => navigation.navigate("Login")}
                style={{ marginTop: 20, backgroundColor: colorPrimary }}
            >
                Verificar Email
            </Button>
        </View>
    );
}

export default FinishRegistration;
