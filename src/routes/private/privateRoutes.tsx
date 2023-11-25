import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './stack/staksRoutes';
import Anamnese from '../../pages/anamnese';

const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Root' component={TabsNavigation} options={{
        headerShown:false,
      }}/>
      <AppStack.Screen name='Anamnese' component={Anamnese} />
    </AppStack.Navigator>
  )
}

export default PrivateRoutes;

