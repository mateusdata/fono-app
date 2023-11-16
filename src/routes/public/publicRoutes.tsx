import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../pages/login';


const AppStack = createStackNavigator();
const PublicRoutes = () => {
  return (
    <AppStack.Navigator>
    <AppStack.Screen name="Login" component={Login}/>
    </AppStack.Navigator>
  )
}
export default PublicRoutes