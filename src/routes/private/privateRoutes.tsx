import React, { useContext } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { Button, Pressable, View } from 'react-native';
import CustomText from '../../components/customText';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../context/AuthProvider';
import TabsNavigation from './tabNavigation/tabNavigation';
import Anamnese from '../../pages/Anamnese';
import Exercise from '../../pages/Exercise';
import MyInformation from '../../pages/MyInformation';
import ChangeName from '../../pages/ChangeName';
import Suggestion from '../../pages/Suggestion';
import Protokol from '../../pages/Protokol';
import PatientInfo from '../../pages/PacientInfo';
import AccompanyPatient from '../../pages/AccompanyPatient';
import ChangeEmail from '../../pages/changeEmail';
import ChangeCredential from '../../pages/changeCredential';
import Help from '../../pages/help';
import AnsweredQuestions from '../../pages/AnsweredQuestions';
import PatientQuestionnaire from '../../pages/PatientQuestionnaire';
import Section from '../../pages/Section';
import { colorPrimary } from '../../style/ColorPalette';
import { StatusBar } from 'expo-status-bar';
import CurrentProtocol from '../../pages/CurrentProtocol';
import NoInternet from '../../pages/NoInternet';
import CreatePacient from '../../pages/CreatePacient';
import UnansweredQuestions from '../../pages/UnansweredQuestions';


const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(Context)

  return (
    <>
      <StatusBar animated hideTransitionAnimation='fade' style='light' />
      
      <AppStack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: "white", headerStyle: { backgroundColor: colorPrimary
        }}}>
          
        <AppStack.Screen name='Root' component={TabsNavigation} options={{
          headerShown: false,
        }} />

        <AppStack.Screen name='CreatePacient' component={CreatePacient} options={{headerTitle:"Cadastrar paciente", headerTitleAlign:"center"}}/>
        <AppStack.Screen name='Anamnese' component={Anamnese} options={{headerTitleAlign:"center"}}/>
        <AppStack.Screen name='Exercise' component={Exercise}  options={{ headerTitleAlign: "center", headerTitle: "Exercicios" }} />
        <AppStack.Screen name='MyInformation' component={MyInformation} options={{ headerTitleAlign: "center", headerTitle: "Minhas informações" }} />
        <AppStack.Screen name='ChangeName' component={ChangeName} options={{ headerTitleAlign: "center", headerTitle: "Alterar nome" }} />
        <AppStack.Screen name='ChangeEmail' component={ChangeEmail} options={{ headerTitleAlign: "center", headerTitle: "Alterar email" }} />
        <AppStack.Screen name='ChangeCredential' component={ChangeCredential} options={{ headerTitleAlign: "center", headerTitle: "Alterar senha" }} />
        <AppStack.Screen name='Help' component={Help} options={{ headerTitleAlign: "center", headerTitle: "Contato" }} />
        <AppStack.Screen name='Suggestion' component={Suggestion} options={{ headerTitleAlign: "center", headerTitle: "Sugestão" }} />
        <AppStack.Screen name='PatientQuestionnaire' component={PatientQuestionnaire} options={{ headerTitleAlign: "center", headerTitle: "" }} />
        <AppStack.Screen name='UnansweredQuestions' component={UnansweredQuestions} options={{ headerTitleAlign: "center", headerTitle: "" }}/>

        <AppStack.Screen name='Protokol' component={Protokol} options={{ headerTitleAlign: "center", headerTitle: "Perfil do paciente", headerLeft:null }} />
        <AppStack.Screen name='PatientInfo' component={PatientInfo} options={{ headerTitleAlign: "center", headerTitle: "Informação do paciente" }} />
        <AppStack.Screen name='AccompanyPatient' component={AccompanyPatient} options={{ headerTitleAlign: "center", headerTitle: "Acompanhar paciente" }} />
        <AppStack.Screen name='AnsweredQuestions' component={AnsweredQuestions} options={{ headerTitleAlign: "center", headerTitle: "Quadro Geral" }} />        
        <AppStack.Screen name='Section' component={Section} options={{ headerTitleAlign: "center", headerTitleStyle: { color: "white" }, headerTitle: "Sessão" }} />
        <AppStack.Screen name='CurrentProtocol' component={CurrentProtocol} options={{ headerTitleAlign: "center", headerTitleStyle: { color: "white" }, headerTitle: "Lista de exercicios" }} />
        <AppStack.Screen name='NoInternet' component={NoInternet} options={{ headerTitleAlign: "center", headerTitleStyle: { color: "white" }, headerTitle: "Lista de exercicios" }} />

      </AppStack.Navigator>
    </>
  )
}

export default PrivateRoutes;
