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
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

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
                <LinearGradient
                  colors={[
                    'hsla(320, 100%, 95%, 1)',
                    'hsla(320, 100%, 99%, 1)',
                    'hsla(210, 100%, 97%, 1)',
                    'hsla(205, 100%, 95%, 1)',
                    'hsla(313, 100%, 98%, 1)'
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.background}
                />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});


