import React, { useContext } from 'react';
import { StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import AuthProvider, { Context } from '../context/AuthProvider';

const PrimaryButton = ({ handleButton, name }: any) => {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold
    });
    const { loading } = useContext(Context);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <AuthProvider>
            <Pressable
                android_ripple={{ color: "#9dcee0", foreground: false }}
                style={[styles.button,{backgroundColor:loading?"#82a4a5":"#36B3B9"}]}
                onPress={handleButton}
                disabled={loading}
            >
                <Text style={[styles.buttonText,{color:loading?"#e5e3e3":"white"}]}>{name}</Text>
                {loading ? <ActivityIndicator color={"white"} size={25} /> : null}
            </Pressable>

        </AuthProvider>
    )

}

const styles = StyleSheet.create({

    button: {
        fontFamily: "Poppins_600SemiBold",
        borderRadius: 5,
        padding: 16,
        alignItems: 'center',
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },
    buttonText: {
        fontFamily: "Poppins_800ExtraBold",
        color: '#f4f4f4',
        fontWeight: 'bold',
        fontSize: 17
    },
});
export default PrimaryButton