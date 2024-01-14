import React from 'react';
import { Text, View } from 'react-native';
import CustomText from './customText';

const FazerLogin = () => {
  
    return (
        <View style={{ width: "auto", alignItems: "center", justifyContent: "center", marginTop: 15 }}>
            <CustomText style={{ fontFamily: "Inter600SemiBold", color: "gray" }}>Não tem uma conta</CustomText>
            <CustomText style={{ fontFamily: "Inter600SemiBold", color: "#407AFF" }}>Criar uma conta</CustomText>
        </View>
    )
}

export default FazerLogin