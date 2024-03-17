import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../../pages/home';
import Videos from '../../../pages/Videos';
import MyAccount from '../../../pages/MyAccount';
import { StatusBar } from 'expo-status-bar';
import { colorPrimary } from '../../../style/ColorPalette';

const Tab = createBottomTabNavigator();

export default function MyComponent() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle:{
            backgroundColor: colorPrimary
          }
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            activeColor='#36B3B9'
            compact
            style={{ backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#ECF2FF" }}
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }: any) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;

              return label;
            }}

          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
            tabBarActiveTintColor: "white",
            tabBarActiveBackgroundColor: "white",
            headerShown: true,
            headerTitle: "Fonotheapp",            
            headerTintColor: "white"
          }}
        />
        <Tab.Screen
          name="Videos"
          component={Videos}
          options={{
            tabBarLabel: 'Videos',
            tabBarIcon: ({ color, size }) => {
              return <Icon name="video" size={size} color={color} />;
            },
            headerShown: true,            
            headerTintColor: "white"
          }}
        />

        <Tab.Screen
          name="MyAccount"
          component={MyAccount}
          options={{
            tabBarLabel: 'Conta',
            tabBarIcon: ({ color, size }) => {
              return <Icon name="account" size={size} color={color} />;
            },
            headerShown: true,
            headerTitle: ""
          }}
        />
      </Tab.Navigator>
    </>
  );
}
