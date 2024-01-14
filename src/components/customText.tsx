import React from 'react';
import { Text } from 'react-native';
import {
    useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light, Poppins_400Regular, Poppins_700Bold,
    Poppins_500Medium, Poppins_600SemiBold_Italic, Poppins_100Thin, Poppins_900Black_Italic, Poppins_700Bold_Italic, Poppins_200ExtraLight_Italic
} from '@expo-google-fonts/poppins';
import { Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black } from '@expo-google-fonts/inter';


type FormatFontFamilly =
    "Poppins_600SemiBold" | "Poppins_800ExtraBold" | "Poppins_300Light" | "Poppins_400Regular" | "Poppins_500Medium" | "Poppins_700Bold" |
    "Poppins_600SemiBold_Italic" | "Poppins_100Thin" | "Poppins_900Black_Italic" | "Poppins_700Bold_Italic" | "Poppins_200ExtraLight_Italic" |
    "Inter_100Thin" | "Inter_200ExtraLight" | "Inter_300Light" | "Inter_400Regular" | "Inter_500Medium" | "Inter_600SemiBold" | "inter_700Bold" | "Inter_800ExtraBold" | "Inter_900Black"

export default function CustomText(props: { fontFamily?: FormatFontFamilly, style?: any, children: any }) {
    let [fontsLoaded] = useFonts({
        Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold,
        Poppins_600SemiBold_Italic, Poppins_100Thin, Poppins_900Black_Italic, Poppins_700Bold_Italic, Poppins_200ExtraLight_Italic, 
        Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, 
        Inter_800ExtraBold, Inter_900Black
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Text style={{ ...props.style, fontFamily: props.fontFamily || 'Inter_300Light' }}>
            {props.children}
        </Text>
    );
}
