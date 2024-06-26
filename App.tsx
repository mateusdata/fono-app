import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/AuthProvider';
import Routes from './src/routes/routes';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from 'expo-status-bar';
import PacientContext from './src/context/PacientContext';
import GlobalContext from './src/context/GlobalContext';

export default function App() {

  const [tamaguiLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });


  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        //alert("Você esta sem conexão com a internet")

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
        <GlobalContext>
          <TamaguiProvider config={config}>
            <AuthProvider>
              <PacientContext>
                <Routes />
              </PacientContext>
            </AuthProvider>
          </TamaguiProvider>
        </GlobalContext>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
//#36B3B9

