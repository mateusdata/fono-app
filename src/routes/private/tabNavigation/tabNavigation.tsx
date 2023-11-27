import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomePage from '../../../pages/home';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MyAccount from '../../../pages/myAccount';
const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
    return (

        <Tabs.Navigator screenOptions={{
            header: () => (
                <View style={{ flexDirection: 'row', backgroundColor:"#36B3B9", height:100, alignItems: 'center', gap: 10, paddingLeft:10 }}>
                  <View >
                    <Image source={{uri:"https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/24630_7E9A5B3C65889D88.jpg?w=1024"}} style={{width:50, height:50, resizeMode:"contain", borderRadius:50}} />
                  </View>
                  <Text style={{fontSize:18, color:"white"}}>
                    {'Agenlina Valerios Alves'}
                  </Text>
                </View>
              ),
        }}>
            <Tabs.Screen name='ficha' component={HomePage} options={{
                tabBarIcon: ({ color,size }) => (
                    <AntDesign name="creditcard" size={size} color={color} />
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
                    <AntDesign name="folder1" size={size} color={color}  />
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


            <Tabs.Screen name='.' component={HomePage} options={{
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
            }} />

            <Tabs.Screen name='Relatorios' component={HomePage} options={{
                tabBarIcon: ({ color,size }) => (
                 
                    <AntDesign name="save" size={size} color={color} />

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

            <Tabs.Screen name='config' component={MyAccount} options={{
                tabBarIcon: ({ color,size }) => (
                    <AntDesign name="user"  size={size} color={color} />
                ),
                headerShown:false,
            }} />
        </Tabs.Navigator>
    )
}

export default TabsNavigation