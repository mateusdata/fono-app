import React from 'react'
import { Image, Text, View } from 'react-native'
import {  useFonts, Poppins_600SemiBold, Poppins_800ExtraBold} from '@expo-google-fonts/poppins';

const SendCode = () => {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <View>
            <Text>
                SendCode
            </Text>
            <Image source={require("../../assets/pre-login.png")}/>
        </View>
    )
}

export default SendCode