import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/AuthProvider';
import Routes from './src/routes/routes';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BackHandler, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
export default function App() {


  const [tamaguiLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });


  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        alert("Você esta sem conexão com a internet")
         setTimeout(() => {
          //BackHandler.exitApp();
         }, 2000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light
  });

  if (!fontsLoaded || !tamaguiLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar translucent={false} backgroundColor='#36B3B9' barStyle='dark-content' />
        <AuthProvider>
          <TamaguiProvider config={config}>
            <Routes />
          </TamaguiProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
//#36B3B9

