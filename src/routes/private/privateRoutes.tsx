import React, { useContext } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Anamnese from '../../pages/anamnese';
import Exercise from '../../pages/exercise';
import TabsNavigation from './tabNavigation/tabNavigation';
import LeadingPage from '../../pages/leadingPage';
import { Button, Pressable, View } from 'react-native';
import CustomText from '../../components/customText';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../context/AuthProvider';
import PolicyAndPrivacy from '../../pages/policyAndPrivacy';
import TermsAndServices from '../../pages/termsAndServices';

// dentro do seu componente

const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  const navigation = useNavigation();
  const {setUser} = useContext(Context)

  return (
    <AppStack.Navigator   screenOptions={{
      //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
     <AppStack.Screen 
  name="LeadingPage" 
  component={LeadingPage} 
  options={({ navigation }) => ({
    headerShown: false,
    headerTitle: () => null,
    headerTintColor: "black",
    headerStyle: {
      backgroundColor: "white"
    },
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
      <Pressable  onPress={() =>setUser(null) }>
      <CustomText>
       Não obrigado
      </CustomText>
        </Pressable>
      </View>
    )
  })}
/>
      <AppStack.Screen name='Root' component={TabsNavigation} options={{
        headerShown:false,
      }}/>
      <AppStack.Screen name='Anamnese' component={Anamnese} />
      <AppStack.Screen name='Exercise' component={Exercise} />
      <AppStack.Screen name='PolicyAndPrivacy' component={PolicyAndPrivacy} options={{
        headerTitle:""
      }} />

      <AppStack.Screen name='TermsAndServices' component={TermsAndServices}   options={{
        headerTitle:""
      }}/>

    </AppStack.Navigator>
  )
}

export default PrivateRoutes;
