import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/ AuthProvider';
import Routes from './src/routes/public/routes';
import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor='white' />
      <AuthProvider>
        <TamaguiProvider config={config}>
          <Routes />
        </TamaguiProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

