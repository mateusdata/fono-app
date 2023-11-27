import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/login';
import PreLogin from '../../pages/preLogin';
import ForgotPassword from '../../pages/forgotPassword';
import CreateAcount from '../../pages/createAcount';
import ChangePassword from '../../pages/changePassword';
import CheckEmail from '../../pages/checkEmail';


const AppStack = createStackNavigator();
const PublicRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={{
      headerPressColor:"red",
      headerStyle:{
        backgroundColor:"#36B3B9"
      }
    }}>
    <AppStack.Screen name="pre-login" component={PreLogin} options={{
      headerShown:false
    }}/>
    <AppStack.Screen name="Login" component={Login} options={{
      headerShown:false
    }}/>
    <AppStack.Screen name="Criar conta" component={CreateAcount} options={{
      headerShown:true,
      headerTitle: () => null,
    }}/>
    <AppStack.Screen name="esqueceu-senha" component={ForgotPassword} options={{
       headerShown:true,
       headerTitle: () => null,
    }}/>
      <AppStack.Screen name="checar-email" component={CheckEmail} options={{
      headerShown:false
    }}/>
    <AppStack.Screen name="alterar-senha" component={ChangePassword} options={{
       headerShown:true,
       headerTitle: () => null,
    }}/>

    </AppStack.Navigator>
  )
}
export default PublicRoutes