import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './stack/staksRoutes';

const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Root' component={TabsNavigation} options={{
        headerShown:false,
      }}/>
    </AppStack.Navigator>
  )
}

export default PrivateRoutes;

