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
import MyInformation from '../../pages/myInformation';
import ChangeName from '../../pages/changeName';
import ChangeEmail from '../../pages/changeEmail';
import ChangeCredential from '../../pages/changeCredential';
import MyPlanDetails from '../../pages/myPlanDetails';
import Help from '../../pages/help';

// dentro do seu componente

const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(Context)

  return (
    <AppStack.Navigator screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <AppStack.Screen
        name="LeadingPage"
        component={LeadingPage}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: () => null,
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "white"
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Pressable onPress={() => setUser(null)}>
                <CustomText>
                  Não obrigado
                </CustomText>
              </Pressable>
            </View>
          )
        })}
      />
      <AppStack.Screen name='Root' component={TabsNavigation} options={{
        headerShown: false,
      }} />
      <AppStack.Screen name='Anamnese' component={Anamnese} />
      <AppStack.Screen name='Exercise' component={Exercise} />
      <AppStack.Screen name='PolicyAndPrivacy' component={PolicyAndPrivacy} options={{
        headerTitle: ""
      }} />

      <AppStack.Screen name='TermsAndServices' component={TermsAndServices} options={{
        headerTitle: ""
      }} />
      <AppStack.Screen name='MyInformation' component={MyInformation} options={{headerTitleAlign:"center", headerTitle:"Minhas informações"}}/>
      <AppStack.Screen name='ChangeName' component={ChangeName} options={{headerTitleAlign:"center", headerTitle:"Alterar nome"}}/>
      <AppStack.Screen name='ChangeEmail' component={ChangeEmail} options={{headerTitleAlign:"center", headerTitle:"Alterar email"}}/>
      <AppStack.Screen name='ChangeCredential' component={ChangeCredential} options={{headerTitleAlign:"center", headerTitle:"Alterar senha"}}/>
      <AppStack.Screen name='MyPlanDetails' component={MyPlanDetails} options={{headerTitleAlign:"center", headerTitle:"Meu plano"}}/>
      <AppStack.Screen name='Help' component={Help} options={{headerTitleAlign:"center", headerTitle:"Contato"}}/>


      




    </AppStack.Navigator>
  )
}

export default PrivateRoutes;
