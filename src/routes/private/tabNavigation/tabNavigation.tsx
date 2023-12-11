import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import HomePage from '../../../pages/home';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MyAccount from '../../../pages/myAccount';
import { Context } from '../../../context/AuthProvider';
const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
    const {user} =  useContext(Context);
    return (

        <Tabs.Navigator screenOptions={{
            tabBarShowLabel:false
        }}>
            <Tabs.Screen name='Início' component={HomePage} options={{
                tabBarIcon: ({ color,size }) => (
                    <AntDesign name="home" size={size} color={color} />
                ),
                headerStyle: {
                    backgroundColor: "#36B3B9"
                }
                ,
                headerTintColor: "white",
                tabBarInactiveTintColor:"gray",
                tabBarActiveTintColor:"#36B3B9",
                tabBarLabelStyle:{
                    fontSize:12,
                },
                
                headerTitle: "",
              
            }} />

            <Tabs.Screen name='Pacientes' component={HomePage} options={{
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="profile" size={size} color={color}  />
                ),
                headerStyle: {
                    backgroundColor: "#36B3B9"
                }
                ,
                headerTintColor: "white",
                tabBarInactiveTintColor:"gray",
                tabBarActiveTintColor:"#36B3B9",
                tabBarLabelStyle:{
                    fontSize:12,
                },
                
                
                headerTitle: ""
            }} />


            {false &&  <Tabs.Screen name=' ' component={HomePage} options={{
                tabBarIcon: ({ color,size }) => (
                    <MaterialIcons name="add-circle" size={32} color={color}/>
                ),
                headerStyle: {
                    backgroundColor: "#36B3B9"
                }
                ,
                headerTintColor: "white",
                tabBarInactiveTintColor:"gray",
                tabBarActiveTintColor:"#36B3B9",
                tabBarLabelStyle:{
                    fontSize:12,
                },
                
                headerTitle: ""
            }} />}

            <Tabs.Screen name='Relatórios' component={HomePage} options={{
                tabBarIcon: ({ color,size }) => (
                 
                    <AntDesign name="folder1" size={size} color={color} />

                ),
                headerStyle: {
                    backgroundColor: "#36B3B9"
                }
                ,
                headerTintColor: "white",
                tabBarInactiveTintColor:"gray",
                tabBarActiveTintColor:"#36B3B9",
                tabBarLabelStyle:{
                    fontSize:12,
                },
                
                headerTitle: ""
            }} />

            <Tabs.Screen name='Perfil' component={MyAccount} options={{
                tabBarInactiveTintColor:"gray",
                tabBarActiveTintColor:"#36B3B9",
                tabBarIcon: ({ color,size }) => (
                    <AntDesign name="user"  size={size} color={color} />
                ),
                headerShown:false,
            }} />
        </Tabs.Navigator>
    )
}

export default TabsNavigation