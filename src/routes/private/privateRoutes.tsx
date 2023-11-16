import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Image, StyleSheet, Text, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../pages/home';

const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();
const PrivateRoutes = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name='Paginal inicial' options={{
        headerShown:false,
      }}>
        {()=>(
          <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{
              tabBarIcon:({color})=>(
                <Ionicons name="home" size={24} color={color} />
                ),
             
            }}/>
          </Tab.Navigator>
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  )
}

export default PrivateRoutes;

