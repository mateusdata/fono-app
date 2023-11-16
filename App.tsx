import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/ AuthProvider';
import Routes from './src/routes/public/routes';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent={false}  backgroundColor='white' />
      <AuthProvider>
        <Routes />
      </AuthProvider>
  </NavigationContainer>
  );
}

