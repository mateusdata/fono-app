import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Anamnese from '../../pages/anamnese';
import Exercise from '../../pages/exercise';
import TabsNavigation from './tabNavigation/tabNavigation';

const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Root' component={TabsNavigation} options={{
        headerShown:false,
      }}/>
      <AppStack.Screen name='Anamnese' component={Anamnese} />
      <AppStack.Screen name='Exercise' component={Exercise} />
    </AppStack.Navigator>
  )
}

export default PrivateRoutes;

