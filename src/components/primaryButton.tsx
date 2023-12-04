import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import {  useFonts, Poppins_600SemiBold, Poppins_800ExtraBold} from '@expo-google-fonts/poppins';

const PrimaryButton = ({handleButton, name}:any) => {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <Pressable style={styles.button} onPress={handleButton}>
            <Text style={styles.buttonText}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    button: {
        fontFamily:"Poppins_600SemiBold",
        backgroundColor: '#36B3B9',
        borderRadius: 5,
        padding: 18,
        alignItems: 'center',
        marginTop:15
    },
    buttonText: {
        fontFamily:"Poppins_800ExtraBold",
        color: '#f4f4f4',
        fontWeight: 'bold',
        fontSize:17
    },
});
export default PrimaryButton