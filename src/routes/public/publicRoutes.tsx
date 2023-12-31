import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import PreLogin from '../../pages/preLogin';
import Login from '../../pages/login';
import CreateAccount from '../../pages/createAccount';
import ChangePassword from '../../pages/changePassword';
import SendEmail from '../../pages/sendEmail';
import CheckCode from '../../pages/CheckCode';
import LeadingPage from '../../pages/leadingPage';
import { Pressable, View } from 'react-native';
import CustomText from '../../components/customText';



const AppStack = createStackNavigator();
const PublicRoutes = () => {
  return (

    
    <AppStack.Navigator screenOptions={{
      headerPressColor:"blue",
      headerStyle:{
        backgroundColor:"#36B3B9"
      },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

    }}>

  <AppStack.Screen name="LeadingPage" component={LeadingPage} options={{
       headerShown:true,
       headerTitle: () => null,
       headerTintColor:"white",
       headerStyle:{
        backgroundColor:"white"
       },
       headerLeftLabelVisible:true,
      headerRight:({navigation}:any)=>(
    <Pressable onPress={()=> navigation.navigate("Login")} style={{padding:10}} android_ripple={{color:"white"}}>
        <CustomText style={{color:"black"}}>
            Não, obrigado
        </CustomText>
    </Pressable>
)

    }}/>
    <AppStack.Screen name="PreLogin" component={PreLogin} options={{
       headerShown:false,
       headerTitle: () => null,
       headerTintColor:"white"
    }}/>
    <AppStack.Screen name="Login" component={Login} options={{
       headerShown:true,
       headerTitle: () => null,
       headerTintColor:"white"
    }}/>
    <AppStack.Screen name="ChangePassword" component={ChangePassword} options={{
       headerShown:true,
       headerTitle: () => null,
    }}/>
      <AppStack.Screen name="SendEmail" component={SendEmail} options={{
       headerShown:true,
       headerTitle: () => null,
       headerTintColor:"white"
    }}/>
  
    <AppStack.Screen name="CheckCode" component={CheckCode} options={{
       headerShown:true,
       headerTitle: () => null,
       headerTintColor:"white"
    }}/>
     <AppStack.Screen name="CreateAccount" component={CreateAccount} options={{
      headerShown:true,
      headerTitle: () => null,
    }}/>

    </AppStack.Navigator>
  )
}
export default PublicRoutes