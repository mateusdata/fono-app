import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomePage from '../../../pages/home';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
    return (
        
        <Tabs.Navigator>
            <Tabs.Screen name='home' component={HomePage} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="add-circle-sharp" size={34} color="#36B3B9" />
                )
            }} />
        </Tabs.Navigator>
    )
}

export default TabsNavigation