import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/AuthProvider';
import Routes from './src/routes/routes';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import { useFonts, Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light } from '@expo-google-fonts/poppins';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold, Poppins_800ExtraBold, Poppins_300Light
  });

  if (!fontsLoaded) {
    return null;
  } 
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor='#36B3B9' style='light' />
      <AuthProvider>
        <TamaguiProvider config={config}>
          <Routes />
        </TamaguiProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

