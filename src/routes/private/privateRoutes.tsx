import React, { useContext } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Button, Pressable, StatusBar, View } from 'react-native';
import CustomText from '../../components/customText';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../context/AuthProvider';
import StructuralAnalysis from '../../pages/StructuralAnalysis';
import FunctionalAnalysis from '../../pages/FunctionalAnalysis';
import Protokol from '../../pages/Protokol';
import PatientInfo from '../../pages/PacientInfo';
import AccompanyPatient from '../../pages/AccompanyPatient';
import LeadingPage from '../../pages/leadingPage';
import TabsNavigation from './tabNavigation/tabNavigation';
import Anamnese from '../../pages/anamnese';
import Exercise from '../../pages/exercise';
import PolicyAndPrivacy from '../../pages/policyAndPrivacy';
import TermsAndServices from '../../pages/termsAndServices';
import MyInformation from '../../pages/myInformation';
import ChangeName from '../../pages/changeEmail';
import ChangeCredential from '../../pages/changeCredential';
import MyPlanDetails from '../../pages/myPlanDetails';
import Suggestion from '../../pages/suggestion';
import ChangeEmail from '../../pages/changeEmail';
import Help from '../../pages/help';


const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(Context)

  return (
    <>

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
        <AppStack.Screen name='MyInformation' component={MyInformation} options={{ headerTitleAlign: "center", headerTitle: "Minhas informações" }} />
        <AppStack.Screen name='ChangeName' component={ChangeName} options={{ headerTitleAlign: "center", headerTitle: "Alterar nome" }} />
        <AppStack.Screen name='ChangeEmail' component={ChangeEmail} options={{ headerTitleAlign: "center", headerTitle: "Alterar email" }} />
        <AppStack.Screen name='ChangeCredential' component={ChangeCredential} options={{ headerTitleAlign: "center", headerTitle: "Alterar senha" }} />
        <AppStack.Screen name='MyPlanDetails' component={MyPlanDetails} options={{ headerTitleAlign: "center", headerTitle: "Meu plano" }} />
        <AppStack.Screen name='Help' component={Help} options={{ headerTitleAlign: "center", headerTitle: "Contato" }} />
        <AppStack.Screen name='Suggestion' component={Suggestion} options={{ headerTitleAlign: "center", headerTitle: "Sugestão" }} />
        <AppStack.Screen name='StructuralAnalysis' component={StructuralAnalysis} options={{ headerTitleAlign: "center", headerTitle: "Análise Estrutural" }} />
        <AppStack.Screen name='FunctionalAnalysis' component={FunctionalAnalysis} options={{ headerTitleAlign: "center", headerTitle: "Análise Funcional" }} />
        <AppStack.Screen name='Protokol' component={Protokol} options={{ headerTitleAlign: "center", headerTitle: "Protocolo" }} />
        <AppStack.Screen name='PatientInfo' component={PatientInfo} options={{ headerTitleAlign: "center", headerTitle: "Informação do paciente" }} />
        <AppStack.Screen name='AccompanyPatient' component={AccompanyPatient} options={{ headerTitleAlign: "center", headerTitle: "Acompanhar paciente" }} />
        <AppStack.Screen name='assd' component={FunctionalAnalysis} options={{ headerTitleAlign: "center", headerTitle: "Análise Funcional" }} />
        

      </AppStack.Navigator>
    </>
  )
}

export default PrivateRoutes;
